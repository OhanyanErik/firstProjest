import { NavLink } from "react-router-dom";
import { useLanguage } from "../../LanguageContext";
import "./SideBar.css";

export default function Sidebar() {
  const { t } = useLanguage();

  return (
    <div className="app-layout">
      <aside className="sidebar">
     <div className="sidebar-brand">
       <img className="brand-mark" src="/jobappmenegerlogo.svg" alt="Job Application Manager Logo" />
       <h2 className="sidebar-title">{t("app.name")}</h2>
     </div>
   
     <nav className="sidebar-nav">
       <NavLink
         to="/"
         end
         className={({ isActive }) => `nav-button${isActive ? " active" : ""}`}
       >
         {t("nav.dashboard")}
       </NavLink>
   
       <NavLink
         to="/AddApplication"
         className={({ isActive }) => `nav-button${isActive ? " active" : ""}`}
       >
         {t("nav.addApplication")}
       </NavLink>
       <NavLink
         to="/Settings"
         className={({ isActive }) => `nav-button${isActive ? " active" : ""}`}
       >
         {t("nav.settings")}
       </NavLink>
     </nav>
     </aside>

    </div>
     );
}
