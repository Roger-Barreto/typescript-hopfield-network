// CheckboxGrid.tsx
import React, { useState, FC, useMemo, useEffect } from "react"
import CheckboxGridButton from "../CheckboxGridButton"
import { NetworkCell } from "src/services/hopfield"

interface Props {
  grid?: NetworkCell[]
  readOnly?: boolean
  onChange?: (grid: NetworkCell[]) => void
}

const CheckboxGrid = ({
  onChange,
  grid = Array.from({ length: 45 }, () => -1),
  readOnly = false,
}: Props) => {
  const changeValue = (index: number) => {
    const newGrid = [...grid]
    newGrid[index] = newGrid[index] === 1 ? -1 : 1

    if (onChange) onChange(newGrid)
  }
  return (
    <div className="flex flex-wrap gap-1" style={{ width: "260px" }}>
      {grid?.map((cell, index) => (
        <CheckboxGridButton
          key={index}
          readOnly={readOnly}
          isActive={cell === 1}
          changeValue={() => {
            if (readOnly) return
            changeValue(index)
          }}
        />
      ))}
    </div>
  )
}

export default CheckboxGrid
