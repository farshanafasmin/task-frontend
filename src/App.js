import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Authentication from './Pages/Authentication';
// import AllTasks from './Pages/AllTasks';
import Dashboard from './Pages/Dashboard';
import EditTask from './Pages/EditTask';
import ViewTask from './Pages/ViewTask';

function App() {
  return (
    <div className="App">
      <Routes>  
        <Route path='/' element={  <Home></Home>}></Route>
        <Route path='/authentication' element={  <Authentication></Authentication>}></Route>
        {/* pass register variable in element (parent to child) */}
        <Route path='/register' element={  <Authentication register></Authentication>}></Route> 
        <Route path='/dashboard' element={  <Dashboard> </Dashboard>}></Route>

        {/* <Route path='/alltasks' element={  <AllTasks> </AllTasks>}></Route> */}
        <Route path='/edittask/:taskId' element={  <EditTask> </EditTask>}></Route>
        <Route path='/viewtask/:taskId' element={  <ViewTask> </ViewTask>}></Route>




        
      </Routes>
    </div>
  );
}

export default App;
