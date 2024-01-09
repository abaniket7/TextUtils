import React, { useState } from 'react';
import Navbar from './components/Navbar'
import TextForm from './components/TextForm'
import Alert from './components/Alert';
import About from './components/About';
import { 
  HashRouter, Route, Routes, 
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState('light');
  const toggleMode = ()=>{
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = '#061224';
      showAlert("Dark Mode has been enabled", "success");
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light Mode has been enabled", "success");
    }
  }
  const showAlert = (msg, type)=>{
    setAlert({
      msg : msg,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 900);
  }
  return (
    <>
    <HashRouter>
      <Navbar title="TextUtils" aboutText="About Us" mode={mode} toggleMode={toggleMode}/>
      <Alert alert={alert}/>
      <div className="container my-3">
        <Routes>
          <Route exact path="/" element={<TextForm head="Enter Your Text Here :" mode={mode} showAlert={showAlert}/>} />
        </Routes>
        <Routes>
          <Route path="/About" element={<About aboutText="About Us" mode={mode}/>} />
        </Routes>
      </div>
      </HashRouter>
    </>
  );
}

export default App;
