import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import createApplication from "../../createApplication";
import { useLanguage } from "../../LanguageContext";
import { APPLICATION_ACTIONS } from "../../reducer/applicationActions";
import validateApplication from "../../validateApplication";
import "./AddApp.css";

const initialValues = {
  "full-name": "",
  years: "",
  email: "",
  url: "",
  number: "",
  letter: "",
  position: "",
  company: "",
  salary: "",
};

export default function AddApp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useLanguage();

  function submitApplication(values) {
    dispatch({
      type: APPLICATION_ACTIONS.ADD_APPLICATION,
      payload: createApplication(values),
    });
    navigate("/");
  }

  return (
    <div className="input-styles">
      <h1>{t("nav.addApplication")}</h1>
      <Formik
        initialValues={initialValues}
        validate={(values) => validateApplication(values, t)}
        onSubmit={submitApplication}
      >
        <Form noValidate>
          <div className="form-field">
            <label htmlFor="full-name">{t("field.fullName")} <span>*</span></label>
            <Field id="full-name" name="full-name" type="text" />
            <ErrorMessage name="full-name" component="p" className="field-error" />
          </div>
          <div className="form-field">
            <label htmlFor="years">{t("field.experience")} <span>*</span></label>
            <Field id="years" name="years" type="number" min="0" step="any" />
            <ErrorMessage name="years" component="p" className="field-error" />
          </div>
          <div className="form-field">
            <label htmlFor="email">{t("field.email")} <span>*</span></label>
            <Field id="email" name="email" type="email" />
            <ErrorMessage name="email" component="p" className="field-error" />
          </div>
          <div className="form-field">
            <label htmlFor="url">{t("field.cvUrl")} <span>*</span></label>
            <Field id="url" name="url" type="url" />
            <ErrorMessage name="url" component="p" className="field-error" />
          </div>
          <div className="form-field">
            <label htmlFor="number">{t("field.phone")} <span>*</span></label>
            <Field id="number" name="number" type="tel" />
            <ErrorMessage name="number" component="p" className="field-error" />
          </div>
          <div className="form-field">
            <label htmlFor="position">{t("field.position")} <span>*</span></label>
            <Field id="position" name="position" type="text" />
            <ErrorMessage name="position" component="p" className="field-error" />
          </div>
          <div className="form-field">
            <label htmlFor="company">{t("field.company")} <span>*</span></label>
            <Field id="company" name="company" type="text" />
            <ErrorMessage name="company" component="p" className="field-error" />
          </div>
          <div className="form-field">
            <label htmlFor="salary">{t("field.salary")}</label>
            <Field id="salary" name="salary" type="number" min="0" step="0.01" />
            <ErrorMessage name="salary" component="p" className="field-error" />
          </div>
          <div className="form-field full-width">
            <label htmlFor="letter">{t("field.coverLetter")} <span>*</span></label>
            <Field id="letter" name="letter" as="textarea" rows="4" />
            <ErrorMessage name="letter" component="p" className="field-error" />
          </div>
          <div className="buttons-style">
            <button type="button" onClick={() => navigate("/")}>{t("button.cancel")}</button>
            <button type="submit">{t("button.addApplication")}</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
