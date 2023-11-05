import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../schemas/loginSchema";
import { TbLogin } from "react-icons/tb";
import { useState } from "react";
import { AuthErrorCodes, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { loginUser, saveUserSpecificData, setLoading } from "../redux/Slice/AuthSlice";
import { fetchUserData } from "../firebase/userApi";
import { addToCart, addToWishlist } from "../redux/Slice/CartSlice";

function Login() {
  const [requestResponse, setRequestResponse] = useState({
    textMessage: "",
    alertClass: "",
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUserSpecificData = async (user) => {
    try {
      const uid = user.uid;
      const userData = await fetchUserData(uid);

      dispatch(
        saveUserSpecificData({
          uid,
          userCart: userData.cart,
          userWishlist: userData.wishlist,
        })
      );
    } catch (error) {
      console.error("Data fetching error:", error);
    }
  };
  
  const onSubmit = async (values) => {
    const { email, password } = values;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      dispatch(loginUser(user));
      fetchUserSpecificData(user);

      localStorage.setItem("userToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      setRequestResponse({
        textMessage: "Login successful, thank you.",
        alertClass: "alert alert-success",
      });

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      if (error.code === AuthErrorCodes.WRONG_PASSWORD) {
        setRequestResponse({
          textMessage: "Incorrect password. Please try again.",
          alertClass: "alert alert-danger",
        });
      } else if (error.code === AuthErrorCodes.USER_NOT_FOUND) {
        setRequestResponse({
          textMessage: "User not found. Please sign up.",
          alertClass: "alert alert-danger",
        });
      } else {
        setRequestResponse({
          textMessage: "Login failed. Please check your credentials.",
          alertClass: "alert alert-danger",
        });
      }
    }
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
                    <div className={requestResponse.alertClass}>
                      {requestResponse.textMessage}
                    </div>
                    <h2>LOGIN</h2>
                    <div className="form-input">
                      <Field
                        type="text"
                        name="email"
                        id="email"
                        placeholder="User Name"
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
