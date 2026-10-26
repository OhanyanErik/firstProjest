import { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useLanguage } from "../LanguageContext";
import "./OpenModal.css";
import validateApplication from "../validateApplication";

export default function OpenModal({ onClose, onSubmit, application, mode }) {
  const isViewMode = mode === "view";
  const { t } = useLanguage();
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
      <div className="modal-contnet" role="dialog" aria-modal="true" aria-label={isViewMode ? t("application.view") : mode === "edit" ? t("application.edit") : t("button.addApplication")}>
        <div className="conteiner">
          <div className="input-style">
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validate={(values) => validateApplication(values, t)}
              onSubmit={onSubmit}
            >
              <Form noValidate>
                <div className="form-field">
                  <label htmlFor="full-name">{t("field.fullName")} <span>*</span></label>
                  <Field id="full-name" name="full-name" type="text" required disabled={isViewMode} autoFocus={!isViewMode} />
                  <ErrorMessage name="full-name" component="p" className="field-error" />
                </div>
                <div className="form-field">
                  <label htmlFor="years">{t("field.experience")} <span>*</span></label>
                  <Field id="years" name="years" type="number" min="0" required disabled={isViewMode} />
                  <ErrorMessage name="years" component="p" className="field-error" />
                </div>
                <div className="form-field">
                  <label htmlFor="email">{t("field.email")} <span>*</span></label>
                  <Field id="email" name="email" type="email" required disabled={isViewMode} />
                  <ErrorMessage name="email" component="p" className="field-error" />
                </div>
                <div className="form-field">
                  <label htmlFor="url">{t("field.cvUrl")} <span>*</span></label>
                  <Field id="url" name="url" type="url" required disabled={isViewMode} />
                  <ErrorMessage name="url" component="p" className="field-error" />
                </div>
                <div className="form-field">
                  <label htmlFor="number">{t("field.phone")} <span>*</span></label>
                  <Field id="number" name="number" type="tel" required disabled={isViewMode} />
                  <ErrorMessage name="number" component="p" className="field-error" />
                </div>
                <div className="form-field">
                  <label htmlFor="letter">{t("field.coverLetter")} <span>*</span></label>
                  <Field id="letter" name="letter" as="textarea" rows="3" required disabled={isViewMode} />
                  <ErrorMessage name="letter" component="p" className="field-error" />
                </div>
                <div className="form-field">
                  <label htmlFor="position">{t("field.position")} <span>*</span></label>
                  <Field id="position" name="position" type="text" required disabled={isViewMode} />
                  <ErrorMessage name="position" component="p" className="field-error" />
                </div>
                <div className="form-field">
                  <label htmlFor="company">{t("field.company")} <span>*</span></label>
                  <Field id="company" name="company" type="text" required disabled={isViewMode} />
                  <ErrorMessage name="company" component="p" className="field-error" />
                </div>
                <div className="form-field full-width">
                  <label htmlFor="salary">{t("field.salary")}</label>
                  <Field id="salary" name="salary" type="number" min="0" step="0.01" disabled={isViewMode} />
                  <ErrorMessage name="salary" component="p" className="field-error" />
                </div>
                <div className="form-actions">
                  <button type="button" onClick={onClose} autoFocus={isViewMode}>{t("button.close")}</button>
                  {!isViewMode && (
                    <button type="submit" className="submit-button">
                      {mode === "edit" ? t("button.save") : t("button.addApplication")}
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
