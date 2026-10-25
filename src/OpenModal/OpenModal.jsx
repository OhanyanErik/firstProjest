import { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "./OpenModal.css";
import validateApplication from "../validateApplication";

export default function OpenModal({ onClose, onSubmit, application, mode }) {
  const isViewMode = mode === "view";
  const initialValues = {
    "full-name": application?.["full-name"] ?? "",
    years: application?.years ?? "",
    email: application?.email ?? "",
    url: application?.url ?? "",
    number: application?.number ?? "",
    letter: application?.letter ?? "",
    position: application?.position ?? "",
    company: application?.company ?? "",
    salary: application?.salary ?? "",
  };

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="modal"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal-contnet" role="dialog" aria-modal="true" aria-label={isViewMode ? "View application" : mode === "edit" ? "Edit application" : "Add application"}>
        <div className="conteiner">
          <div className="input-style">
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validate={validateApplication}
              onSubmit={onSubmit}
            >
              <Form noValidate>
                <div className="form-field">
                  <label htmlFor="full-name">Full Name <span>*</span></label>
                  <Field id="full-name" name="full-name" type="text" required disabled={isViewMode} autoFocus={!isViewMode} />
                  <ErrorMessage name="full-name" component="p" className="field-error" />
                </div>
                <div className="form-field">
                  <label htmlFor="years">Experience (years) <span>*</span></label>
                  <Field id="years" name="years" type="number" min="0" required disabled={isViewMode} />
                  <ErrorMessage name="years" component="p" className="field-error" />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email <span>*</span></label>
                  <Field id="email" name="email" type="email" required disabled={isViewMode} />
                  <ErrorMessage name="email" component="p" className="field-error" />
                </div>
                <div className="form-field">
                  <label htmlFor="url">CV URL <span>*</span></label>
                  <Field id="url" name="url" type="url" required disabled={isViewMode} />
                  <ErrorMessage name="url" component="p" className="field-error" />
                </div>
                <div className="form-field">
                  <label htmlFor="number">Phone <span>*</span></label>
                  <Field id="number" name="number" type="tel" required disabled={isViewMode} />
                  <ErrorMessage name="number" component="p" className="field-error" />
                </div>
                <div className="form-field">
                  <label htmlFor="letter">Cover Letter <span>*</span></label>
                  <Field id="letter" name="letter" as="textarea" rows="3" required disabled={isViewMode} />
                  <ErrorMessage name="letter" component="p" className="field-error" />
                </div>
                <div className="form-field">
                  <label htmlFor="position">Position <span>*</span></label>
                  <Field id="position" name="position" type="text" required disabled={isViewMode} />
                  <ErrorMessage name="position" component="p" className="field-error" />
                </div>
                <div className="form-field">
                  <label htmlFor="company">Company <span>*</span></label>
                  <Field id="company" name="company" type="text" required disabled={isViewMode} />
                  <ErrorMessage name="company" component="p" className="field-error" />
                </div>
                <div className="form-field full-width">
                  <label htmlFor="salary">Salary Expectation</label>
                  <Field id="salary" name="salary" type="number" min="0" step="0.01" disabled={isViewMode} />
                  <ErrorMessage name="salary" component="p" className="field-error" />
                </div>
                <div className="form-actions">
                  <button type="button" onClick={onClose} autoFocus={isViewMode}>Close</button>
                  {!isViewMode && (
                    <button type="submit" className="submit-button">
                      {mode === "edit" ? "Save Changes" : "Add Application"}
                    </button>
                  )}
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
