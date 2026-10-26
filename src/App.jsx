import { useEffect } from "react";
import Sidebar from "./components/Sidebar/SideBar"
import Dashboard from "./pages/DashBoard/DashBoard";
import { Route,Routes } from "react-router-dom";
import AddApp from "./pages/AddApplication/AddApp";
import SettingPage from "./pages/SettingPage/SettingPage";
import "./App.css";
    
    export default function App() {

      useEffect(() => {
        try {
          const preferences = JSON.parse(localStorage.getItem("jobTrackerSettings") || "{}");
          document.documentElement.dataset.theme = preferences.theme === "dark" ? "dark" : "light";
        } catch {
          document.documentElement.dataset.theme = "light";
        }
      }, []);
      
      return (
        <div className="app">
          <Sidebar />
           <main className="page-content">
     <Routes>
     <Route path="/" element={<Dashboard/>}/>
     <Route path="/AddApplication" element={<AddApp/>} />
     <Route path="/Settings" element={<SettingPage/>} />
    </Routes>
 </main>
        </div>
      );
    }
 
