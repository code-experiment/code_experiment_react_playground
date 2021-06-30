// TODO:  Add regex to the password if you want https://stackoverflow.com/questions/19605150/
import * as React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
  password_repeat: string;
  server: string;
};

export interface AuthFormProps {
  signup?: boolean;
}

const AuthForm = (props: AuthFormProps) => {
  const authContext = React.useContext(AuthContext);
  let history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>();
  const password = React.useRef({});
  password.current = watch("password", "");

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    let formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    axios({
      method: "post",
      url: "http://localhost:8000/login",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log(res);
        authContext?.login(res.data.access_token)
        history.push('/')
      })
      .catch((err) => {
        console.error(err.response.data.detail);
        setError("server", {
          type: "server",
          message: err.response.data.detail,
        });
        console.log(errors);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        aria-invalid={errors.username ? "true" : "false"}
        {...register("username", {
          required: "You must specify a username",
          minLength: {
            value: 8,
            message: "username must have at least 8 characters",
          },
        })}
      />
      {errors.username && <p role="alert">{errors.username.message}</p>}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        aria-invalid={errors.password ? "true" : "false"}
        {...register("password", {
          required: "You must specify a password",
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters",
          },
        })}
      />
      {errors.password && <p role="alert">{errors.password.message}</p>}

      {props.signup && (
        <>
          <label htmlFor="password_repeat">Repeat password</label>
          <input
            id="password_repeat"
            type="password"
            aria-invalid={errors.password_repeat ? "true" : "false"}
            {...register("password_repeat", {
              validate: (value) =>
                value === password.current || "The passwords do not match",
            })}
          />
          {errors.password_repeat && (
            <p role="alert">{errors.password_repeat.message}</p>
          )}
        </>
      )}

      {errors.server && (
        <p role="alert">
          {errors.server.message}{" "}
          <button type="button" onClick={() => clearErrors("server")}>
            x
          </button>
        </p>
      )}
      <input type="submit" onClick={handleSubmit(onSubmit)} />
    </form>
  );
};

export default AuthForm;
