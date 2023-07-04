import mongoose from "mongoose";
import Subs from "../models/subs.js";
import stripe from 'stripe'

// const stripe_secret = process.env.SECRET_KEY

const stripeInstance = stripe("sk_test_51NLiAhSEzzCdzGpnQo0uYiauyZf8QCR3ZzbwpjV1EGCibWJsnoyi6cEdfIddmRbqJHqY87Y4m86YpBlkkkuBkkr800ySnqDWOz");

export const addSubscriber = async (req, res) => {
  const postSubData = req.body;
  const postSub = new Subs(postSubData);
  try{
      await postSub.save();
      res.status(200).json(postSub)
  }catch (error){
      console.log(error)
      res.status(409).json("Couldn't add Subscriber")
  }  
}


export const createSubscriber = async (req, res) => {
  var {id,price} = req.body;
  price = price * 100;
  try {
    const payment = await stripeInstance.paymentIntents.create({
      amount : price,
      currency: "INR",
      payment_method: id,
      confirm: true
    });

    const paymentConfirm = await stripeInstance.paymentIntents.confirm(payment.id,{
      payment_method: id,
    });
    console.log("Payment Confirm",paymentConfirm);
    res.json({
      message: "Payment successful",
      url : paymentConfirm.next_action.use_stripe_sdk.stripe_js,
      client_secret_key : paymentConfirm.client_secret,
      success: true
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: error,
      success: false,
    });
  }
};
