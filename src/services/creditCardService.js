import axios from "axios";
import authHeader, { initAuth } from "./authHeader";

const getCreditInfo = () => {

    try {
        return axios.get("http://localhost:1337/credit-card-infos",
        { headers: authHeader() }
        )
    } catch (error) {
        return [];
    }
}

const getLLCmember = () => {

    try {
        return axios.get("http://localhost:1337/llc-members",
        { headers: authHeader() }
        )
    } catch (error) {
        return [];
    }
}

const getLLC = () => {

    try {
        return axios.get("http://localhost:1337/llcs",
        { headers: authHeader() }
        )
    } catch (error) {
        return [];
    }
}





// const getInit =()=>{
//     try {
//         return axios.get("http://localhost:1337/content-manager/init",
//         { headers: initAuth() }
//         )
//     } catch (error) {
//         return []
//     }
// }

const getInit =()=>{
    try {
        return axios.get("http://localhost:1337/content-manager/content-types",
        { headers: initAuth() }
        )
    } catch (error) {
        return []
    }
}

const getConfiguration =(model)=>{
    try {
        return axios.get(`http://localhost:1337/content-manager/content-types/${model}/configuration`,
        { headers: initAuth() }
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

const createModeldata = (data,endpoint) => {
    try {
        return axios.post(`http://localhost:1337/${endpoint}s`, data,
        { headers : authHeader() }
        )
    } catch (error) {
        if (error.response?.status === 401) {
            return error.response.status;
         }
    }
}


const createUser = (data) => {
    try {
        return axios.post("http://localhost:8000/signup", data,
        { headers : authHeader() }
        )
    } catch (error) {
        if (error.response?.status === 401) {
            return error.response.status;
         }
    }
}

const createLLC = (data) => {
    try {
        return axios.post("http://localhost:8000/create-llc", data,
        { headers : authHeader() }
        )
    } catch (error) {
        if (error.response?.status === 401) {
            return error.response.status;
         }
    }
}

const createLLCMembers = (data) => {
    try {
        return axios.post("http://localhost:8000/create-llc-members", data,
        { headers : authHeader() }
        )
    } catch (error) {
        if (error.response?.status === 401) {
            return error.response.status;
         }
    }
}

const createCreditCardInfo = (data) => {
    try {
        return axios.post("http://localhost:8000/create-credit-info", data,
        { headers : authHeader() }
        )
    } catch (error) {
        if (error.response?.status === 401) {
            return error.response.status;
         }
    }
}

const createPayment = (data) => {
    try {
        return axios.post("http://localhost:8000/create-payment", data,
        { headers : authHeader() }
        )
    } catch (error) {
        if (error.response?.status === 401) {
            return error.response.status;
         }
    }
}


const createUserHubspot = (data,email) => {
    try {
        return axios.post(`https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/${email}/`, data,
        { headers : authHeader() }
        )
    } catch (error) {
        if (error.response?.status === 401) {
            return error.response.status;
         }
    }
}

const updateShifts = (id, data) => {
    try {
        return axios.put("/candidate/api/shifts/"+id, data,
            { headers: authHeader() }
            )
    } catch (error) {
        if (error.response?.status === 401) {
            return error.response?.status;
         }
    }
}

const getShiftsById = (id) => {
    try {
        return axios.get("/candidate/api/shifts/"+id,
        { headers: authHeader() }
        )
    } catch (error) {
        if (error.response?.status === 401) {
           return error.response?.status;
        }
    }
}

const deleteShiftsById = (id) => {
    try {
        return axios.delete("/candidate/api/shifts/"+id,
        { headers: authHeader() }
        )
    } catch (error) {
        if (error.response?.status === 401) {
           return error.response?.status;
        }
    }
}

const createAlabamaLLC = (data,model) => {
    try {
        return axios.post(`http://localhost:1337/${model}s`, data,
        { headers : authHeader() }
        )
    } catch (error) {
        if (error.response?.status === 401) {
            return error.response.status;
         }
    }
}

const updateAlabamaLLC = (data,model,id) => {
    
    try {
        return axios.put(`http://localhost:1337/${model}s/${id}`, data,
        { headers : authHeader() }
        )
    } catch (error) {
        if (error.response?.status === 401) {
            return error.response.status;
         }
    }
}

const CreditCardServices = {
  getCreditInfo,
  createShifts,
  updateShifts,
  getShiftsById,
  deleteShiftsById,
  getInit,
  getLLCmember,
  getLLC,
  createUser,
  createUserHubspot,
  createCreditCardInfo,
  createLLC,
  createLLCMembers,
  createPayment,
  createModeldata,
  createAlabamaLLC,
  updateAlabamaLLC,
  getConfiguration
}


export default CreditCardServices;