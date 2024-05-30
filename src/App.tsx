import { useState } from "react"
import "./App.css"
import CheckboxGrid from "./components/CheckboxGrid"
import Button from "./components/Button"
import {
  calculateWeights,
  NetworkCell,
  recoverPattern,
} from "./services/hopfield"
import DarkOutlineButton from "./components/DarkOutlineButton"

function App() {
  const patterns = [
    [
      -1, -1, 1, 1, -1, -1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, 1, -1, -1,
      -1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, 1, -1, -1,
      -1, 1, 1, -1,
    ],
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ],
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, 1, 1, 1, 1,
      1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ],
    [
      1, 1, -1, 1, 1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, -1, -1, -1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, 1,
    ],
  ] as NetworkCell[][]

  const trainedMatrix = calculateWeights(patterns)

  const [corruptedPattern, setCorruptedPattern] = useState<NetworkCell[]>(
    Array.from({ length: 45 }, () => -1) as NetworkCell[],
  )

  const [recoveredPattern, setRecoveredPattern] = useState<NetworkCell[]>(
    Array.from({ length: 45 }, () => -1) as NetworkCell[],
  )

  const handleClickRecoverPattern = () => {
    const recovered = recoverPattern(trainedMatrix, corruptedPattern)
    setRecoveredPattern(recovered)
  }

  const add20PercentNoise = () => {
    setCorruptedPattern((prev) => {
      return prev.map((v, i) => {
        if (Math.random() < 0.2) {
          return v * -1
        }
        return v
      }) as NetworkCell[]
    })
  }

  return (
    <div className="w-full text-center ">
      <h1>Hopfield Network</h1>
      <h3 className="text-gray-400">Por Roger Santos Barreto</h3>
      <div className="mt-8">
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <CheckboxGrid
            grid={corruptedPattern}
            onChange={(v) => setCorruptedPattern(v)}
          />

          <svg
            width="42"
            viewBox="0 0 560 354"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-90 md:rotate-0"
          >
            <path
              d="M0 77C0 70.3726 5.37258 65 12 65H321C327.627 65 333 59.6274 333 53L333 12.5131C333 2.41544 344.711 -3.16741 352.556 3.19072L555.498 167.678C561.424 172.48 561.423 181.52 555.498 186.322L352.556 350.809C344.711 357.167 333 351.584 333 341.487V299C333 292.373 327.627 287 321 287H12C5.37258 287 0 281.627 0 275V77Z"
              fill="#ffffff"
            />
          </svg>

          <CheckboxGrid grid={recoveredPattern} readOnly />
        </div>
        <div className="mt-8 flex w-full items-center justify-center gap-3">
          <button
            onClick={() =>
              setCorruptedPattern(
                Array.from({ length: 45 }, () => -1) as NetworkCell[],
              )
            }
            className="bg-red-500"
          >
            Limpar
          </button>
          <DarkOutlineButton onClick={add20PercentNoise}>
            Adicionar 20% de ruído
          </DarkOutlineButton>
          <Button onClick={handleClickRecoverPattern}>Recuperar</Button>
        </div>
      </div>
    </div>
  )
}

export default App
