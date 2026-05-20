import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary'
  fullWidth?: boolean
  onClick?: () => void
  disabled?: boolean
}

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  onClick,
  disabled = false,
}: ButtonProps) => {
  const classes = [
    `btn-${variant}`,
    fullWidth ? 'btn-full' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
