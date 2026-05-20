// Concepts demonstrated: Props, State, Forms, Event Handling, Validation
// Demo credentials: username = "demo" | password = "demo"

import { useState } from "react";
import FormInput from "./FormInput";
import Button from "./Button";

interface LoginFormProps {
  onLoginSuccess: () => void; // callback prop from parent
  currentView?: string; // optional prop to demonstrate useEffect dependency
}

interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username: string;
  password: string;
}

const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  // State: controlled input values
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  // State: per-field validation errors
  const [errors, setErrors] = useState<FormErrors>({
    username: "",
    password: "",
  });
  // State: feedback message after submit
  const [statusMsg, setStatusMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  // Event Handling: update state as user types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Input change event:", {
      name: e.target.name,
      value: e.target.value,
    });
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the field's error when user starts correcting it
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setStatusMsg("");
  };

  const validate = (): boolean => {
    const next: FormErrors = { username: "", password: "" };
    if (!formData.username.trim()) next.username = "Username is required";
    if (!formData.password) next.password = "Password is required";
    setErrors(next);
    return !next.username && !next.password;
  };

  // Event Handling: form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent full-page reload
    if (!validate()) return;

    if (formData.username === "demo" && formData.password === "demo") {
      setIsSuccess(true);
      setStatusMsg("Login successful! Redirecting...");
      setTimeout(onLoginSuccess, 1000);
    } else {
      setIsSuccess(false);
      setStatusMsg("Invalid credentials. Hint: use  demo / demo");
    }
  };

  return (
    <section className="form-page">
      <div className="form-card">
        <h2 className="form-title">Welcome Back</h2>
        <p className="form-subtitle">Sign in to your account</p>

        <div className="demo-hint">
          <strong>Demo credentials — </strong>
          username: <code>demo</code> &nbsp;/&nbsp; password: <code>demo</code>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <FormInput
            id="username"
            label="Username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            error={errors.username}
          />

          <FormInput
            id="password"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            error={errors.password}
          />

          {statusMsg && (
            <div className={`status-msg ${isSuccess ? "success" : "error"}`}>
              {statusMsg}
            </div>
          )}

          <Button type="submit" fullWidth>
            Login
          </Button>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
