import * as yup from "yup";

export const signUpSchema = yup.object({
  userName: yup.string().min(2).max(25).required("please Enter your name"),
  email: yup.string().email().required("please Enter your email"),
  password: yup
    .string()
    .min(6)
    .max(25)
    .required("password must contain atleast 6 characters"),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "password must be same"),
});

export const loginSchema = yup.object({
  email: yup.string().email().required("please Enter your email"),
  password: yup
    .string()
    .min(6)
    .max(25)
    .required("password must contain atleast 6 characters"),
});
