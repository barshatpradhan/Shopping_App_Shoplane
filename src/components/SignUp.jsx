import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaRegAddressCard } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "../schemas/signupSchema";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/Slice/AuthSlice";
import { useState } from "react";

function SignUp() {
  const [requestResponse, setRequestResponse] = useState({
    textMessage: "",
    alertClass: "",
  });

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = (values) => {
    const { email, password, firstname, lastname } = values;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User registered:", user);

        dispatch(loginUser(user));

        updateProfile(user, { displayName: `${firstname} ${lastname}` })
          .then(() => {
            console.log("User profile updated:", user);

            navigate("/login");

            setRequestResponse({
              textMessage: "Signup successful. Please log in.",
              alertClass: "alert alert-success",
            });
          })
          .catch((profileError) => {
            console.error("Profile update error:", profileError);

            setRequestResponse({
              textMessage: "Error updating user profile.",
              alertClass: "alert alert-danger",
            });
          });
      })
      .catch((registrationError) => {
        console.error("Registration error:", registrationError);

        setRequestResponse({
          textMessage: "Error during signup. Please try again.",
          alertClass: "alert alert-danger",
        });
      });
  };

  return (
    <>
      <div className="form-div-container">
        <div className="card form-container">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSignup}
            validationSchema={signupSchema}
            validateOnMount
          >
            {(formik) => {
              return (
                <Form>
                  <div className="form-div">
                    <div className={requestResponse.alertClass}>
                      {requestResponse.textMessage}
                    </div>
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
                        onSubmit={handleSignup}
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
