export const strings = {
  en: {
    header: 'Native App with',
    usernameLabel: 'Username',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    confirmPasswordLabel: 'Confirm Password',
    countryLabel: 'Country of Residence',
    formSubmitted: 'Form submitted',
    submitButton: 'Register',
    submittingButton: 'Submitting...',
    cantSubmitButton: "Can't submit yet",
    validating: 'Validating...',
    errors: {
      usernameRequired: 'Username is required',
      emailRequired: 'Email is required',
      passwordRequired: 'Password is required',
      passwordTooShort: 'Password must be at least 8 characters long',
      passwordComplexity:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      confirmPasswordMismatch: 'Passwords do not match',
      countryRequired: 'Country is required',
    },
    usernameSchemaMessages: {
      India:
        'Username must start with a letter and be at least 6 characters long',
      Portugal: 'Username must be at least 5 characters long',
      UAE: 'Username must be alphanumeric and be at least 5 characters long',
      UK: 'Username must be at least 5 characters long',
    },
  },
};
