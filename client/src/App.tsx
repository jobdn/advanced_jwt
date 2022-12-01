import React from 'react';
import './App.css';
import axios from 'axios';

const backend = axios.create({baseURL: "http://localhost:7000"});

function App() {

  const sendReq = async () => {
    try {
      const res = await backend.get("/users");
      console.log(res);
      
    } catch (error) {
      
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={sendReq}>SEND REQUEST</button>
      </header>
    </div>
  );
}

export default App;
