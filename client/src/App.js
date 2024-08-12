import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { useEffect } from "react";
import DashBoard from "./Pages/DashBoard";

function App() {
  // useEffect(() => {
  //   fetch('http://localhost:5000/api/v1/sensors/simulate')
  //     .then(response => response.json())
  //     .then(data => console.log(data.data))
        
  //     .catch(error => console.error('Error fetching users:', error));
  // }, []);
  return (
    <div className='app'>
      <Router>
        <Routes>
        <Route Component={Register} exact path='/' />
        </Routes>
        <Routes>
        <Route Component={Login} exact path='/login' />
        </Routes>
        <Routes>
        <Route Component={DashBoard} exact path='/dashboard' />
        </Routes>

        


      </Router>
       

    </div>
  );
}

export default App;
