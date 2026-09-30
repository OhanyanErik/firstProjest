import { NavLink } from "react-router-dom";
import "./SideBar.css";

export default function Sidebar() {
  return (
    <div className="app-layout">
      <aside className="sidebar">
     <h2 className="sidebar-title">Job Tracker</h2>
   
     <nav className="sidebar-nav">
       <NavLink to="/" end className="nav-button">
         Dashboard
       </NavLink>
   
       <NavLink to="/AddApplication" className="nav-button">
         Add Application
       </NavLink>
     </nav>
     </aside>

    </div>
     );
}