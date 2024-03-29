import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Homepage from './pages/Homepage';
import LoginForm from './pages/LoginForm';
import RegistrationForm from './pages/RegistrationForm';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/register" element={<RegistrationForm />} />
          </Routes>    
        </div>
      </Router>
    </Provider>
  );
}

export default App;
