import * as Yup from "yup";

export const signupSchema = Yup.object({
  firstname: Yup.string()
    .required("First name cannot be empty")
    .min(3, "Minimum 3 characters required")
    .max(15, "First name cannot be more than 15 characters long"),

  lastname: Yup.string()
    .required("Last name cannot be empty")
    .min(1, "Minimum 1 characters required")
    .max(15, "Last name cannot be more than 15 characters long"),

  email: Yup.string().email().required("Please enter your email"),

  password: Yup.string()
    .required("Please enter your password")
    .min(6, "Minimum 6 characters required")
    .max(15, "Password cannot be more than 15 characters long"),

  confirm_password: Yup.string()
    .required("Please re-enter your password")
    .oneOf([Yup.ref("password"), null], "Passwords do not match"),
});
