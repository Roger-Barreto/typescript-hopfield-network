import React, { Dispatch, SetStateAction, useState } from "react"
import Button from "../Button"

type Props = {
  isActive: boolean
  changeValue: () => void
  readOnly?: boolean
}
const CheckboxGridButton = ({
  isActive,
  changeValue,
  readOnly = false,
}: Props) => {
  return (
    <button
      onMouseDown={() => {
        changeValue()
      }}
      onMouseEnter={(e) => {
        const isMouseDown = e.buttons === 1
        if (isMouseDown) {
          changeValue()
        }
      }}
      style={{
        minWidth: "48px",
        minHeight: "48px",
      }}
      className={`flex h-12 w-12 items-center justify-center rounded-sm p-0 ${
        isActive ? "bg-gray-700" : "bg-light"
      } ${readOnly ? "cursor-default" : "cursor-pointer"}`}
    />
  )
}

export default CheckboxGridButton
