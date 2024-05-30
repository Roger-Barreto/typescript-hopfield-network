import React, { ButtonHTMLAttributes } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement>

const DarkOutlineButton = ({ className = "", children, ...other }: Props) => {
  return (
    <button
      className="inline-flex items-center justify-center rounded-md border border-white bg-transparent px-7 py-3 text-center text-base font-medium text-white hover:border-white hover:bg-gray-700"
      {...other}
    >
      {children}
    </button>
  )
}

export default DarkOutlineButton
