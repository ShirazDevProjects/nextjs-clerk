"use client";

import { useAuth, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup_And_Login() {
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulVerification, setSuccessfulVerification] = useState(false);

  const router = useRouter();

  async function verifyEmail(e) {
    e.preventDefault();

    try {
      await signIn
        .create({
          strategy: "reset_password_email_code",
          identifier: email,
        })
        .then(() => {
          setSuccessfulVerification(true);
        });
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  }

  async function handleReset(e) {
    e.preventDefault();

    try {
      await signIn
        .attemptFirstFactor({
          strategy: "reset_password_email_code",
          code,
          password,
        })
        .then((result) => {
          if (result.status === "complete") {
            setActive({ session: result.createdSessionId });
            router.push("./dashboard");
          }
        });
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  }

  if (isSignedIn) {
    router.push("./dashboard");
  }

  if (!isLoaded) return;

  return (
    <div className="container h-100">
      <div className="row h-100">
        <div className="col-8 card p-4 m-auto h-auto shadow login-active">
          <div className="row my-auto login-form">
            <form
              onSubmit={successfulVerification ? handleReset : verifyEmail}
              className="col-6"
            >
              {!successfulVerification && (
                <>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="name@example.com"
                      name="identifier"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Email</label>
                  </div>
                  <button className="btn btn-light w-100 mt-3">Verify</button>
                </>
              )}

              {successfulVerification && (
                <>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Password</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="code"
                      name="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                    <label>Code</label>
                  </div>
                  <button className="btn btn-light w-100 mt-3">Reset</button>
                </>
              )}
            </form>

            <div className="col-1"></div>
            <div className="col-5 d-flex flex-column">
              <div className="m-auto">
                <h1 className="h1 text-center text-dark fw-bold">
                  Reset <br /> Password
                </h1>
              </div>
            </div>
          </div>

          <div className="black-panel"></div>
        </div>
      </div>
    </div>
  );
}
