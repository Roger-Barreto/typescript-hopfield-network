export type NetworkCell = 1 | -1

// Função para inicializar a matriz de pesos com zeros
export function initializeWeights(size: number): number[][] {
  const weights: NetworkCell[][] = Array.from({ length: size }, () =>
    Array(size).fill(0),
  )
  return weights
}

// Função para calcular a matriz de pesos usando a regra do produto externo
export function calculateWeights(patterns: NetworkCell[][]): NetworkCell[][] {
  const size = patterns[0].length
  const weights = initializeWeights(size)

  for (const pattern of patterns) {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (i !== j) {
          weights[i][j] += pattern[i] * pattern[j]
        }
      }
    }
  }
  return weights as NetworkCell[][]
}

// Função de ativação tangente hiperbólica com β = 100
export function activation(x: number, beta: number = 100): NetworkCell {
  return Math.tanh(beta * x) as NetworkCell
}

// Função para atualizar o estado de um neurônio
export function updateNeuron(
  weights: NetworkCell[][],
  pattern: NetworkCell[],
  index: number,
): NetworkCell {
  const size = pattern.length
  let sum = 0
  for (let j = 0; j < size; j++) {
    if (j !== index) {
      sum += weights[index][j] * pattern[j]
    }
  }
  return activation(sum)
}

// Função para atualizar o padrão completo
export function updatePattern(
  weights: NetworkCell[][],
  pattern: NetworkCell[],
): NetworkCell[] {
  const newPattern = [...pattern]
  for (let i = 0; i < pattern.length; i++) {
    newPattern[i] = updateNeuron(weights, pattern, i)
  }
  return newPattern
}

export function recoverPattern(
  weights: NetworkCell[][],
  corruptedPattern: NetworkCell[],
  iterations: number = 10,
): NetworkCell[] {
  let currentPattern = corruptedPattern
  for (let i = 0; i < iterations; i++) {
    currentPattern = updatePattern(weights, currentPattern)
  }
  return currentPattern
}
