import { Field,Form,Formik } from "formik";
import "./OpenModal.css"

export default function OpenModal({onClose,onAdd}){
    return(
       <div className="modal">
        <div className="modal-contnet">
          <div className="conteiner">
                      <div className="input-style">
                      <Formik initialValues={{ 
           "full-name": "",
            years: "",
            email: "",
            url: "",
            number: "",
            letter: "",
            position: "",
            company: "",
            salary: "", }}
                  onSubmit={async (values) => {
                      await new Promise((resolve) => setTimeout(resolve, 500));
                    onAdd([values]);
                  }}>
                          <Form> 
                              <div className="form-field">
                              <label htmlFor="full-name">Full Name <span>*</span></label>
                              <Field  className="full-name"name="full-name" type="text" required/>
                              </div>
                               <div className="form-field">
                              <label htmlFor="years">Experience(years)<span>*</span> </label>
                              <Field name="years" type="number" required/>
                               </div>
                              <div className="form-field">
                              <label htmlFor="email">Email <span>*</span> </label>
                              <Field name="email" type="email" required />
                              </div>
                                <div >
                              <label htmlFor="url"> CV URL <span>*</span></label>
                              <Field name="url" type="url" required />
                                </div>
                              <div className="form-field">
                              <label htmlFor="number"> Phone <span>*</span></label>
                              <Field name="number" type="number" required />
                              </div>
                              <div className="form-field">
                              <label htmlFor="letter"> Cover Letter <span>*</span>  </label>
                              <Field name="letter" type="text" required />
                              </div>
                             <div className="form-field">
                              <label htmlFor="position"> Position <span>*</span></label>
                              <Field name="position" type="text" required />
                             </div>
                              <div className="form-field">
                              <label htmlFor="company"> Company <span>*</span></label>
                              <Field name="company" type="text" required />
                              </div>
                              <div className="form-field">
                              <label htmlFor="salary"> Salary Expectation <span>*</span> </label>
                              <Field name="salary" type="number"/>
                              </div>
                  <div className="form-actions">
                      <button onClick={onClose}>Cancel</button>
                      <button className="submit-button">Submit Appilication</button>
                  </div>
                          </Form>
                      </Formik>
                  </div>
                  </div>
      
        </div>
       </div>
    )
}