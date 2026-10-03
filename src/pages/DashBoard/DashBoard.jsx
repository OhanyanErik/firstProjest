import Search from "../../components/SearchButton/SearchButton/SearchButton";
import checkGf from "../../assets/output-ckeck.gif";
import clock from "../../assets/output-clock.gif";
import interw from "../../assets/output-interview.gif";
import outcame from "../../assets/outcome_transparent.gif";
import rejection from "../../assets/rejection-bc.gif";
import OpenModal from "../../OpenModal/OpenModal";
import getCompanyLogo from "../../assets/GetLogo/GetLogo";
import { useDispatch,useSelector } from "react-redux";
import { useState,} from "react";



import "./DashBoard.css";

export default function Dashboard() {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const applications = useSelector(
  (state) => state.applications.applications
);
   

  function addApplication(values) {
    dispatch({ type: "ADD_APPLICATION", payload: values });
    setModal(false);
  }

  const viewApplication = (app) => {
    dispatch({ type: "SET_APPLICATIONS", payload: app });
          setModal(true);
        }
      
  const editApplication = (app) => {
    dispatch({ type: "UPDATE_APPLICATION", payload: app });
    dispatch({ type: "SET_APPLICATIONS", payload: app });
    setModal(true);
  };
  


  return (
    <>
      <header className="dashboard-header">
        <div>
          <h1>Job Application Manager</h1>
          <p>Track your job applications and stay organized.</p>
        </div>

        <button onClick={() => setModal(true)} className="add-button" type="button">
          <span className="label">+ Add Application</span>
        <span className="gradient-container">
          <span className="gradient" />
        </span>
        </button>
      </header>

      {modal && <OpenModal onClose={() => setModal(false)} onAdd={addApplication} />}

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
            <option value="">All Status</option>
          </select>
        </div>
        <div className="select-newest">
          <select name="Newest" id="newest-first">
            <option value="">Newest First</option>
          </select>
        </div>
      </div> 

  <div className="applications">
  {!applications.length && <p>No applications yet.</p>}

  {applications.map((app) => (
    <div className="card" key={app.id}>
      <div className="avatar">{getCompanyLogo(app.company)}</div>

      <div className="info">
        <p>{app.position} — {app.company}</p>
        <span className="info-1">Status</span>
      </div>

      <div className="content-1">
        <h3>{app["full-name"]}</h3>
        <p>Email: {app.email}</p>
        <p>Phone: {app.number}</p>
      </div>

      <div className="content-2">
        {app.salary && <p>Salary Expectation: {app.salary}</p>}
        {app.years != null && app.years !== "" && (
          <p>Experience: {app.years} years</p>
        )}
        {app.url && <p>CV URL: {app.url}</p>}
        {app.letter && <p>Cover Letter: {app.letter}</p>}
      </div>

      <div className="buttons-container">
        <button className="view-button" onClick={() => viewApplication(app)}>
          View
        </button>

        <button className="edit-button" onClick={() => editApplication(app)}>
          Edit
        </button>

        <button
          className="delete-button"
          onClick={() =>
            dispatch({ type: "DELETE_APPLICATION", payload: app.id })
          }
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>
</>
  
  );
}