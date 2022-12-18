import React from "react";
import { useNavigate } from "react-router-dom";

import { Form } from "components/Form";

import { useAppDispatch, useAppSelector } from "hooks";
import { registerThunk } from "store/thunks/register.thunk";

import { Input } from "components/Input";

export const RegistrationForm = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.user);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(registerThunk({ email, password, name }))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch(console.error);
  };

  return (
    <Form onSubmit={handleSubmit} buttonLabel="Sign up" loading={loading}>
      <Input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Your Name"
        className="input"
        required
      />
      <Input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Your E-mail"
        className="input"
        required
      />
      <Input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Your Password"
        className="input"
        required
      />
    </Form>
  );
};
