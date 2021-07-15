import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  Email: string;
  Password: string;
  "Confirm password": string;
};

const AuthForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
      <input
        placeholder="Email"
        {...register("Email")}
        aria-label="Email"
        id="email"
      />
      <label htmlFor="password">Password</label>
      <input
        placeholder="Enter Password"
        {...register("Password")}
        aria-label="Password"
        id="password"
      />
      <label htmlFor="confirm password">Confirm password</label>
      <input
        placeholder="Confirm password"
        {...register("Confirm password")}
        aria-label="Confirm password"
        id="confirm password"
      />
      <input type="submit" value="Sign Up" />
    </form>
  );
};

export default AuthForm;
