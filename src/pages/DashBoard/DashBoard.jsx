import Search from "../../components/SearchButton/SearchButton/SearchButton";
import checkGf from "../../assets/output-ckeck.gif";
import clock from "../../assets/output-clock.gif";
import interw from "../../assets/output-interview.gif";
import outcame from "../../assets/outcome_transparent.gif";
import rejection from "../../assets/rejection-bc.gif";
import OpenModal from "../../OpenModal/OpenModal";
import { useState } from "react";

import "./DashBoard.css";


export default function Dashboard() {
  const [modal,setModal]=useState(false);
  return (
    <>
      <header className="dashboard-header">
        <div>
          <h1>Job Application Manager</h1>
          <p>Track your job applications and stay organized.</p>
        </div>

       <button onClick={() => setModal(true)}
         className="add-button"type="button">+ Add Application
         </button>
      </header>
{modal && <OpenModal onClose={() => setModal(false)} />}
      <div className="cards">
          <div>
            <img src={checkGf} alt="checkgif" />
            <span>Total</span>
          </div>
          <div>
            <img src={clock} alt="clockgif" />
            Pending
          </div>
          <div>
          <img src={interw} alt="interw" />
          Interview
          </div>
        <div>
          <img src={outcame} alt="accepted" />
          Accepted
          </div>
        <div>
          <img src={rejection} alt="rejectgif" />
          Rejected
          </div>
          </div>
      <div className="search-bar">
        <Search />
        <div className="select-status">
          <select name="status" id="all-status">
            <option value=""> All Status</option>
          </select>
        </div>
        <div className="select-newest">
          <select name="Newest" id="newest-first">
            <option value="">Newest First</option>
          </select>
        </div>
      </div>
    </>
  );
}
