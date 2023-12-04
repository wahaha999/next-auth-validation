import * as yup from "yup";

// yup schema
const registerSchema = yup.object().shape({
  username: yup.string().required("Username is required."),
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required."),
  password: yup
    .string()
    .required("Password is required.")
    .min(8, "At least 8 chars")
    .matches(/[a-z]/, "At least one lowercase char")
    .matches(/[A-Z]/, "At least one uppercase char")
    .matches(
      /[a-zA-Z]+[^a-zA-Z\s]+/,
      "At least 1 number or special char (@,!,#, etc)."
    ),
  password_confirm: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export default registerSchema;
