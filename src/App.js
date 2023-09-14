import React, { useState, createContext } from "react";
import Header from "./components/header/header";
import Menu from "./components/menu/menu";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Dashboard from "./components/dashboard/dashboard";
import Footer from "./components/footer/footer";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Context = createContext();

function App() {
  const [isLogin, setIsLogin] = useState(null);
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  const loginUrl = "/adminlte-react-js-frontend-th-release/login";
  const regUrl = "/adminlte-react-js-frontend-th-release/register";
  const dashUrl = "/adminlte-react-js-frontend-th-release/dashboard";

  return (
    <Context.Provider value={{ isLogin, setIsLogin, account, setAccount}}>
      <BrowserRouter>
        {localStorage.getItem('alreadyLogin') && <Header/>}
        {localStorage.getItem('alreadyLogin') && <Menu/>}
        <Routes>
          <Route path={loginUrl} element={(localStorage.getItem('alreadyLogin')) ? <Navigate to={dashUrl}/> : <Login/>}/>
          <Route path={regUrl} element={(localStorage.getItem('alreadyLogin')) ? <Navigate to={dashUrl}/> : <Register/>}/>
          <Route path={dashUrl} element={(localStorage.getItem('alreadyLogin')) ? <Dashboard/> : <Navigate to={loginUrl}/>}/>
          <Route exact={true} path="/" element={(localStorage.getItem('alreadyLogin')) ? <Navigate to={dashUrl}/> : <Navigate to={loginUrl} />}/>
          <Route exact={true} path="*" element={<Navigate to={loginUrl} />}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
export { Context };
