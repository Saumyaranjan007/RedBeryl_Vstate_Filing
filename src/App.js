import logo from './logo.svg';
import React from "react";
import './App.css';
import "primeflex/primeflex.css"
import "primereact/resources/themes/lara-light-indigo/theme.css";



//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";
import { BrowserRouter, Route, Routes, useNavigate,HashRouter } from "react-router-dom";
import City from './components/Product';
import LLC from './components/AddComponents/LLC';
import DemoLLC from './components/AddComponents/demoLLC';
import UserSignUp from './components/UserSignUp';
import SignIn from './components/SignIn';
import LandingPage from './components/AddComponents/LandingPage';
import HomePage from './components/HomePage';
import DataDashboard from './components/Dashboard';
import Subscription from './components/User';
import Contact from './components/Contact';
import Customers from './components/Customers';
import EditForm from './components/EditComponents/EditForm';
import AddForm from './components/AddComponents/AddForm';
import EditorTemplate from './components/EditorTemplate';
import Invoice from './components/Invoice';
import Chatbot from './components/ChatBot';
function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path="/demo" element={<City/>}/>
      <Route path="/llc" element={<DemoLLC/>}/>
      <Route path="/signup" element={<UserSignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/landing" element={<LandingPage/>}/>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/dashboard" element={<DataDashboard/>}/>
      <Route path="/user" element={<Subscription/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/customers" element={<Customers/>}/>
      <Route path="/edit/llc" element={<EditForm/>}/>
      <Route path="/llc/form" element={<AddForm/>}/>
      <Route path="/template" element={<EditorTemplate/>}/>
      <Route path="/invoice" element={<Invoice/>}/>
      <Route path="/chat" element={<Chatbot/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
