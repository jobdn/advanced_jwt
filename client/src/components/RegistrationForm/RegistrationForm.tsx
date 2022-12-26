import React from "react";
import { useNavigate } from "react-router-dom";

import { Form } from "components/Form";

import { useAppDispatch, useAppSelector } from "hooks";
import { registerThunk } from "store/thunks/register.thunk";

import { Input } from "components/Input";

enum AvailableRegistrationFormFieldsId {
  NAME = "name",
  EMAIL = "email",
  PASSWORD = "password",
}

export const RegistrationForm = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.user);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> =
    React.useCallback((e) => {
      e.preventDefault();
      dispatch(registerThunk({ email, password, name }))
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch(console.error);
    }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback((e) => {
      if (e.target.id === AvailableRegistrationFormFieldsId.EMAIL) {
        setEmail(e.target.value);
      } else if (e.target.id === AvailableRegistrationFormFieldsId.NAME) {
        setName(e.target.value);
      } else {
        setPassword(e.target.value);
      }
    }, []);

  return (
    <Form onSubmit={handleSubmit} buttonLabel="Sign up" loading={loading}>
      <Input
        type="text"
        id="name"
        value={name}
        onChange={handleChange}
        placeholder="Enter Your Name"
        className="input"
        required
      />
      <Input
        type="email"
        id="email"
        value={email}
        onChange={handleChange}
        placeholder="Enter Your E-mail"
        className="input"
        required
      />
      <Input
        type="password"
        id="password"
        value={password}
        onChange={handleChange}
        placeholder="Enter Your Password"
        className="input"
        required
      />
    </Form>
  );
};
