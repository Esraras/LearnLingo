import * as yup from "yup";

export const bookingSchema = yup.object({
  reason: yup.string().required("Please select a reason"),
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9()+\s-]{7,20}$/, "Enter a valid phone number"),
});
