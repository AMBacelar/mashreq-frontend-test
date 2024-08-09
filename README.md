TODOs:

- [x] monorepo setup
- [x] simple register screen
- [x] registration input field validation
- [ ] Set up validation depending on selected country
- [ ] set up i18n
- [x] set up user country wide themeing (provider, I guess)
- [ ] actually implement themeing with the provider somehow...

# initial assumptions

globally:

- localisation
- user country dependant themeing

global feature:

- push notification?
- not sure of what kind of global feature is intended by the request that can be set up for a front-end service, that already has authentication, country-based themeing (and password logic) and i18n

signup screens:
fields:

- username
- country
- password
- \*phonenumber

once logged in:

- a dashboard to display user data
- should also be localised

basic api design
I will take this opportunity to play around with golang, because why not?

- secure communication with the server or API

web:

- must be responsive...
- unit and functional testing

## initial descision:

### server:

golang for the server, it is a small file, just fine for local hosting since it's better use of memory, I will provide a dockerfile just incase the person testing does not have the capability to run it with ease.

> note: I will not go further than a simple hashed password check that returns a cookie for the authentication flow. There should be a separate request made for the dashboard data, that should make an authorisation check.

### database:

sqllite, nice and easy, also the db is a file, so I can prepopulate the database with ease, will help with regards to testing.

### web:

I will use next.js, file based routing works pretty nicely for my uses, this is also an opportunity to make use of the app router.

Since I've already made teh decision to make use of tamagui on the native app, I will also use tamagui for the frontend

Nextjs also provides simple solutions for both themeing and internationalisation.

The app router also gives useful primitives in the layout components for shared layout structures, wich will be useful for the menu items that set the localisation modes.

### mobile:

I will be using expo, I am not yet decided on what solution I will use for design, I will probably choose between tamagui or shopify/restyle for a start.

### shared code

I will make use of a monorepo (turborepo) to ensure that the shared utilities only exist in one place.

examples of such tools will be:

#### localisation

I will make use of the i18n-next library because it works well on both next and mobile.

#### form validation rules

this covers the validation on the signup page

#### shared hooks

since I am using expo (react native) and nextjs (react) I have the ability to create generalised hooks that serve both components, specifically regarding authentication.

## Plan of attack

Since I am applying for a front end role, I will first focus on exclusively building the front end applications.

Although there are stretch goal features, they do require more than hard coded values to take the place of the backend.

With hard coded values, I can discover solutions for the field validation for the register screens, localisation for the entire apps, and themeing based on the users selected country.
