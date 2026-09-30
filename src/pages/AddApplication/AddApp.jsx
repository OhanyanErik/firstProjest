import { Formik,Form,Field } from "formik";
import "./AddApp.css";


export default function AddApp(){
    return(
        <div className="conteiner">
            <div className="input-styles">
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
          alert(JSON.stringify(values, null, 2));
        }}>
                <Form> 
                    
                    <label htmlFor="full-name">Full Name <span>*</span></label>
                    <Field  className="full-name"name="full-name" type="text" required/>

                    <label htmlFor="years">Experience(years)<span>*</span> </label>
                    <Field name="years" type="number" required min="0" step="any"/>

                    <label htmlFor="email">Email <span>*</span> </label>
                    <Field name="email" type="email" required />

                    <label htmlFor="url"> CV URL <span>*</span></label>
                    <Field name="url" type="url" required />

                    <label htmlFor="number"> Phone <span>*</span></label>
                    <Field name="number" type="number" required />

                    <label htmlFor="letter"> Cover Letter <span>*</span>  </label>
                    <Field name="letter" type="text" required  minLength={50}/>

                    <label htmlFor="position"> Position <span>*</span></label>
                    <Field name="position" type="text" required />

                    <label htmlFor="company"> Company <span>*</span></label>
                    <Field name="company" type="text" required />
                    
                    <label htmlFor="salary"> Salary Expectation <span>*</span> </label>
                    <Field name="salary" type="number" min="0.01" step="0.01"/>
        <div className="buttons-style">
            <button>Cancel</button>
            <button>Submit Appilication</button>
        </div>
                </Form>
            </Formik>
        </div>
        </div>
    )
}