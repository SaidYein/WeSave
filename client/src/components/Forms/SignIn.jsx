import React, { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import SignUp from "./SignUp";
import UserContext from "../../context/UserContext";
import ForgetPassword from "./ForgetPassword";
import { AiFillEye, AiOutlineArrowLeft } from "react-icons/ai";
import Spinner from "../layout/Spinner";
function SignIn({ openSignIn, setOpenSignIn }) {
  const { user, login, error, isLoading, setError } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const errRef = useRef();
  const [isDisabled, setDisabled] = useState(true);

  useEffect(() => {
    if (user) {
      setOpenSignIn(false);
    }
  }, [user]);

  //- Determine button state
  useEffect(() => {
    !email || !password || error ? setDisabled(true) : setDisabled(false);
  }, [email, password, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    login(userData);
    setEmail("");
    setPassword("");
  };

  const closeWindow = () => {
    setOpenSignIn(false);
    setError("");
  };

  const handleSignUpPage = () => {
    setSignUpOpen(true);
    setOpenSignIn(false);
  };

  useEffect(() => {}, [email, password]);

  if (signUpOpen) {
    return (
      <SignUp
        signUpOpen={signUpOpen}
        setSignUpOpen={setSignUpOpen}
        setSignInOpen={setOpenSignIn}
      />
    );
  }

  if (isLoading) {
    return (
      <section className="flex flex-col fixed top-0 bg-lightBg/60 left-0 right-0 w-full  h-full  z-[1000]">
        <div className="container flex flex-col items-center justify-center flex-1 px-2 mx-auto mb-6">
          <Spinner />
        </div>
      </section>
    );
  }

  return (
    <>
      {openSignIn && (
        <section className="flex flex-col fixed top-0 bg-lightBg/60 left-0 right-0 w-full  h-full  z-[1000]">
          <div className="container flex flex-col items-center justify-center flex-1 px-2 mx-auto mb-6">
            <div className="bg-lightFont px-6 py-8 rounded shadow-md text-black max-w-[600px] w-[90%]  relative">
              <button
                className="absolute mt-4 w-2 px-3 py-1 text-black-400  left-[10px] top-[5px]"
                onClick={() => setOpenSignIn(false)}
              >
                <AiOutlineArrowLeft onClick={closeWindow} />
              </button>
              <h1 className="mb-8 text-3xl text-center text-accent">Sign In</h1>

              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="relative mb-12">
                  <input
                    type="email"
                    id="email"
                    autoComplete="off"
                    required
                    className="form-input peer"
                    placeholder="Email"
                    onFocus={() => setError("")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                </div>
                <div className="relative mb-12">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="off"
                    required
                    className="form-input peer"
                    placeholder="password"
                    onFocus={() => setError("")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="absolute cursor-pointer top-2 right-1">
                    <AiFillEye
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  </div>
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                </div>

                <div className="flex flex-col lg:flex-row lg:justify-between ">
                  <div className="pl-3 mt-6 text-darkFont text-bodySmall">
                    Create new Account?
                    <span
                      className="px-2 cursor-pointer text-accent"
                      onClick={handleSignUpPage}
                    >
                      Sign Up
                    </span>
                  </div>
                  <div
                    className="pr-3 mt-6 text-bodySmall"
                    onClick={() => {
                      setOpenSignIn(false);
                      setForgetPassword(true);
                    }}
                  >
                    <span className="px-2 cursor-pointer text-accent">
                      Forget Password?
                    </span>
                  </div>
                </div>

                <button
                  //- Disable SignUp button till all validation passed
                  type="submit"
                  disabled={isDisabled}
                  aria-live="assertive"
                  ref={errRef}
                  className={`${
                    isDisabled && !error
                      ? "is-disabled"
                      : error
                      ? "is-error"
                      : "is-valid"
                  } submit-btn`}
                >
                  {isDisabled && !error
                    ? "Please fill required fields correctly"
                    : error
                    ? error
                    : "Sign In"}
                </button>
              </form>
            </div>
          </div>
        </section>
      )}
      {forgetPassword && (
        <ForgetPassword setForgetPassword={setForgetPassword} />
      )}
    </>
  );
}
SignIn.propTypes = {
  setOpenSignIn: PropTypes.func,
  openSignIn: PropTypes.bool,
};

export default SignIn;
