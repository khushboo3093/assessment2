import React, { useContext, useState } from "react";
import { profileFormFixer, tableJson } from "../utils/fixer";
import { validate } from "./validation";
import { UserContext } from "../context";
import logoutIcon from "../assets/images/logout.png";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);

  const [inputs, setInputs] = useState({
    email: user.email,
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    country: "",
    zipcode: "",
    desc: "",
    username: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const logout = () => {
    setUser({});
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!loading && (await validateInput())) {
      setLoading(true);
      setUser(inputs);
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
    if (target.name !== "email") {
      setInputs((prev) => ({ ...prev, [target.name]: target.value }));
      validateInput(target);
    }
  };

  return (
    <div className="main-wrapper">
      <div className="logout" onClick={logout}>
        <img src={logoutIcon} alt="logout" />
      </div>
      <div className="profile">
        <div className="head">Profile</div>
        <div className="heading">Edit Profile</div>
        <form className="row g-3" onSubmit={onSubmit}>
          {profileFormFixer.map((input, key) => (
            <div
              className={`col-sm-${
                key === 0 || key === 3 || key === 4
                  ? 6
                  : key === 1 || key === 2
                  ? 3
                  : key === 6 || key === 7 || key === 8
                  ? 4
                  : 12
              }`}
              key={key}
            >
              <label
                htmlFor={input.id}
                className="form-label"
                style={errors[input.name] ? { color: "red" } : {}}
              >
                {errors[input.name] ? "*" : ""}
                {input.label || input.placeholder}{" "}
                {input.disabled ? "(disabled)" : ""}
              </label>
              {input.type === "textarea" ? (
                <textarea
                  {...input}
                  className={`form-control${input.disabled ? " disabled" : ""}`}
                  onChange={onInputChange}
                  value={inputs[input.name]}
                />
              ) : (
                <input
                  {...input}
                  className={`form-control${input.disabled ? " disabled" : ""}`}
                  onChange={onInputChange}
                  value={
                    input.name in inputs
                      ? inputs[input.name]
                      : "Creative Code Inc."
                  }
                />
              )}
            </div>
          ))}

          <div
            className="col-12 mb-3"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <button type="submit" className="btn btn-primary">
              Update Profile
            </button>
          </div>
        </form>
        <div className="mb-3" style={{ maxWidth: "100%", overflowX: "scroll" }}>
          <table border="1">
            <tbody>
              {tableJson.map((rowData, rowIndex) => (
                <tr key={rowIndex}>
                  {rowData.map((cellData, cellIndex) => (
                    <td
                      style={{
                        fontSize: 10,
                        border: "1px Solid",
                      }}
                      key={cellIndex}
                      rowSpan={cellData[1]}
                      colSpan={cellData[2]}
                    >
                      {cellData[0]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
