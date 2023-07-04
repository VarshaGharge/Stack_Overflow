import React from 'react'
import PaymentForm from '../../components/Payment/PaymentForm'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import '../../components/Payment/Payment.css'

const PlanDetail = () => {
   const publicKey = "pk_test_51NLiAhSEzzCdzGpnfceA136gKQDa4k33toxA3zbGe3W4AU5l2VEPAY1kuDBGZK67Vnt9NuQRrAKOCEuCWJM44rtY007l3EFiHz";
    const stripePromise = loadStripe(publicKey);

  return (
    <div className='payDrive'>
      <Elements stripe={stripePromise} >
        <PaymentForm />
      </Elements>
    </div>
  )
}

export default PlanDetail
