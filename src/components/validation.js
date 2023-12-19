export const validateEmail = (value) => {
  if (!value) return "*required";
  else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
    return "Invalid email";
  else return null;
};

export const validatePassword = (value) => {
  if (!value) return "*required";
  else if (value.length < 8) return "min. 8 characters";
  else return null;
};

export const required = (value) => {
  if (!value) return "*required";
  else return null;
};

export const validate = {
  email: validateEmail,
  password: validatePassword,
  firstname: required,
  lastname: required,
  address: required,
  city: required,
  country: required,
  zipcode: required,
  desc: required,
  username: required,
};
