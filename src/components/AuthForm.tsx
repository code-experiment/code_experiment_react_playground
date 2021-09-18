// TODO:  Add regex to the password if you want https://stackoverflow.com/questions/19605150/
import * as React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../utils/api";

type Inputs = {
  email: string;
  password: string;
  confirm_password: string;
  server: string;
};

export interface AuthFormProps {
  signup?: boolean;
}

const AuthForm = (props: AuthFormProps) => {
  // TODO: At some point try and figure out how to use react-hook-forms isSubmitting
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { login } = useAuth();
  let history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<Inputs>();
  const password = React.useRef({});
  password.current = watch("password", "");

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsSubmitting(true);
    const username = data.email;
    const password = data.password;
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    api({
      method: "post",
      url: `/${props.signup ? "create-user" : "login"}`,
      data: props.signup ? { username, password } : formData,
      headers: {
        "Content-Type": props.signup
          ? "application/json"
          : "multipart/form-data",
      },
    })
      .then((res) => {
        login(res.data.access_token);
        setIsSubmitting(false);
        history.push("/");
      })
      .catch((err) => {
        setIsSubmitting(false);
        if (err.response) {
          setError("email", {
            type: "server",
            message: err.response.data.detail,
          });
        } else {
          // TODO: At some point make a model instead.  Because this isn't an email error
          setError("email", {
            type: "server",
            message: err.message,
          });
        }
      });
  };

  const setButtonText = () => {
    if (isSubmitting) {
      return "Submitting...";
    } else {
      return props.signup ? "Sign Up" : "Log in";
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <div className="auth-form-item">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="janedoe999@gmail.com"
          aria-invalid={errors.email ? "true" : "false"}
          {...register("email", {
            required: "You must specify an Email",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Please supply a valid email address.",
            },
          })}
        />
        {errors.email && (
          <p className="error-text" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="auth-form-item">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          aria-invalid={errors.password ? "true" : "false"}
          {...register("password", {
            required: "You must specify a password",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          })}
        />
        {errors.password && (
          <p className="error-text" role="alert">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="auth-form-item">
        {props.signup && (
          <>
            <label htmlFor="confirm_password">Confirm password</label>
            <input
              id="confirm_password"
              type="password"
              placeholder="Enter your confirm password"
              aria-invalid={errors.confirm_password ? "true" : "false"}
              {...register("confirm_password", {
                validate: (value) =>
                  value === password.current || "The passwords do not match",
              })}
            />
            {errors.confirm_password && (
              <p className="error-text" role="alert">
                {errors.confirm_password.message}
              </p>
            )}
          </>
        )}
      </div>

      <input
        disabled={isSubmitting}
        className="auth-form-button"
        type="submit"
        onClick={handleSubmit(onSubmit)}
        value={setButtonText()}
      />
    </form>
  );
};

export default AuthForm;
