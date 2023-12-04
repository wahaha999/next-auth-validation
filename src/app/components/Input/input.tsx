import React from 'react'
import './input.css'

interface InputProps {
  id?: string
  type: 'text' | 'number' | 'email' | 'password'
  label?: string
  value?: string | number
  name?: string
  placeholder?: string
  error?: boolean
  disabled?: boolean
  required?: boolean
  autoFocus?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div className="input-container">
      <input ref={ref} {...props} />
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
    </div>
  );
});