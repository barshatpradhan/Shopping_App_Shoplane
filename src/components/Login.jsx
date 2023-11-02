import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../schemas/loginSchema";
import { TbLogin } from "react-icons/tb";

function Login() {
  const initialValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const onSubmit = () => {
    alert("Login Sucessfull.");
    navigate("/");
  };

  return (
    <>
      <div className="form-div-container">
        <div className="card form-container">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={loginSchema}
            validateOnMount
          >
            {(formik) => {
              return (
                <Form>
                  <div className="form-div">
                    <h2>LOGIN</h2>
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
                    <div>
                      <button
                        type="submit"
                        value="Login"
                        className="btn blue-btn login-page-btn"
                        disabled={!formik.isValid}
                      >
                        <TbLogin size={"20px"} />
                        Login
                      </button>
                    </div>
                    <p>
                      Don't have an account? Sign up{" "}
                      <Link to={"/signup"}>here.</Link>
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

export default Login;
