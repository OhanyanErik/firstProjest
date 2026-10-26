import Search from "../../components/SearchButton/SearchButton/SearchButton";
import checkGf from "../../assets/output-ckeck.gif";
import clock from "../../assets/output-clock.gif";
import interw from "../../assets/output-interview.gif";
import outcame from "../../assets/outcome_transparent.gif";
import rejection from "../../assets/rejection-bc.gif";
import OpenModal from "../../OpenModal/OpenModal";
import getCompanyLogo from "../../assets/GetLogo/GetLogo";
import createApplication from "../../createApplication";
import { useLanguage } from "../../LanguageContext";
import { APPLICATION_ACTIONS } from "../../reducer/applicationActions";
import { useDispatch,useSelector } from "react-redux";
import { useEffect, useState } from "react";



import "./DashBoard.css";

function getSafeCvUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

export default function Dashboard() {
  const [modal, setModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [activeApplication, setActiveApplication] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [pendingDeleteApplication, setPendingDeleteApplication] = useState(null);
  const [hidePersonalInfo] = useState(() => {
    try {
      return Boolean(
        JSON.parse(localStorage.getItem("jobTrackerSettings") || "{}").hidePersonalInfo
      );
    } catch {
      return false;
    }
  });
  const { t, language } = useLanguage();
  const dispatch = useDispatch();
  const applications = useSelector(
  (state) => state.applications.applications
);

  const normalizedSearch = search.trim().toLowerCase();
  const visibleApplications = applications.filter((application) => {
    const matchesSearch = [
      application["full-name"],
      application.position,
      application.company,
      application.email,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearch);

    const matchesStatus =
      statusFilter === "all" || application.status === statusFilter;

    return matchesSearch && matchesStatus;
  }).sort((first, second) => {
    const firstDate = Date.parse(first.createdAt || "");
    const secondDate = Date.parse(second.createdAt || "");
    const safeFirstDate = Number.isFinite(firstDate) ? firstDate : 0;
    const safeSecondDate = Number.isFinite(secondDate) ? secondDate : 0;

    return sortOrder === "oldest"
      ? safeFirstDate - safeSecondDate
      : safeSecondDate - safeFirstDate;
  });

  const countByStatus = (status) =>
    applications.filter((application) => application.status === status).length;

  useEffect(() => {
    if (!pendingDeleteApplication) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") setPendingDeleteApplication(null);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pendingDeleteApplication]);
   

  function openAddModal() {
    setActiveApplication(null);
    setModalMode("add");
    setModal(true);
  }

  function openApplicationModal(application, mode) {
    setActiveApplication(application);
    setModalMode(mode);
    setModal(true);
  }

  function saveApplication(values) {
    if (modalMode === "edit" && activeApplication) {
      dispatch({
        type: APPLICATION_ACTIONS.UPDATE_APPLICATION,
        payload: { ...activeApplication, ...values },
      });
    } else {
      dispatch({
        type: APPLICATION_ACTIONS.ADD_APPLICATION,
        payload: createApplication(values),
      });
    }
    setModal(false);
    setActiveApplication(null);
  }


  return (
    <>
      <header className="dashboard-header">
        <div>
          <h1>{t("dashboard.title")}</h1>
          <p>{t("dashboard.description")}</p>
        </div>

        <button onClick={openAddModal} className="add-button" type="button">
          <span className="label">{t("dashboard.add")}</span>
        <span className="gradient-container">
          <span className="gradient" />
        </span>
        </button>
      </header>

      {modal && (
        <OpenModal
          onClose={() => {
            setModal(false);
            setActiveApplication(null);
          }}
          onSubmit={saveApplication}
          application={activeApplication}
          mode={modalMode}
        />
      )}

      {pendingDeleteApplication && (
        <div
          className="modal"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setPendingDeleteApplication(null);
            }
          }}
        >
          <div
            className="modal-content confirm-delete-content"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-confirm-title"
            aria-describedby="delete-confirm-description"
          >
            <h2 id="delete-confirm-title">{t("application.deleteTitle")}</h2>
            <p id="delete-confirm-description">
              {t("application.deleteMessage", {
                position: pendingDeleteApplication.position,
                company: pendingDeleteApplication.company,
              })}
            </p>
            <div className="confirm-delete-actions">
              <button
                type="button"
                className="cancel-button"
                autoFocus
                onClick={() => setPendingDeleteApplication(null)}
              >
                {t("button.cancel")}
              </button>
              <button
                type="button"
                className="confirm-delete-button"
                onClick={() => {
                  dispatch({
                    type: APPLICATION_ACTIONS.DELETE_APPLICATION,
                    payload: pendingDeleteApplication.id,
                  });
                  setPendingDeleteApplication(null);
                }}
              >
                {t("button.delete")}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="cards">
        <div>
          <img src={checkGf} alt="checkgif" />
          <span>{t("stats.total")}</span>
          <strong>{applications.length}</strong>
        </div>
        <div>
          <img src={clock} alt="clockgif" />
          {t("status.pending")}
          <strong>{countByStatus("Pending")}</strong>
        </div>
        <div>
          <img src={interw} alt="interw" />
          {t("status.interview")}
          <strong>{countByStatus("Interview")}</strong>
        </div>
        <div>
          <img src={outcame} alt="accepted" />
          {t("status.accepted")}
          <strong>{countByStatus("Accepted")}</strong>
        </div>
        <div>
          <img src={rejection} alt="rejectgif" />
          {t("status.rejected")}
          <strong>{countByStatus("Rejected")}</strong>
        </div>
      </div>

      <div className="search-bar">
        <Search search={search} onSearchChange={setSearch} />
        <div className="select-status">
          <select
            name="status"
            id="all-status"
            aria-label={t("filter.allStatus")}
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="all">{t("filter.allStatus")}</option>
            <option value="Pending">{t("status.pending")}</option>
            <option value="Interview">{t("status.interview")}</option>
            <option value="Accepted">{t("status.accepted")}</option>
            <option value="Rejected">{t("status.rejected")}</option>
          </select>
        </div>
        <div className="select-newest">
          <select
            name="sort-order"
            id="newest-first"
            aria-label={t("sort.newest")}
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <option value="newest">{t("sort.newest")}</option>
            <option value="oldest">{t("sort.oldest")}</option>
          </select>
        </div>
      </div> 

  <div className="applications">
  {!applications.length && <p>{t("empty.applications")}</p>}
  {applications.length > 0 && visibleApplications.length === 0 && (
    <p>{t("empty.matches")}</p>
  )}

  {visibleApplications.map((app) => (
    <div className="card" key={app.id}>
      <div className="avatar">{getCompanyLogo(app.company)}</div>

      <div className="info">
        <p>{app.position} — {app.company}</p>
        <select
          className="application-status"
          aria-label={t("application.changeStatus")}
          value={app.status || "Pending"}
          onChange={(event) =>
            dispatch({
              type: APPLICATION_ACTIONS.CHANGE_STATUS,
              payload: { id: app.id, status: event.target.value },
            })
          }
        >
          <option value="Pending">{t("status.pending")}</option>
          <option value="Interview">{t("status.interview")}</option>
          <option value="Accepted">{t("status.accepted")}</option>
          <option value="Rejected">{t("status.rejected")}</option>
        </select>
      </div>

      <div className="content-1">
        <h3>{app["full-name"]}</h3>
        <p>{t("field.email")}: {hidePersonalInfo ? t("privacy.hidden") : <a href={`mailto:${app.email}`}>{app.email}</a>}</p>
        <p>{t("field.phone")}: {hidePersonalInfo ? t("privacy.hidden") : <a href={`tel:${app.number}`}>{app.number}</a>}</p>
        {app.createdAt && (
          <p className="application-date">
            {t("field.appliedOn")}: {new Date(app.createdAt).toLocaleDateString(language === "hy" ? "hy-AM" : "en-US")}
          </p>
        )}
      </div>

      <div className="content-2">
        {app.salary && <p>{t("field.salary")}: {app.salary}</p>}
        {app.years != null && app.years !== "" && (
          <p>{t("field.experience")}: {app.years} {t("field.years")}</p>
        )}
        {app.url && (
          <p>
            {t("field.cvUrl")}: {getSafeCvUrl(app.url) ? (
              <a href={getSafeCvUrl(app.url)} target="_blank" rel="noreferrer">
                {t("field.openCv")}
              </a>
            ) : (
              app.url
            )}
          </p>
        )}
        {app.letter && <p>{t("field.coverLetter")}: {app.letter}</p>}
      </div>

      <div className="buttons-container">
        <button className="view-button" onClick={() => openApplicationModal(app, "view")}>
          {t("button.view")}
        </button>

        <button className="edit-button" onClick={() => openApplicationModal(app, "edit")}>
          {t("button.edit")}
        </button>

        <button
          className="delete-button"
          onClick={() => setPendingDeleteApplication(app)}
        >
          {t("button.delete")}
        </button>
      </div>
    </div>
  ))}
</div>
</>
  
  );
}
