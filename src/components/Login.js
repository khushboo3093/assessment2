import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { UserContext } from "../context";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { validate } from "./validation";
import { googleClientId, loginFormFixer } from "../utils/fixer";
import { jwtDecode } from "jwt-decode";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
// import { fbIcon } from "../assets/images";

const Login = () => {
  const { setUser } = useContext(UserContext);

  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async () => {
    if (!loading && (await validateInput())) {
      setLoading(true);
      setUser({ email: inputs.email });
      navigate("/profile");
      setLoading(false);
    } else setLoading(false);
  };

  const validateInput = async (target) => {
    let errs = { ...errors };

    if (target) errs[target.name] = validate[target.name](target.value);
    else {
      for (let key in inputs) errs[key] = validate[key](inputs[key]);
    }

    setErrors(errs);

    for (let key in errs) {
      if (errs[key]) return false;
    }

    return true;
  };

  const onInputChange = ({ target }) => {
    setInputs((prev) => ({ ...prev, [target.name]: target.value }));

    validateInput(target);
  };

  const SocialLogin = () => (
    <GoogleOAuthProvider clientId={googleClientId}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const decoded = jwtDecode(credentialResponse.credential);
          setUser({
            ...decoded,
            firstname: decoded.given_name,
            lastname: decoded.family_name,
          });
          navigate("/profile");
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );

  return (
    <div className="main-wrapper">
      <div className="login-component">
        <div className="head">Login</div>

        <div className="social-login">
          <div className="heading">
            <span>Login with</span>
            <span>x</span>
          </div>
          <div className="platforms">
            {/* <span className="social-button">
              <img src={githubIcon} alt="" />
            </span> */}

            <span className="social-button">
              <SocialLogin />
            </span>

            {/* <FacebookLogin
              appId="1405014783700081"
              autoLoad={true}
              // fields="name,email,picture"
              // onClick={componentClicked}
              render={(renderProps) => (
                <span onClick={renderProps.onClick} className="social-button">
                  <img src={fbIcon} alt="fb-login" />
                </span>
              )}
              callback={(r) => console.log(r)}
            /> */}
            <span className="or">or</span>
          </div>
        </div>

        <div className="login">
          <div className="form-group">
            {loginFormFixer.map((input, key) => (
              <div className="mb-3" key={key}>
                <input
                  {...input}
                  className={`form-control${
                    errors[input.name] ? " invalid" : ""
                  }`}
                  onChange={onInputChange}
                  value={inputs[input.name]}
                />
                {!!errors[input.name] && (
                  <span className="input-error">{errors[input.name]}</span>
                )}
              </div>
            ))}
          </div>
          <div className="mb-2">
            <Button
              variant="primary"
              size="lg"
              type="button"
              onClick={onSubmit}
              style={{ width: "100%" }}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
