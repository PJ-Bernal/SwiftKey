// components/TypeWriter.tsx
import { memo, useState } from 'react'
import { useTypeWriter } from '../hooks/useTypeWriter'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Keyboard, RefreshCcw, CirclePlus } from 'lucide-react'
import KeyBoardHeatMap from './KBHetMap'
import { Link } from 'react-router-dom'
import CharacterStats from './CharacterStats'
import KeyboardHeatmap from './KBHetMap'
import DetailedResults from './DetailResults'
import Layout from './Layout'
import { useCodeWriter } from '@/hooks/useCodeLearner'

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

export function CodeTypeWriter() {
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
    letterAsserts,
    letterFails,
    addTime,
  } = useCodeWriter()

  const getSortedLetters = (stats: Record<string, number>) => {
    return Object.entries(stats)
      .sort(([, a], [, b]) => b - a)
      .reduce(
        (obj, [key, value]) => ({
          ...obj,
          [key]: value,
        }),
        {}
      )
  }

  const [showTimeButtons, setShowTimeButtons] = useState(false)

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
    <Layout>
      <main className="flex-1">
        <div className="m-7 mx-auto max-w-4xl space-y-6">
          {/* Header Section */}
          <Card className="mx-auto w-full max-w-3xl bg-white/75 backdrop-blur-lg">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-2xl sm:text-4xl">
                Code learner mode
              </CardTitle>
              <p className="text-sm text-muted-foreground sm:text-base">
                You will have 60 seconds to write as fast as you can.
              </p>
            </CardHeader>
            <CardContent className="pb-5">
              <div className="flex items-center justify-center">
                <div className={`-translate-x-20`}>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="text-2xl font-bold">
                    {gameState.timeRemaining}s
                  </p>
                </div>

                {/* Add restart button */}

                <div
                  className={`flex translate-x-32 transform items-center gap-8`}
                  onMouseEnter={() => setShowTimeButtons(true)}
                  onMouseLeave={() => setShowTimeButtons(false)}
                >
                  {!showTimeButtons ? (
                    <Button variant="outline">Need more time?</Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={() => addTime(30)} variant="outline">
                        <CirclePlus />
                        30
                      </Button>
                      <Button onClick={() => addTime(60)} variant="outline">
                        <CirclePlus />
                        60
                      </Button>
                    </div>
                  )}
                  <div>
                    <Button onClick={resetGame} variant="outline" className="">
                      <RefreshCcw className="" />
                      Restart timer
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Typing Area */}
          <Card className="relative mx-auto w-full max-w-3xl rounded-xl border-2 border-white/20">
            {' '}
            {/* Add a container div */}
            <CardContent className="overflow-x-hidden rounded-lg bg-transparent p-4 font-mono text-base sm:p-6 sm:text-lg">
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
                        <p className="text-sm text-muted-foreground">
                          Accuracy
                        </p>
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
                <div className="flex w-full items-center justify-between gap-4 p-5">
                  <div className="flex w-1/2 flex-col">
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
                      className="h-1"
                    />
                  </div>

                  <div className="flex w-1/2 flex-col">
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
                      className="h-1"
                    />
                  </div>
                </div>

                {/* <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="mb-2 font-semibold">Accurate characters</h3>
                    <div className="space-y-1">
                      {Object.entries(getSortedLetters(letterAsserts)).map(
                        ([letter, count]) => (
                          <div key={letter} className="flex justify-between">
                            <span className="font-mono">{`${letter == ' ' ? 'space' : letter}`}</span>
                            <span>{count}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">
                      Inaccurate characters
                    </h3>
                    <div className="space-y-1">
                      {Object.entries(getSortedLetters(letterFails)).map(
                        ([letter, count]) => (
                          <div key={letter} className="flex justify-between">
                            <span className="font-mono">{`${letter == ' ' ? 'untyped letters' : letter}`}</span>
                            <span>{count}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </CardContent> */}
              </CardContent>
              {/* <CharacterStats
                letterAsserts={letterAsserts}
                letterFails={letterFails}
              /> */}

              <DetailedResults
                letterAsserts={letterAsserts}
                letterFails={letterFails}
              />
            </Card>
          )}
        </div>
      </main>
    </Layout>
  )
}

export default CodeTypeWriter
