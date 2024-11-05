// components/TypeWriter.tsx
import { memo } from 'react'
import { useTypeWriter } from '../hooks/useTypeWriter'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

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
    <div className="min-h-screen bg-background p-6">
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
        </Card>

        {/* Stats Bar */}
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex gap-6">
                <div className="text-center">
                  <p className="text-muted-foreground text-sm">Time</p>
                  <p className="text-2xl font-bold">
                    {gameState.timeRemaining}s
                  </p>
                </div>
                <Separator orientation="vertical" className="h-12" />
                <div className="text-center">
                  <p className="text-muted-foreground text-sm">WPM</p>
                  <p className="text-2xl font-bold">{stats.wordsPerMinute}</p>
                </div>
                <Separator orientation="vertical" className="h-12" />
                <div className="text-center">
                  <p className="text-muted-foreground text-sm">Accuracy</p>
                  <p className="text-2xl font-bold">
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
              </div>
              {!gameState.hasStarted && (
                <Badge variant="secondary" className="animate-pulse">
                  Start typing to begin...
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Typing Area */}
        <Card>
          <CardContent className="p-6 font-mono text-lg">
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
        </Card>

        {/* Results */}
        {gameState.timeRemaining === 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                Time's Up! Here's How You Did
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm">WPM</p>
                      <p className="text-3xl font-bold">
                        {stats.wordsPerMinute}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm">Accuracy</p>
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
                      <p className="text-muted-foreground text-sm">
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
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
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
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-sm">
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
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
