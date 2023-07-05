import axios from 'axios';
import { useState } from 'react';

export const SMSAuthenticator = () => {
  let [ verified,setVerified ] = useState(false);
  
  const sendSMS = async (phoneNumber,otp) => {
      const apiUrl = 'https://www.fast2sms.com/dev/bulkV2?authorization=o70DOb2YEjIJuexQszPyGB91gc6X4AmvlLMirNRSZChwFWdaf3UyITjoO8EVGNFdZPYQbvXrD40Rwcks&route=otp&variables_values='+otp+'&flash=0&numbers='+phoneNumber;
    
      try {
        const response = await axios.get(apiUrl);
        if(response.data.message && response.data.message[0] === "SMS sent successfully."){
          verified = true;
          setVerified(verified);
          console.log('SMS sent successfully');
          // Handle success response here
        }else{
          console.log(response.data.message);
          verified = false;
          setVerified(verified);
        }
        
      } catch (error) {
        console.log('Error sending SMS:', error.response.data);
        verified = false;
        setVerified(verified);
        // Handle error response here
      }
      return verified;
    };
  
    return {
      sendSMS,
      verified
    };
}

