// components/TypeWriter.tsx
import { memo } from 'react'
import { useTypeWriter } from '../hooks/useTypeWriter'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { RefreshCcw } from 'lucide-react'

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
    resetGame,
  } = useTypeWriter()

  const renderParagraph = () => {
    const words = paragraph.split(' ')

    return words.map((word, wordIndex) => (
      <span key={wordIndex}>
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
    <div className="min-h-screen p-5">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header Section */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-4xl">SwiftKey</CardTitle>
            <p className="text-muted-foreground">
              Level up your typing game - race against the clock and crush your
              personal bests!
            </p>
          </CardHeader>
          <CardContent className="pb-5">
            <div className="flex items-center justify-between">
              <div className="">
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="text-2xl font-bold">{gameState.timeRemaining}s</p>
              </div>

              {!gameState.hasStarted && (
                <Badge variant="secondary" className="animate-pulse text-sm">
                  Start typing to begin...
                </Badge>
              )}

              {/* Add restart button */}
              {
                <Button onClick={resetGame} variant="outline" className="flex">
                  <RefreshCcw className="" />
                  Type again
                </Button>
              }
            </div>
          </CardContent>
        </Card>

        {/* Typing Area */}
        <Card className="relative">
          {' '}
          {/* Add a container div */}
          <CardContent className={`p-6 font-mono text-lg`}>
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

            {renderParagraph()}
          </CardContent>
          <input
            autoFocus
            value={currentInput}
            disabled={!gameState.isActive}
            onChange={handleInput}
            className="absolute top-0 min-h-full min-w-full opacity-0"
          />
        </Card>

        {/* Results */}
        {gameState.timeRemaining === 0 && (
          <Card className="">
            <CardHeader>
              <CardTitle className="text-center">
                Time's Up! Here's How You Did
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">WPM</p>
                      <p className="text-3xl font-bold">
                        {stats.wordsPerMinute}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Accuracy</p>
                      <p className="text-3xl font-bold">
                        {Math.round(
                          (stats.correctLetters /
                            (stats.correctLetters + stats.incorrectLetters)) *
                            100
                        )}
                        %
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Characters
                      </p>
                      <p className="text-3xl font-bold">
                        {stats.correctLetters + stats.incorrectLetters}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Progress Bars */}
              <div className="flex justify-around space-y-4">
                <div className="flex">
                  <div className="text-sm">
                    <span className="text-muted-foreground">
                      Correct Letters
                    </span>
                    <span>{stats.correctLetters}</span>
                  </div>
                  <Progress
                    value={
                      (stats.correctLetters /
                        (stats.correctLetters + stats.incorrectLetters)) *
                      100
                    }
                    className="h-1"
                  />
                </div>
                <div className="flex">
                  <div className="text-sm">
                    <span className="text-muted-foreground">
                      Incorrect Letters
                    </span>
                    <span>{stats.incorrectLetters}</span>
                  </div>
                  <Progress
                    value={
                      (stats.incorrectLetters /
                        (stats.correctLetters + stats.incorrectLetters)) *
                      100
                    }
                    className="h-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default TypeWriter
