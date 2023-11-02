import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaRegAddressCard } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "../schemas/signupSchema";

function SignUp() {
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const navigate = useNavigate();

  const onSubmit = (values) => {
    alert(" Sign Up Sucessfull Sucessfull");
    navigate("/login");
    console.log("🚀 ~ file: SignUp.jsx:21 ~ SignUp ~ values:", values);
  };

  return (
    <>
      <div className="form-div-container">
        <div className="card form-container">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={signupSchema}
            validateOnMount
          >
            {(formik) => {
              return (
                <Form>
                  <div className="form-div">
                    <h2>Sign Up</h2>
                    <div className="form-input">
                      <Field
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="First Name"
                        className={
                          formik.touched.firstname && formik.errors.firstname
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                      />
                      <ErrorMessage name="firstname">
                        {(errorMessage) => (
                          <small className="text-danger">{errorMessage}</small>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className="form-input">
                      <Field
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Last Name"
                        className={
                          formik.touched.lastname && formik.errors.lastname
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                      />
                      <ErrorMessage name="lastname">
                        {(errorMessage) => (
                          <small className="text-danger">{errorMessage}</small>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className="form-input">
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email Address"
                        className={
                          formik.touched.email && formik.errors.email
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                      />
                      <ErrorMessage name="email">
                        {(errorMessage) => (
                          <small className="text-danger">{errorMessage}</small>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className="form-input">
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        className={
                          formik.touched.password && formik.errors.password
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                      />
                      <ErrorMessage name="password">
                        {(errorMessage) => (
                          <small className="text-danger">{errorMessage}</small>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className="form-input">
                      <Field
                        type="password"
                        name="confirm_password"
                        id="confirm_password"
                        placeholder="Confirm Password"
                        className={
                          formik.touched.confirm_password &&
                          formik.errors.confirm_password
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                      />
                      <ErrorMessage name="confirm_password">
                        {(errorMessage) => (
                          <small className="text-danger">{errorMessage}</small>
                        )}
                      </ErrorMessage>
                    </div>
                    <div>
                      <button
                        type="submit"
                        value="Register"
                        className="btn blue-btn signup-page-btn"
                        disabled={!formik.isValid}
                      >
                        <FaRegAddressCard size={"18px"} />
                        Sign Up
                      </button>
                    </div>
                    <p>
                      Already have an account? Login{" "}
                      <Link to={"/login"}>here.</Link>
                    </p>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
}
export default SignUp;
