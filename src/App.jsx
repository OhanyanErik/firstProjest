import Sidebar from "./components/Sidebar/SideBar"
import Dashboard from "./pages/DashBoard/DashBoard";
import { Route,Routes } from "react-router-dom";
import AddApp from "./pages/AddApplication/AddApp";
import "./App.css";
    
    export default function App() {
      
      return (
        <div className="app">
          <Sidebar />
           <main className="page-content">
     <Routes>
     <Route path="/" element={<Dashboard/>}/>
     <Route path="/AddApplication" element={<AddApp/>} />
    </Routes>
 </main>
        </div>
      );
    }
 
