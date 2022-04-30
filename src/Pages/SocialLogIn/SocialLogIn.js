import React from "react";
import google from "../../images/google.png";
import facebook from "../../images/facebook.png";
import github from "../../images/github.png";
import {
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useLocation, useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";

const SocialLogIn = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signInWithGithub, githubUser, githubLoading, githubError] =
    useSignInWithGithub(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [token] = useToken(user || githubUser)

  if (token) {
    navigate(from, { replace: true });
  }
  let errorElement;
  if (error || githubError) {
    errorElement = (
      <div>
        <p className="text-danger">
          Error: {error?.message} {githubError?.message}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="my-3 d-flex align-items-center">
        <div style={{ height: 1 }} className="bg-primary w-50"></div>
        <p className="mt-2 px-2">or</p>
        <div style={{ height: 1 }} className="bg-primary w-50"></div>
      </div>
      {errorElement}
      <div>
        <button
          onClick={() => signInWithGoogle()}
          className="btn btn-info d-flex align-items-center py-0 w-50 mx-auto"
        >
          <img width={30} src={google} alt="" />
          <p className="mt-2 px-2 fs-5">Google Sign In</p>
        </button>
        <button className="btn btn-info d-flex align-items-center py-0 w-50 mx-auto my-3">
          <img width={30} src={facebook} alt="" />
          <p className="mt-2 px-2 fs-5">Facebook Sign In</p>
        </button>
        <button
          onClick={() => signInWithGithub()}
          className="btn btn-info d-flex align-items-center py-0 w-50 mx-auto"
        >
          <img width={30} src={github} alt="" />
          <p className="mt-2 px-2 fs-5">Github Sign In</p>
        </button>
      </div>
    </div>
  );
};

export default SocialLogIn;
