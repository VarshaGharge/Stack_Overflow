import axios from 'axios';
import { useState } from 'react';

export const SMSAuthenticator = () => {
  const [id, setId] = useState(-1);
  const [ verified,setVerified ] = useState(true);
  
  const sendSMS = async (phoneNumber) => {
      const apiUrl = 'https://stack-overflow-clone-hih1.onrender.com/sendsms';
  
      const payload = {
        to : phoneNumber
      };
    
      try {
        const response = await axios.post(apiUrl, payload);
        if(!response.data.error){
          setId(response.data.id);
          console.log('SMS sent successfully:', response.data);
          // Handle success response here
        }else{
          console.log(response.data.error);
        }
        
      } catch (error) {
        console.error('Error sending SMS:', error.response.data);
        // Handle error response here
      }
    };
  
    const verifyOTP = async (otp) => {
      const apiUrl = 'https://stack-overflow-clone-hih1.onrender.com/verifyOTP';
  
      const payload = {
        "id" : id,
        "otp" : otp
      };
    
      try {
        const response = await axios.post(apiUrl, payload);
        if(!response.data.error){
          setVerified(response.data.verified);
          // Handle success response here
        }else{
          console.log(response.data.error);
        }
        // Handle success response here
      } catch (error) {
        console.error('Error sending SMS:', error.response.data);
        // Handle error response here
      }
    };
    return {
      sendSMS,
      verifyOTP,
      verified
    };
}

