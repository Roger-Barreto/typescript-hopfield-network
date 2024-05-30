import React, { ButtonHTMLAttributes } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ className = "", children, ...other }: Props) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md border border-dark bg-dark px-7 py-3 text-center text-base font-medium text-white hover:border-body-color hover:bg-body-color disabled:border-gray-3 disabled:bg-gray-3 disabled:text-dark-5 dark:border-dark-2 dark:bg-dark-2 ${className}`}
      {...other}
    >
      {children}
    </button>
  )
}

export default Button
