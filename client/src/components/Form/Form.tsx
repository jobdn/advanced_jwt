import React from "react";

import "./Form.css";

interface FormProps extends React.PropsWithChildren {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  loading: boolean;
  buttonLabel: string;
}

export const Form: React.FC<FormProps> = ({
  onSubmit,
  loading,
  buttonLabel,
  children,
}) => {
  return (
    <form onSubmit={onSubmit}>
      {children}

      <button disabled={loading}>{loading ? "Wait..." : buttonLabel}</button>
    </form>
  );
};
