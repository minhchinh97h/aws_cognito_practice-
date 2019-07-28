import React from 'react';
import Login from './components/login/Login'
import SignIn from './components/sign-in/SignIn'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Login}/>
        <Route path="/sign-in" component={SignIn} />
      </div>
    </BrowserRouter>
  );
}

export default App;
