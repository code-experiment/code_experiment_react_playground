// TODO:  Add regex to the password if you want https://stackoverflow.com/questions/19605150/
// TODO:  Need to clear server error in order to submit
import * as React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
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
  const { login } = useAuth();
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
    const username = data.username;
    const password = data.password;
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    axios({
      method: "post",
      url: `http://localhost:8000/${props.signup ? "create-user" : "login"}`,
      data: props.signup ? { username, password } : formData,
      headers: {
        "Content-Type": props.signup
          ? "application/json"
          : "multipart/form-data",
      },
    })
      .then((res) => {
        login(res.data.access_token);
        history.push("/");
      })
      .catch((err) => {
        console.error(err);
        console.error(err.response);
        console.error(err.request);
        console.error(err.message);
        if (err.response) {
          setError("server", {
            type: "server",
            message: err.response.data.detail,
          });
        } else {
          setError("server", {
            type: "server",
            message: err.message,
          });
        }
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
