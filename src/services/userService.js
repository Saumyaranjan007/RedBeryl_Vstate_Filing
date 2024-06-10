import axios from "axios";
import authHeader, { initAuth } from "./authHeader";



const getCustomer =()=>{
    try {
        return axios.get("http://localhost:8000/customer",
        
        )
    } catch (error) {
        return []
    }
}

const getInvoice =()=>{
    try {
        return axios.get("http://localhost:8000/invoice",
        
        )
    } catch (error) {
        return []
    }
}


const createShifts = (data) => {
    try {
        return axios.post("http://localhost:1337/api/llcs", data,
        { headers : authHeader() }
        )
    } catch (error) {
        if (error.response?.status === 401) {
            return error.response.status;
         }
    }
}

const createInvoice = (data) => {
    try {
        return axios.post("http://localhost:8000/create-invoice", data,
        { headers : authHeader() }
        )
    } catch (error) {
        if (error.response?.status === 401) {
            return error.response.status;
         }
    }
}

const createCustomer = (data) => {
    try {
        return axios.post("http://localhost:8000/create-customer", data,
        { headers : authHeader() }
        )
    } catch (error) {
        if (error.response?.status === 401) {
            return error.response.status;
         }
    }
}

const getUserDetails = ()=>{
    try {
        return axios.get("http://localhost:8000/user/getAll",
        
        )
    } catch (error) {
        return []
    }
}


const UserServices = {
  
  getCustomer,
  getInvoice,
  createInvoice,
  createCustomer,
  getUserDetails
}


export default UserServices;