"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import * as SignIn from "@clerk/elements/sign-in";
import { ClerkLoaded } from "@clerk/nextjs";
import { useState } from "react";
import Link from "next/link";

export default function Signup_And_Login() {
  const [formType, setFormType] = useState("signup");

  function changeFormType() {
    if (formType === "login") {
      setFormType("signup");
    } else {
      setFormType("login");
    }
  }

  return (
    <div className="container h-100">
      <div className="row h-100">
        <ClerkLoaded>
          <div
            className={`col-8 card p-4 m-auto h-auto shadow ${formType}-active`}
          >
            <div className="row my-auto login-form">
              <div className="col-6">
                <SignIn.Root>
                  <SignIn.Step name="start">
                    <Clerk.Field
                      className="form-floating mb-3"
                      name="identifier"
                    >
                      <Clerk.Input className="form-control" />
                      <Clerk.Label placeholder="email">E-mail</Clerk.Label>
                      <Clerk.FieldError className="text-danger" />
                    </Clerk.Field>

                    <Clerk.Field className="form-floating mb-3" name="password">
                      <Clerk.Input
                        className="form-control"
                        placeholder="password"
                      />
                      <Clerk.Label>Password</Clerk.Label>
                      <Clerk.FieldError className="text-danger" />
                    </Clerk.Field>
                    <div className="flex flex-row justify-end">
                      <Link
                        href="/password_reset"
                        className="btn btn-link text-decoration-none"
                      >
                        Forgot Password
                      </Link>
                    </div>
                    <SignIn.Action submit className="btn btn-light w-100">
                      Login
                    </SignIn.Action>
                  </SignIn.Step>
                </SignIn.Root>
              </div>
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
              <div className="col-6">
                <SignUp.Root>
                  <SignUp.Step name="start">
                    <Clerk.Field className="form-floating mb-3" name="username">
                      <Clerk.Input
                        className="form-control"
                        placeholder="username"
                      />
                      <Clerk.Label>Username</Clerk.Label>
                      <Clerk.FieldError className="text-danger" />
                    </Clerk.Field>

                    <Clerk.Field
                      className="form-floating mb-3"
                      name="emailAddress"
                    >
                      <Clerk.Input
                        className="form-control"
                        placeholder="email"
                      />
                      <Clerk.Label>E-mail</Clerk.Label>
                      <Clerk.FieldError className="text-danger" />
                    </Clerk.Field>

                    <Clerk.Field className="form-floating mb-3" name="password">
                      <Clerk.Input
                        className="form-control"
                        placeholder="password"
                      />
                      <Clerk.Label>Password</Clerk.Label>
                      <Clerk.FieldError className="text-danger" />
                    </Clerk.Field>

                    <SignUp.Action submit className="btn btn-light w-100">
                      Sign Up
                    </SignUp.Action>
                  </SignUp.Step>

                  <SignUp.Step name="verifications">
                    <Clerk.Field className="form-floating mb-3" name="code">
                      <Clerk.Input
                        className="form-control"
                        placeholder="code"
                      />
                      <Clerk.Label>Code</Clerk.Label>
                      <Clerk.FieldError className="text-danger" />
                    </Clerk.Field>

                    <SignUp.Action submit className="btn btn-light w-100">
                      Verify
                    </SignUp.Action>
                  </SignUp.Step>
                </SignUp.Root>
              </div>
            </div>

            <div className="black-panel"></div>
          </div>
        </ClerkLoaded>
      </div>
    </div>
  );
}
