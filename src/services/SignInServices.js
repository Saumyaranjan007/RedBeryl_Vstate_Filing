import axios from 'axios';
import encryption, { encryptData } from './CryptoClass';

const signIn = async (data) => {
  try {
    // Example of data to be encrypted, including the endpoint
    const dataToEncrypt = {
      endpoint: '/usermangement/login',
      payload: data,
    };
    console.log(dataToEncrypt.payload)  
    const encryptedData = encryption.encryptData(dataToEncrypt);

    // Using the encrypted data in a request
    const url = `http://192.168.1.101:8765/decrypt?data=${encryptedData}`;


    // Making the API call
    const response = await axios.get(url,{data:encryptedData})
    .then((res)=>{
        console.log(res)
        const encryptedResponse = res.data;

        // Decrypting the response data
        const decryptedResponse = encryption.decryptData(encryptedResponse);
        // console.log(decryptedResponse)
        return decryptedResponse;
    })
    .catch((err)=>{
        console.log(err)
    });
    
 
  } catch (error) {
    if (error.response?.status === 401) {
      return error.response.status;
    }
    throw error;
  }
};

const SignIn = {
  signIn
};

export default SignIn;