import { useEffect, useState } from 'react'
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

function TypeWriter() {
  const [paragraph, setParagraph] = useState('')
  const [charStatuses, setCharStatuses] = useState<CharStatus[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [wordPositions, setWordPositions] = useState<number[]>([])

  const [cursor, setCursor] = useState({
    wordPosition: 0,
    letterIndex: 0,
  })

  const [gameState, setGameState] = useState({
    isActive: true,
    hasStarted: false,
    timeRemaining: 5, // Changed to 60 seconds for better WPM calculation
  })

  const [stats, setStats] = useState<Stats>({
    correctLetters: 0,
    incorrectLetters: 0,
    wordsPerMinute: 0,
  })

  // Simplified get random paragraph
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

  useEffect(() => {
    let timer: NodeJS.Timer

    if (gameState.hasStarted && gameState.timeRemaining > 0) {
      timer = setInterval(() => {
        setGameState(prev => {
          if (prev.timeRemaining <= 1) {
            // Calculate final stats when timer ends
            calculateFinalStats()
            return { ...prev, isActive: false, timeRemaining: 0 }
          }
          return { ...prev, timeRemaining: prev.timeRemaining - 1 }
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [gameState.hasStarted, gameState.timeRemaining])

  const calculateFinalStats = () => {
    const correctCount = charStatuses.filter(s => s.status === 'correct').length
    const incorrectCount = charStatuses.filter(
      s => s.status === 'incorrect'
    ).length

    // Calculate WPM: (characters typed / 5) / time in minutes
    // Using standard word length of 5 characters
    const timeInMinutes = (60 - gameState.timeRemaining) / 60
    const wordsPerMinute = Math.round(correctCount / 5 / timeInMinutes)

    setStats({
      correctLetters: correctCount,
      incorrectLetters: incorrectCount,
      wordsPerMinute,
    })
  }

  // Pre-calculate word positions for faster lookups

  useEffect(() => {
    const positions: number[] = []
    let currentPosition = 0
    paragraph.split(' ').forEach(word => {
      positions.push(currentPosition)
      currentPosition += word.length + 1 // +1 for space
    })
    setWordPositions(positions)
  }, [paragraph])

  // Simplified input handler
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const cursorPosition = e.target.selectionStart ?? 0

    // Start game if needed
    if (!gameState.hasStarted && inputValue) {
      setGameState(prev => ({ ...prev, hasStarted: true }))
    }

    // Only process input if game is active
    if (!gameState.isActive) return

    setCurrentInput(inputValue)

    // Find word position directly from pre-calculated positions
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

    // Update char statuses directly
    const newStatuses = paragraph.split('').map((char, index) => ({
      char,
      status:
        index < inputValue.length
          ? char === inputValue[index]
            ? 'correct'
            : 'incorrect'
          : 'untyped',
    }))
    setCharStatuses(newStatuses)

    // Update stats in real-time
    const correctCount = newStatuses.filter(s => s.status === 'correct').length
    const incorrectCount = newStatuses.filter(
      s => s.status === 'incorrect'
    ).length
    const timeInMinutes = (60 - gameState.timeRemaining) / 60
    const wordsPerMinute = Math.round(correctCount / 5 / timeInMinutes)

    setStats({
      correctLetters: correctCount,
      incorrectLetters: incorrectCount,
      wordsPerMinute: wordsPerMinute || 0, // Avoid NaN when time is 0
    })
  }

  // Simplified render helpers
  const getLetterClass = (wordIndex: number, letterIndex: number): string => {
    const globalIndex = wordPositions[wordIndex] + letterIndex
    const status = charStatuses[globalIndex]?.status

    return `font-medium ${
      status === 'correct'
        ? 'text-green-500'
        : status === 'incorrect'
          ? 'text-red-500'
          : 'text-black'
    }`
  }

  useEffect(() => {
    const { selectedPara, initialCharStatuses } = getRandomParagraph()
    setParagraph(selectedPara)
    setCharStatuses(initialCharStatuses)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">SwiftKey</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Level up your typing game - race against the clock and crush your
            personal bests! Whether you're a typing newbie or a keyboard
            warrior, get ready to blast through words and have fun doing it.
          </p>
        </div>

        {/* Game Stats Bar */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-sm uppercase tracking-wide text-gray-500">
                  Time
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {gameState.timeRemaining}s
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm uppercase tracking-wide text-gray-500">
                  WPM
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.wordsPerMinute}
                </p>
              </div>
            </div>
            {!gameState.hasStarted && (
              <p className="animate-pulse text-sm text-gray-500">
                Start typing to begin...
              </p>
            )}
          </div>
        </div>

        {/* Typing Area */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
          <style>
            {`
              .cursor-blink {
                position: absolute;
                animation: blink 1.3s ease-in-out infinite;
                color: black;
                font-weight: normal;
                margin-left: -5px;
              }
              
              @keyframes blink {
                from, to { opacity: 1; }
                50% { opacity: 0; }
              }
            `}
          </style>
          <p className="font-mono text-lg leading-relaxed">
            {paragraph.split(' ').map((word, wordIndex) => (
              <span key={wordIndex} className="relative">
                {word.split('').map((letter, letterIndex) => (
                  <span
                    key={`${wordIndex}-${letterIndex}`}
                    className={getLetterClass(wordIndex, letterIndex)}
                  >
                    {wordIndex === cursor.wordPosition &&
                      letterIndex === cursor.letterIndex && (
                        <span className="cursor-blink" aria-hidden="true">
                          |
                        </span>
                      )}
                    {letter}
                  </span>
                ))}
                {wordIndex === cursor.wordPosition &&
                  cursor.letterIndex === word.length && (
                    <span className="cursor-blink" aria-hidden="true">
                      |
                    </span>
                  )}
                {wordIndex < paragraph.split(' ').length - 1 ? ' ' : ''}
              </span>
            ))}
          </p>
        </div>

        {/* Results Modal */}
        <div
          className={`${
            gameState.timeRemaining !== 0 ? 'hidden' : ''
          } rounded-lg bg-white p-8 shadow-lg`}
        >
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
            Time's Up! Here's How You Did
          </h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <p className="mb-1 text-sm uppercase tracking-wide text-gray-500">
                WPM
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.wordsPerMinute}
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <p className="mb-1 text-sm uppercase tracking-wide text-gray-500">
                Accuracy
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.correctLetters + stats.incorrectLetters > 0
                  ? Math.round(
                      (stats.correctLetters /
                        (stats.correctLetters + stats.incorrectLetters)) *
                        100
                    )
                  : 0}
                %
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <p className="mb-1 text-sm uppercase tracking-wide text-gray-500">
                Characters
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.correctLetters + stats.incorrectLetters}
              </p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-green-50 p-4">
              <p className="text-center text-green-600">
                Correct: {stats.correctLetters}
              </p>
            </div>
            <div className="rounded-lg bg-red-50 p-4">
              <p className="text-center text-red-600">
                Incorrect: {stats.incorrectLetters}
              </p>
            </div>
          </div>
        </div>

        <input
          autoFocus
          value={currentInput}
          disabled={!gameState.isActive}
          onChange={handleInput}
          className="absolute opacity-0"
        />
      </div>
    </div>
  )
}

export default TypeWriter
