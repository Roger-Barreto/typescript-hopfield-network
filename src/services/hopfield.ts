// Define o tipo para as células da rede (os "pixels" da imagem)
export type NetworkCell = 1 | -1

// Função para inicializar a matriz de pesos com zeros
export function initializeWeights(size: number): NetworkCell[][] {
  // Cria uma matriz de pesos de tamanho `size` x `size` preenchida com zeros
  const weights: NetworkCell[][] = Array.from({ length: size }, () =>
    Array(size).fill(0),
  )
  return weights
}

// Função para calcular a matriz de pesos usando a regra do produto externo
export function calculateWeights(patterns: NetworkCell[][]): NetworkCell[][] {
  const size = patterns[0].length
  const weights = initializeWeights(size)

  // Para cada padrão fornecido
  for (const pattern of patterns) {
    // Atualiza a matriz de pesos com base na regra do produto externo
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
  // Aplica a função de ativação tangente hiperbólica
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
  // Calcula a soma ponderada das entradas para o neurônio na posição `index`
  for (let j = 0; j < size; j++) {
    if (j !== index) {
      sum += weights[index][j] * pattern[j]
    }
  }
  // Retorna o novo estado do neurônio após aplicar a função de ativação
  return activation(sum)
}

// Função para atualizar o padrão completo
export function updatePattern(
  weights: NetworkCell[][],
  pattern: NetworkCell[],
): NetworkCell[] {
  const newPattern = [...pattern]
  // Atualiza cada neurônio no padrão
  for (let i = 0; i < pattern.length; i++) {
    newPattern[i] = updateNeuron(weights, pattern, i)
  }
  return newPattern
}

// Função para recuperar um padrão corrompido
export function recoverPattern(
  weights: NetworkCell[][],
  corruptedPattern: NetworkCell[],
  iterations: number = 10,
): NetworkCell[] {
  let currentPattern = corruptedPattern
  // Iterativamente atualiza o padrão corrompido
  for (let i = 0; i < iterations; i++) {
    currentPattern = updatePattern(weights, currentPattern)
  }
  // Retorna o padrão recuperado após o número especificado de iterações
  return currentPattern
}
