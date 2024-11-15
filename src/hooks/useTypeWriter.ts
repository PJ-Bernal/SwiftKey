import { useState, useEffect } from 'react'
import MOCK_PARAGRAPHS from '../constants/paragraphs'

interface CharStatus {
  char: string
  status: 'correct' | 'incorrect' | 'untyped'
}

interface Stats {
  correctLetters: number
  incorrectLetters: number
  wordsPerMinute: number
}

interface GameState {
  isActive: boolean
  hasStarted: boolean
  timeRemaining: number
}

interface LetterStats {
  [key: string]: number
}

export function useTypeWriter() {
  const [paragraph, setParagraph] = useState('')
  const [charStatuses, setCharStatuses] = useState<CharStatus[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [wordPositions, setWordPositions] = useState<number[]>([])
  const [letterAsserts, setLetterAsserts] = useState<LetterStats>({})
  const [letterFails, setLetterFails] = useState<LetterStats>({})
  const [previousInputLength, setPreviousInputLength] = useState(0)
  const [gameTime, setGameTime] = useState<number>(60)

  const [cursor, setCursor] = useState({
    wordPosition: 0,
    letterIndex: 0,
  })

  const [gameState, setGameState] = useState<GameState>({
    isActive: true,
    hasStarted: false,
    timeRemaining: 60,
  })

  const [stats, setStats] = useState<Stats>({
    correctLetters: 0,
    incorrectLetters: 0,
    wordsPerMinute: 0,
  })

  const getRandomParagraph = () => {
    const selectedPara =
      MOCK_PARAGRAPHS[Math.floor(Math.random() * MOCK_PARAGRAPHS.length)]
    return {
      selectedPara,
      initialCharStatuses: selectedPara.split('').map(char => ({
        char,
        status: 'untyped' as const,
      })),
    }
  }

  const resetGame = () => {
    // First, set game to inactive to prevent any ongoing updates

    // Use setTimeout to ensure all states are updated before resetting

    const { selectedPara, initialCharStatuses } = getRandomParagraph()

    setParagraph(selectedPara)
    setCharStatuses(initialCharStatuses)
    setCurrentInput('')
    setCursor({
      wordPosition: 0,
      letterIndex: 0,
    })
    setGameState({
      isActive: true,
      hasStarted: false,
      timeRemaining: 60, // Also, you probably want this to be 60 not 1
    })
    setStats({
      correctLetters: 0,
      incorrectLetters: 0,
      wordsPerMinute: 0,
    })
    setLetterAsserts({})
    setLetterFails({})
    const newTime = 60
    setGameTime(newTime)
  }

  const addTime = (time: number) => {
    const newTime = gameTime + time
    setGameTime(newTime)
    setGameState({
      isActive: true,
      hasStarted: false,
      timeRemaining: newTime,
    })
  }

  const calculateFinalStats = () => {
    const correctCount = charStatuses.filter(s => s.status === 'correct').length
    const incorrectCount = charStatuses.filter(
      s => s.status === 'incorrect'
    ).length
    const timeInMinutes = (60 - gameState.timeRemaining) / 60
    const wordsPerMinute = Math.round(correctCount / 5 / timeInMinutes)

    setStats({
      correctLetters: correctCount,
      incorrectLetters: incorrectCount,
      wordsPerMinute,
    })
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const cursorPosition = e.target.selectionStart ?? 0

    if (!gameState.hasStarted && inputValue) {
      setGameState(prev => ({ ...prev, hasStarted: true }))
    }

    if (!gameState.isActive) return

    setCurrentInput(inputValue)

    let wordIndex = wordPositions.findIndex(
      (pos, i) =>
        pos <= cursorPosition &&
        (i === wordPositions.length - 1 ||
          wordPositions[i + 1] > cursorPosition)
    )
    if (wordIndex === -1) wordIndex = 0

    const letterIndex = cursorPosition - wordPositions[wordIndex]

    setCursor({
      wordPosition: wordIndex,
      letterIndex,
    })

    // Only process the newly added character
    if (inputValue.length > previousInputLength) {
      const newCharIndex = inputValue.length - 1
      const targetChar = paragraph[newCharIndex]
      const inputChar = inputValue[newCharIndex]

      if (targetChar === inputChar) {
        setLetterAsserts(prev => ({
          ...prev,
          [targetChar]: (prev[targetChar] || 0) + 1,
        }))
      } else {
        setLetterFails(prev => ({
          ...prev,
          [inputChar]: (prev[inputChar] || 0) + 1,
        }))
      }
    }

    setPreviousInputLength(inputValue.length)

    const newStatuses = paragraph.split('').map((char, index): CharStatus => {
      if (index < inputValue.length) {
        return {
          char,
          status: char === inputValue[index] ? 'correct' : 'incorrect',
        }
      }
      return {
        char,
        status: 'untyped',
      }
    })

    setCharStatuses(newStatuses)

    const correctCount = newStatuses.filter(s => s.status === 'correct').length
    const incorrectCount = newStatuses.filter(
      s => s.status === 'incorrect'
    ).length
    const timeInMinutes = (60 - gameState.timeRemaining) / 60
    const wordsPerMinute = Math.round(correctCount / 5 / timeInMinutes)

    setStats({
      correctLetters: correctCount,
      incorrectLetters: incorrectCount,
      wordsPerMinute: wordsPerMinute || 0,
    })
  }

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timer
    if (gameState.hasStarted && gameState.timeRemaining > 0) {
      timer = setInterval(() => {
        setGameState(prev => {
          if (prev.timeRemaining <= 1) {
            calculateFinalStats()
            return { ...prev, isActive: false, timeRemaining: 0 }
          }
          return { ...prev, timeRemaining: prev.timeRemaining - 1 }
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [gameState.hasStarted, gameState.timeRemaining])

  // Calculate word positions
  useEffect(() => {
    const positions: number[] = []
    let currentPosition = 0
    paragraph.split(' ').forEach(word => {
      positions.push(currentPosition)
      currentPosition += word.length + 1
    })
    setWordPositions(positions)
  }, [paragraph])

  // Calculate letter indices

  // Initialize game
  useEffect(() => {
    const { selectedPara, initialCharStatuses } = getRandomParagraph()
    setParagraph(selectedPara)
    setCharStatuses(initialCharStatuses)
  }, [])

  return {
    paragraph,
    charStatuses,
    currentInput,
    cursor,
    gameState,
    stats,
    handleInput,
    wordPositions,
    resetGame,
    letterAsserts,
    letterFails,
    addTime,
  }
}
