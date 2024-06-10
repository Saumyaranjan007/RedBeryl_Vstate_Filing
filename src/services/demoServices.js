import axios from "axios";
import authHeader, { initAuth } from "./authHeader";

const getShifts = () => {

    try {
        return axios.get("http://localhost:1337/api/products",
        { headers: authHeader() }
        )
    } catch (error) {
        return [];
    }
}

const getAllModelData =(model)=>{
    try {
        return axios.get(`http://localhost:1337/${model}s`,
        { headers: initAuth() }
        )
    } catch (error) {
        return []
    }
}

const getAllService =()=>{
    try {
        return axios.get(`http://localhost:1337/alabama-services`,
        { headers: initAuth() }
        )
    } catch (error) {
        return []
    }
}

const getAllModelDataById =(model,id)=>{
    try {
        return axios.get(`http://localhost:1337/${model}s/${id}`,
        { headers: initAuth() }
        )
    } catch (error) {
        return []
    }
}

const getInit =()=>{
    try {
        return axios.get("http://localhost:1337/content-manager/content-types",
        { headers: initAuth() }
        )
    } catch (error) {
        return []
    }
}

const getCustomer =()=>{
    try {
        return axios.get("http://localhost:8000/customer",
        
        )
    } catch (error) {
        return []
    }
}

const getAllFormInfo =()=>{
    try {
        return axios.get("http://localhost:8000/form/getAll",
        
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

const createCompanyInvoice = (data) => {
    try {
        return axios.post("http://localhost:8000/create/invoice", data,
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

const ShiftsServices = {
  getShifts,
  createShifts,
  updateShifts,
  getShiftsById,
  deleteShiftsById,
  getInit,
  getCustomer,
  getInvoice,
  createInvoice,
  createCustomer,
  createCompanyInvoice,
  getAllFormInfo,
  getAllModelData,
  getAllModelDataById,
  getAllService
}


export default ShiftsServices;