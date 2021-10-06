# Code Experiment React Playground

We are exploring how to use TypeScript with React and attach our front end to our fast api todo app.

## Auth

### Components

- Button
  - props
    - text
    - onClick
- AuthFormComponent
  - props
    - formType
      - sign-up
      - login

### Pages

- AuthPage
  - Button
    - text
      - Log In
    - navigate
      - login
  - Button
    - text
      - Sign Up
    - navigate
      - sign-up
- LoginPage
  - AuthFormComponent
    - formType
      - login
- SignupPage
  - AuthFormComponent
    - formType
      - signup

### Michaels Planning

```
  (initial-auth-page)
    2 buttons
      - buttons send you to the auth form page with a prop of either login or sign-up
  loginPage
  signupPage
  (auth-form-page)
    props
      - takes activeForm prop of either login or sign-up
      - changes heading text based on activeFormProp
      - adds a form input of confirm password based on activeForm prop
    functions
      - form-submitted
        - preforms different duties based on activeForm prop
          Ex: preform setup for loging in if activeProp = ‘login’
```
