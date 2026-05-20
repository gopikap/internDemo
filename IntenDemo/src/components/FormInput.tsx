import { useState } from "react";

interface FormInputProps {
  id: string;
  label: string;
  name: string;
  type?: "text" | "email" | "password" | "number";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

const FormInput = ({
  id,
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div className={type === "password" ? "input-wrapper" : undefined}>
        <input
          id={id}
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={error ? "input-error" : ""}
        />
        {type === "password" && (
          <button
            type="button"
            className="toggle-pw"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {error && <span className="error-msg">{error}</span>}
    </div>
  );
};

export default FormInput;
