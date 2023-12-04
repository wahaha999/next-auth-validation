import React from 'react'
import './input.css'

interface InputProps {
  id?: string
  type: 'text' | 'number' | 'email' | 'password'
  label?: string
  value?: string | number
  name?: string
  placeholder?: string
  error?: string | undefined;
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
      {props.error && <p className='text-sm text-red-500'>{props.error}</p>}
    </div>
  );
});