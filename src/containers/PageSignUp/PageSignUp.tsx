import React, { FC, useEffect, useState } from "react";
import LayoutPage from "components/LayoutPage/LayoutPage";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import axios from "../../axiosInstance";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "app/slices/userSlice";

export interface PageSignUpProps {
  className?: string;
}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "http://localhost:5050/authentication/facebook",
    icon: facebookSvg,
  },
  {
    name: "Continue with Github",
    href: "http://localhost:5050/authentication/github",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    // href: "http://localhost:5050/authentication/google",
    icon: googleSvg,
  },
];

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/authentication/google/callback")
      .then((res) => {
        console.log(res);
        dispatch(login(res.data.token));
      })
      .catch((err) => {
        setErros(err);
      });
  }, [token]);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { firstName, lastName, email, password } = user;
  const [errors, setErros] = useState([]);
  let history = useHistory();

  const register = (e) => {
    e.preventDefault();
    axios
      .post("/authentication/register", user)

      .then((res) => {
        console.log(res.data);
        history.push("/login");
      })

      .catch((err) => {
        setErros(err.response.data);
      });
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const onchange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={`nc-PageSignUp ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up || Blog Magazine React Template</title>
      </Helmet>
      <LayoutPage
        subHeading="Welcome to our blog magazine Community"
        headingEmoji="🎉"
        heading="Sign up"
      >
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
               
                key={index}
                href={item.href}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form
            className="grid grid-cols-1 gap-6"
            onSubmit={(e) => register(e)}
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                First Name
              </span>
              <Input
                onChange={(e) => onchange(e)}
                type="text"
                name="firstName"
                className="mt-1"
                value={firstName}
              />
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Last Name
              </span>
              <Input
                onChange={(e) => onchange(e)}
                type="text"
                name="lastName"
                className="mt-1"
                value={lastName}
              />
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                name="email"
                onChange={(e) => onchange(e)}
                value={email}
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input
                onChange={(e) => onchange(e)}
                type="password"
                name="password"
                className="mt-1"
                value={password}
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Confirm Password
              </span>
              <Input type="password" name="ConfirmPassword" className="mt-1" />
            </label>
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <NcLink to="/login">Sign in</NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageSignUp;
