import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  Email: string;
  Password: string;
  "Confirm password": string;
};

const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();
  const password = React.useRef({});
  password.current = watch("Password", "");

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        placeholder="Email"
        {...register("Email", {
          required: "You must specify a Email",
          pattern: /^\S+@\S+$/i,
        })}
        aria-label="Email"
        id="email"
      />
      {errors.Email?.type === "required" && (
        <p className="error-text">{errors.Email.message}</p>
      )}
      {errors.Email?.type === "pattern" && (
        <p className="error-text">Please supply a valid email address.</p>
      )}

      <label htmlFor="password">Password</label>
      <input
        placeholder="Enter Password"
        {...register("Password", {
          required: "You must specify a Password",
          minLength: {
            value: 8,
            message: "Your Password must have at least 8 characters",
          },
        })}
        aria-label="Password"
        id="password"
      />
      {errors.Password && (
        <p className="error-text">{errors.Password.message}</p>
      )}

      <label htmlFor="confirm password">Confirm password</label>
      <input
        placeholder="Confirm password"
        {...register("Confirm password", {
          validate: (value) =>
            value === password.current || "The passwords do not match",
        })}
        aria-label="Confirm password"
        id="confirm password"
      />
      {errors["Confirm password"] && (
        <p className="error-text">{errors["Confirm password"].message}</p>
      )}

      <input type="submit" value="Sign Up" />
    </form>
  );
};

export default AuthForm;
