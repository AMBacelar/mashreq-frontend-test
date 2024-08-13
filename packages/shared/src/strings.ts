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
  fr: {
    header: 'Application native avec',
    usernameLabel: "Nom d'utilisateur",
    emailLabel: 'E-mail',
    passwordLabel: 'Mot de passe',
    confirmPasswordLabel: 'Confirmer le mot de passe',
    countryLabel: 'Pays de résidence',
    formSubmitted: 'Formulaire soumis',
    submitButton: "S'inscrire",
    submittingButton: 'Envoi...',
    cantSubmitButton: 'Impossible de soumettre pour le moment',
    validating: 'Validation en cours...',
    errors: {
      usernameRequired: "Le nom d'utilisateur est requis",
      emailRequired: "L'email est requis",
      passwordRequired: 'Le mot de passe est requis',
      passwordTooShort: 'Le mot de passe doit comporter au moins 8 caractères',
      passwordComplexity:
        'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial',
      confirmPasswordMismatch: 'Les mots de passe ne correspondent pas',
      countryRequired: 'Le pays est requis',
    },
    usernameSchemaMessages: {
      India:
        "Le nom d'utilisateur doit commencer par une lettre et comporter au moins 6 caractères",
      Portugal: "Le nom d'utilisateur doit comporter au moins 5 caractères",
      UAE: "Le nom d'utilisateur doit être alphanumérique et comporter au moins 5 caractères",
      UK: "Le nom d'utilisateur doit comporter au moins 5 caractères",
    },
  },
  pt: {
    header: 'Aplicativo nativo com',
    usernameLabel: 'Nome de usuário',
    emailLabel: 'Email',
    passwordLabel: 'Senha',
    confirmPasswordLabel: 'Confirmar senha',
    countryLabel: 'País de residência',
    formSubmitted: 'Formulário enviado',
    submitButton: 'Registrar',
    submittingButton: 'Enviando...',
    cantSubmitButton: 'Ainda não é possível enviar',
    validating: 'Validando...',
    errors: {
      usernameRequired: 'Nome de usuário é obrigatório',
      emailRequired: 'Email é obrigatório',
      passwordRequired: 'Senha é obrigatória',
      passwordTooShort: 'A senha deve ter pelo menos 8 caracteres',
      passwordComplexity:
        'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
      confirmPasswordMismatch: 'As senhas não coincidem',
      countryRequired: 'País é obrigatório',
    },
    usernameSchemaMessages: {
      India:
        'O nome de usuário deve começar com uma letra e ter pelo menos 6 caracteres',
      Portugal: 'O nome de usuário deve ter pelo menos 5 caracteres',
      UAE: 'O nome de usuário deve ser alfanumérico e ter pelo menos 5 caracteres',
      UK: 'O nome de usuário deve ter pelo menos 5 caracteres',
    },
  },
} as const;

export type Language = keyof typeof strings;
