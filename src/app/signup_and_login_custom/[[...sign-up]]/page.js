"use client";

import { useSignIn, useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup_And_Login() {
  const { signUp } = useSignUp();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [verify, setVerify] = useState(false);
  const [code, setCode] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const router = useRouter();

  const [formType, setFormType] = useState("signup");
  const [signUpFields, setSignUpFields] = useState({
    username: "",
    emailAddress: "",
    password: "",
  });

  const [loginFields, setLoginFields] = useState({
    identifier: "",
    password: "",
  });

  function handleSignUpFieldChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setSignUpFields({
      ...signUpFields,
      [name]: value,
    });
  }

  function handleLoginFieldChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setLoginFields({
      ...loginFields,
      [name]: value,
    });
  }

  function changeFormType() {
    if (formType === "login") {
      setFormType("signup");
    } else {
      setFormType("login");
    }
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();

    try {
      const signInAttempt = await signIn.create({
        ...loginFields,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/dashboard");
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        if (
          error.errors[0].meta.paramName === "password" &&
          error.errors[0].code === "form_password_incorrect"
        ) {
          setErrorMsg([
            {
              ...error.errors[0],
              longMessage: "Password Is Incorrect",
            },
          ]);
        } else {
          setErrorMsg(error.errors);
        }
      }

      // console.error(JSON.stringify(error, null, 2));
    }
  }

  async function handleSignUpSubmit(e) {
    e.preventDefault();

    try {
      await signUp.create({
        ...signUpFields,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerify(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleVerificationSubmit(e) {
    e.preventDefault();

    try {
      const signupAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signupAttempt.status === "complete") {
        // await setActive({ session: signupAttempt.createdSessionId });
        // router.push("/dashboard");
        setFormType("login");
      } else {
        console.error(signupAttempt);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!isLoaded) return;

  return (
    <div className="container h-100">
      <div className="row h-100">
        <div
          className={`col-8 card p-4 m-auto h-auto shadow ${formType}-active`}
        >
          <div className="row my-auto login-form">
            <form onSubmit={handleLoginSubmit} className="col-6">
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  name="identifier"
                  value={loginFields.identifier}
                  onChange={handleLoginFieldChange}
                />
                <label>Email</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  name="password"
                  value={loginFields.password}
                  onChange={handleLoginFieldChange}
                />
                <label>Password</label>
              </div>
              <button className="btn btn-light w-100 mt-3">Login</button>
              {errorMsg && (
                <div className="p-4 bg-red-500 w-100 mt-3">
                  <p className="text-red-200 mb-2 text-2xl">Error:</p>
                  {errorMsg.map((error, index) => (
                    <p key={index} className="text-white">
                      {error.longMessage}
                    </p>
                  ))}
                </div>
              )}
            </form>

            <div className="col-1"></div>
            <div className="col-5 d-flex flex-column">
              <div className="m-auto">
                <h1 className="h1 text-center text-dark fw-bold">LOGIN</h1>
                <p className="text-dark text-center">
                  Do Not Have An Account{" "}
                  <button className="btn btn-light" onClick={changeFormType}>
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className="row my-auto signup-form">
            <div className="col-5 d-flex flex-column">
              <div className="m-auto">
                <h1 className="h1 text-center text-dark m-auto fw-bold">
                  SIGNUP
                </h1>
                <p className="text-dark text-center">
                  Already Have An Account{" "}
                  <button className="btn btn-light" onClick={changeFormType}>
                    Login
                  </button>
                </p>
              </div>
            </div>
            <div className="col-1"></div>
            {verify ? (
              <form onSubmit={handleVerificationSubmit} className="col-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Verification Code"
                    name="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <label>Code</label>
                </div>

                <button className="btn btn-light w-100 mt-3">Verify</button>
              </form>
            ) : (
              <form onSubmit={handleSignUpSubmit} className="col-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="username"
                    name="username"
                    value={signUpFields.username}
                    onChange={handleSignUpFieldChange}
                  />
                  <label>Username</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@example.com"
                    name="emailAddress"
                    value={signUpFields.emailAddress}
                    onChange={handleSignUpFieldChange}
                  />
                  <label>Email</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                    name="password"
                    value={signUpFields.password}
                    onChange={handleSignUpFieldChange}
                  />
                  <label>Password</label>
                </div>

                <div id="clerk-captcha"></div>

                <button className="btn btn-light w-100 mt-3">Sign Up</button>
              </form>
            )}
          </div>

          <div className="black-panel"></div>
        </div>
      </div>
    </div>
  );
}
