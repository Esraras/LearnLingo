import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email gerekli")
    .email("Geçerli bir email girin"),
  password: yup
    .string()
    .required("Şifre gerekli")
    .min(8, "Şifre en az 8 karakter olmalı"),
});

export const registerSchema = yup.object({
  name: yup.string().required("İsim gerekli"),
  email: yup
    .string()
    .required("Email gerekli")
    .email("Geçerli bir email girin"),
  password: yup
    .string()
    .required("Şifre gerekli")
    .min(8, "Şifre en az 8 karakter olmalı"),
  confirmPassword: yup
    .string()
    .required("Şifre onayı gerekli")
    .oneOf([yup.ref("password")], "Şifreler eşleşmeli"),
});
