import * as yup from 'yup';
import { strings, Language } from './strings';

const loginUsernameValidator = (lang: Language) =>
  yup.string().required(strings[lang].errors.usernameRequired);

const loginPasswordValidator = (lang: Language) =>
  yup.string().required(strings[lang].errors.passwordRequired);

const registerUsernameSchemas = (lang: Language) => ({
  India: yup
    .string()
    .required(strings[lang].errors.usernameRequired)
    .matches(/^[a-zA-Z].{5,}$/, strings[lang].usernameSchemaMessages.India),
  Portugal: yup
    .string()
    .required(strings[lang].errors.usernameRequired)
    .min(5, strings[lang].usernameSchemaMessages.Portugal),
  UAE: yup
    .string()
    .required(strings[lang].errors.usernameRequired)
    .matches(/[a-zA-Z0-9].{4,}$/, strings[lang].usernameSchemaMessages.UAE),
  UK: yup
    .string()
    .required(strings[lang].errors.usernameRequired)
    .min(5, strings[lang].usernameSchemaMessages.UK),
});

const registerEmailValidator = (lang: Language) =>
  yup.string().email().required(strings[lang].errors.emailRequired);

const registerPasswordValidator = (lang: Language) =>
  yup
    .string()
    .required(strings[lang].errors.passwordRequired)
    .min(8, strings[lang].errors.passwordTooShort)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      strings[lang].errors.passwordComplexity
    );

export const validators = {
  loginUsernameValidator,
  loginPasswordValidator,
  registerUsernameSchemas,
  registerEmailValidator,
  registerPasswordValidator,
};
