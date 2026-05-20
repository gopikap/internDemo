// Concepts demonstrated: Props, State, Forms, Event Handling, Validation
// Covers: text inputs, select dropdown, checkbox, multi-field validation

import { useState } from "react";
import FormInput from "./FormInput";
import Button from "./Button";

interface SignupFormProps {
  onSignupSuccess: () => void;
}

interface SignupData {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
  agreeToTerms: boolean;
}

// Partial makes every key optional — perfect for an errors object
type SignupErrors = Partial<Record<keyof SignupData, string>>;

const SignupForm = ({ onSignupSuccess }: SignupFormProps) => {
  const [formData, setFormData] = useState<SignupData>({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<SignupErrors>({});
  const [submitted, setSubmitted] = useState(false);

  // Single handler works for both <input> and <select>
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (): boolean => {
    const next: SignupErrors = {};

    if (!formData.name.trim()) {
      next.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = "Enter a valid email address";
    }

    if (!formData.username.trim()) {
      next.username = "Username is required";
    } else if (formData.username.length < 3) {
      next.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      next.username = "Only letters, numbers, and underscores allowed";
    }

    if (!formData.password) {
      next.password = "Password is required";
    } else if (formData.password.length < 8) {
      next.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(formData.password)) {
      next.password =
        "Must include at least one uppercase letter and one number";
    }

    if (!formData.confirmPassword) {
      next.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      next.confirmPassword = "Passwords do not match";
    }

    if (!formData.role) {
      next.role = "Please select a role";
    }

    if (!formData.agreeToTerms) {
      next.agreeToTerms = "You must accept the terms to continue";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setTimeout(onSignupSuccess, 1500);
  };

  // Success screen after form submission
  if (submitted) {
    return (
      <section className="form-page">
        <div className="form-card success-card">
          <div className="success-icon">&#10003;</div>
          <h2>Account Created!</h2>
          <p>Welcome, {formData.name}! Redirecting to login...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="form-page">
      <div className="form-card" style={{ maxWidth: "680px" }}>
        <h2 className="form-title">Create Account</h2>
        <p className="form-subtitle">Join us today — it's free</p>

        <form onSubmit={handleSubmit} noValidate>
          {/* form-row puts two fields side by side */}
          <div className="form-row">
            <FormInput
              id="su-name"
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              error={errors.name}
            />

            <FormInput
              id="su-email"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              error={errors.email}
            />
          </div>

          <div className="form-row">
            <FormInput
              id="su-username"
              label="Username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="jane_doe"
              error={errors.username}
            />

            {/* Select element — works with the same handleChange */}
            <div className="form-group">
              <label htmlFor="su-role">Role</label>
              <select
                id="su-role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={errors.role ? "input-error" : ""}
              >
                <option value="">Select a role</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Manager</option>
                <option value="intern">Intern</option>
              </select>
              {errors.role && <span className="error-msg">{errors.role}</span>}
            </div>
          </div>

          <div className="form-row">
            <FormInput
              id="su-password"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min 8 chars, 1 uppercase, 1 number"
              error={errors.password}
            />

            <FormInput
              id="su-confirm"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat password"
              error={errors.confirmPassword}
            />
          </div>

          {/* Checkbox input */}
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              I agree to the{" "}
              <a href="#" onClick={(e) => e.preventDefault()}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" onClick={(e) => e.preventDefault()}>
                Privacy Policy
              </a>
            </label>
            {errors.agreeToTerms && (
              <span className="error-msg">{errors.agreeToTerms}</span>
            )}
          </div>

          <Button type="submit" fullWidth>
            Create Account
          </Button>
        </form>
      </div>
    </section>
  );
};

export default SignupForm;
