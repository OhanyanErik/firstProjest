import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import createApplication from "../../createApplication";
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

  function submitApplication(values) {
    dispatch({
      type: APPLICATION_ACTIONS.ADD_APPLICATION,
      payload: createApplication(values),
    });
    navigate("/");
  }

  return (
    <div className="input-styles">
      <h1>Add Application</h1>
      <Formik
        initialValues={initialValues}
        validate={validateApplication}
        onSubmit={submitApplication}
      >
        <Form noValidate>
          <div className="form-field">
            <label htmlFor="full-name">Full Name <span>*</span></label>
            <Field id="full-name" name="full-name" type="text" />
            <ErrorMessage name="full-name" component="p" className="field-error" />
          </div>
          <div className="form-field">
            <label htmlFor="years">Experience (years) <span>*</span></label>
            <Field id="years" name="years" type="number" min="0" step="any" />
            <ErrorMessage name="years" component="p" className="field-error" />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email <span>*</span></label>
            <Field id="email" name="email" type="email" />
            <ErrorMessage name="email" component="p" className="field-error" />
          </div>
          <div className="form-field">
            <label htmlFor="url">CV URL <span>*</span></label>
            <Field id="url" name="url" type="url" />
            <ErrorMessage name="url" component="p" className="field-error" />
          </div>
          <div className="form-field">
            <label htmlFor="number">Phone <span>*</span></label>
            <Field id="number" name="number" type="tel" />
            <ErrorMessage name="number" component="p" className="field-error" />
          </div>
          <div className="form-field">
            <label htmlFor="position">Position <span>*</span></label>
            <Field id="position" name="position" type="text" />
            <ErrorMessage name="position" component="p" className="field-error" />
          </div>
          <div className="form-field">
            <label htmlFor="company">Company <span>*</span></label>
            <Field id="company" name="company" type="text" />
            <ErrorMessage name="company" component="p" className="field-error" />
          </div>
          <div className="form-field">
            <label htmlFor="salary">Salary Expectation</label>
            <Field id="salary" name="salary" type="number" min="0" step="0.01" />
            <ErrorMessage name="salary" component="p" className="field-error" />
          </div>
          <div className="form-field full-width">
            <label htmlFor="letter">Cover Letter <span>*</span></label>
            <Field id="letter" name="letter" as="textarea" rows="4" />
            <ErrorMessage name="letter" component="p" className="field-error" />
          </div>
          <div className="buttons-style">
            <button type="button" onClick={() => navigate("/")}>Cancel</button>
            <button type="submit">Submit Application</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
