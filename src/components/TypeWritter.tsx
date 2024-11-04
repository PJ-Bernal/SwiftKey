// components/TypeWriter.tsx
import { memo } from 'react'
import { useTypeWriter } from '../hooks/useTypeWriter'

interface LetterProps {
  letter: string
  status: 'correct' | 'incorrect' | 'untyped'
  isCurrentPosition: boolean
  showCursor: boolean
}

const Letter = memo(
  ({ letter, status, isCurrentPosition, showCursor }: LetterProps) => {
    const colorClass =
      status === 'correct'
        ? 'text-green-500'
        : status === 'incorrect'
          ? 'text-red-500'
          : 'text-black'

    return (
      <span className={`font-medium ${colorClass}`}>
        {showCursor && isCurrentPosition && (
          <span className="cursor-blink" aria-hidden="true">
            |
          </span>
        )}
        {letter}
      </span>
    )
  }
)

Letter.displayName = 'Letter'

export function TypeWriter() {
  const {
    paragraph,
    charStatuses,
    currentInput,
    cursor,
    gameState,
    stats,
    handleInput,
    wordPositions,
  } = useTypeWriter()

  const renderParagraph = () => {
    const words = paragraph.split(' ')

    return words.map((word, wordIndex) => (
      <span key={wordIndex} className="relative">
        {word.split('').map((letter, letterIndex) => {
          const globalIndex = wordPositions[wordIndex] + letterIndex

          const isCurrentPosition =
            wordIndex === cursor.wordPosition &&
            letterIndex === cursor.letterIndex

          return (
            <Letter
              key={`${wordIndex}-${letterIndex}`}
              letter={letter}
              status={charStatuses[globalIndex]?.status ?? 'untyped'}
              isCurrentPosition={isCurrentPosition}
              showCursor={true}
            />
          )
        })}
        {wordIndex === cursor.wordPosition &&
          cursor.letterIndex === word.length && (
            <span className="cursor-blink" aria-hidden="true">
              |
            </span>
          )}
        {wordIndex < words.length - 1 ? ' ' : ''}
      </span>
    ))
  }

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
          <p className="font-mono">{renderParagraph()}</p>
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
