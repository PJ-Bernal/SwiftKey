import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Code,
  Keyboard,
  BookOpen,
  BarChart2,
  Zap,
  GraduationCap,
  Timer,
  BarChart,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Layout from './Layout'
import { useTypeWriter } from '@/hooks/useTypeWriter'
import { memo } from 'react'

interface LetterProps {
  letter: string
  status: 'correct' | 'incorrect' | 'untyped'
  isCurrentPosition: boolean
  showCursor: boolean
}

export default function Component() {
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
  } = useTypeWriter()

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
        <section className="w-full py-8 md:py-20 lg:py-28 xl:py-44">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge
                  variant="outline"
                  className="px-3 py-1 text-sm font-medium"
                >
                  Type. Code. Learn.
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Master Typing, Conquer Coding
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Elevate your typing speed and coding skills simultaneously.
                  The ultimate platform for developers to enhance productivity.
                </p>
              </div>
              <div className="space-x-4">
                <Link to="/mode">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Typing{' '}
                  </Button>
                </Link>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-secondary/50 py-8 md:py-20 lg:py-28">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Tailored for Developers
            </h2>
            <Tabs defaultValue="classic" className="mx-auto w-full max-w-3xl">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="classic">Classic Typing</TabsTrigger>
                <TabsTrigger value="code">Code Typing</TabsTrigger>
              </TabsList>
              <TabsContent value="classic">
                <Card>
                  <CardHeader>
                    <CardTitle>Classic Typing Practice</CardTitle>
                    <CardDescription>
                      Enhance your typing skilss while discovering Manitoba's
                      curiosities
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative px-6 font-mono text-lg">
                    <div className="space-y-1 rounded-md bg-muted p-2">
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
                      <input
                        autoFocus
                        value={currentInput}
                        onChange={handleInput}
                        className="absolute inset-0 h-full w-full opacity-0"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to="/mode">
                      <div className="flex w-full justify-center">
                        <Button className="max-w-md">Begin Code Test</Button>
                      </div>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="code">
                <Card>
                  <CardHeader>
                    <CardTitle>Code Typing Practice</CardTitle>
                    <CardDescription>
                      Enhance your coding speed while learning programming
                      concepts.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="code-text">Sample Code</Label>
                      <div className="rounded-md bg-muted p-2">
                        <pre>
                          <code className="text-sm">
                            {`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`}
                          </code>
                        </pre>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="code-input">Type Here</Label>
                      <Input id="code-input" placeholder="Start coding..." />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to="/mode">
                      <div className="flex w-full justify-center">
                        <Button className="max-w-md">Begin Code Test</Button>
                      </div>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <section className="mx-auto max-w-4xl px-4 py-12">
          <div className="mb-16 grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border p-6 shadow-sm">
              <Timer className="mb-4 h-8 w-8 text-purple-600" />
              <h2 className="mb-3 text-xl font-semibold">Classic Mode</h2>
              <p className="text-gray-600">
                Challenge yourself with a 60-second typing sprint. Perfect your
                speed and accuracy with engaging paragraphs, track your WPM, and
                compete with yourself to achieve new records.
              </p>
            </div>

            <div className="rounded-lg border p-6 shadow-sm">
              <Code className="mb-4 h-8 w-8 text-purple-600" />
              <h2 className="mb-3 text-xl font-semibold">Code Learner Mode</h2>
              <p className="text-gray-600">
                Level up your development skills by typing real code snippets.
                Practice with different programming languages while improving
                your typing speed and accuracy.
              </p>
            </div>

            <div className="rounded-lg border p-6 shadow-sm">
              <BarChart className="mb-4 h-8 w-8 text-purple-600" />
              <h2 className="mb-3 text-xl font-semibold">Detailed Analytics</h2>
              <p className="text-gray-600">
                Track your progress with comprehensive metrics. Monitor your
                WPM, accuracy rate, and identify areas for improvement with
                detailed character analysis.
              </p>
            </div>

            <div className="rounded-lg border p-6 shadow-sm">
              <Sparkles className="mb-4 h-8 w-8 text-purple-600" />
              <h2 className="mb-3 text-xl font-semibold">Flexible Practice</h2>
              <p className="text-gray-600">
                Customize your practice sessions with flexible time options. Add
                30 or 60 seconds when you need more time, reset whenever you
                want, and practice at your own pace.
              </p>
            </div>
          </div>
        </section>
        <section className="w-full bg-secondary/50 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Level Up?
                </h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of developers who are improving their typing
                  speed and coding knowledge simultaneously.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">
                    Get Started
                    <Zap className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Start your journey to faster, more efficient coding today.
                  <div className="underline underline-offset-2">
                    Terms & Conditions
                  </div>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}
