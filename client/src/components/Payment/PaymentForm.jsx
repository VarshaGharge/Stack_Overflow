import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import "./Payment.css";
import icon from "../../assets/icon.png";
import { addSubscription } from "../../actions/subscriber.js";

const PaymentForm = () => {
  const validDate = moment()
    .add(1, "month")
    .format("LL");

  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const planId = id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const plans = useSelector((state) => state.planReducer);
  const plan = plans.filter((p) => p._id === id)[0];
  const User = useSelector((state) => state.currentUserReducer);
  var [divContainer, setDivContainer] = useState(null);
  const [client_secret_key,setClientSecretKey] = useState(null);
  const [navigateUrl, setNavigateUrl] = useState(null);

  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "black",
        color: "black",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#fce883" },
        "::placeholder": { color: "black" },
      },
      invalid: {
        iconColor: "#fc0a0a",
        color: "#fc0a0a",
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("https://stack-overflow-clone-hih1.onrender.com/payment/pay", {
          id,
          price: plan?.price,
        });
        if (response.data.success) {
          setClientSecretKey(response.data.client_secret_key);
          setSuccess(true);
          setNavigateUrl(response.data.url);
        } else {
          console.log(response.data.message);
        }
      } catch (e) {
        console.log("Error", e);
        setSuccess(false);
      }
    } else {
      console.log("Error", error);
      setSuccess(false);
    }
  };

  const on3DSComplete = () => {
    // Hide the 3DS UI
    if (divContainer != null) {
      divContainer.remove();
    }

    // Check the PaymentIntent
    if(client_secret_key){
      stripe.retrievePaymentIntent(client_secret_key).then(function(result) {
        if (result.error) {
          console.log(result.error);
        } else {
          dispatch(
            addSubscription(
              { userId: User.result._id, planId: planId, status: "success" },
              User.result._id,
              plan.plan,
              validDate,
              navigate
            )
          );
        }
      });
    }
    
  };

  const addFrame = () => {
    setDivContainer(document.getElementById("paymentSuccessFrame"));
    if (divContainer) {
      var iframe = document.createElement("iframe");
      iframe.src = navigateUrl;
      iframe.width = 600;
      iframe.height = 400;
      divContainer.appendChild(iframe);
      window.addEventListener('message', function(ev) {
        if (ev.data.type === 'stripe-3ds-result') {
          on3DSComplete();
        }
      }, false);
    }
  };
  useEffect(addFrame, [divContainer, navigateUrl]);
  return (
    <div className="plan-1">
      {!success ? (
        <form
          className="pay"
          style={{ alignSelf: "center" }}
          onSubmit={handleSubmit}
        >
          {
            <div key={plan._id}>
              <div className="plan-details">
                <div className="plan-info">
                  <img src={icon} alt="" width="100" />
                  <div className="validity">
                    <div className="plan-text">
                      <h4>{plan.plan}</h4>
                    </div>
                    <p>Valid until {validDate}</p>
                  </div>
                </div>
                <div className="plan-price">
                  <p>₹{plan.price} / Month</p>
                </div>
              </div>
            </div>
          }
          <div className="plan-form">
            <fieldset className="FormGroup">
              <div className="FormRow">
                <CardElement options={CARD_OPTIONS} />
              </div>
            </fieldset>
            <button type="submit" className="submit-btn">
              PAY
            </button>
          </div>
        </form>
      ) : (
        <>
          {
            <div id="paymentSuccessFrame" className="success">
             <p>Payment Successful. Redirecting....</p> 
            </div>
          }
        </>
      )}
    </div>
  );
};
export default PaymentForm;
