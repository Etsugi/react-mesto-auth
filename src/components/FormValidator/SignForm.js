import * as Yup from "yup";

const SignFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Некорректный email адрес")
    .required("Email обязателен"),
  password: Yup.string()
    .min(6, "Длина пароля не менее 6 символов")
    .max(20, "Длина пароля не более 20 символов")
    .required("Пароль обязателен")
});

export default SignFormSchema;
