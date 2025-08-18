import React, { useState, ChangeEvent, FormEvent } from "react";

type FormData = {
  username: string;
  password: string;
};

type LoginProps = {
  onSubmit: (data: FormData) => void; 
};

const LoginForm = ({ onSubmit }: LoginProps) => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} data-testid="login-form">
      <div>
        <label htmlFor="username">Username:</label><br />
        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter username"
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label><br />
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
