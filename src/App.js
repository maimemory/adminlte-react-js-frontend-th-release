import React from "react";
import Header from "./components/header/header";
import Menu from "./components/menu/menu";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Footer from "./components/footer/footer";

import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Menu/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route exact={true} path="/" element={<Navigate to="/login" />}/>
        <Route exact={true} path="*" element={<Navigate to="/login" />}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
