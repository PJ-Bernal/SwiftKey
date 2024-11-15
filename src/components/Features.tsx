import { Layout } from './Layout'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Keyboard,
  Timer,
  BarChart2,
  Flame,
  Code,
  Layers,
  BookOpen,
  CheckCircle,
  Lightbulb,
} from 'lucide-react'

export function Features() {
  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold">
            Powerful Features for Everyone
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            From casual typists to professional developers, SwiftKey provides
            the tools you need to master keyboard proficiency.
          </p>
        </div>

        {/* Features Tabs */}
        <Tabs defaultValue="all" className="mb-16">
          <div className="mb-8 flex justify-center">
            <TabsList>
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="developers">Developers</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Keyboard className="mb-2 h-8 w-8 text-purple-600" />
                  <CardTitle>Real-Time Feedback</CardTitle>
                  <CardDescription>
                    Instant visual feedback on your typing accuracy
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Watch your progress in real-time with color-coded feedback.
                    <span className="text-green-600"> Green</span> highlights
                    for accurate keystrokes and
                    <span className="text-red-600"> red</span> for areas needing
                    improvement.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Timer className="mb-2 h-8 w-8 text-purple-600" />
                  <CardTitle>Flexible Time Control</CardTitle>
                  <CardDescription>
                    Customize your practice duration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Take control of your practice sessions with flexible timer
                    options. Reset anytime or extend by 30/60 seconds to perfect
                    your skills.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <BarChart2 className="mb-2 h-8 w-8 text-purple-600" />
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>
                    Comprehensive keystroke analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Track your progress with detailed statistics showing
                    accuracy rates for each character, helping identify areas
                    for improvement.
                  </p>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <Flame className="mb-2 h-8 w-8 text-purple-600" />
                  <CardTitle>Advanced Heat Map Visualization</CardTitle>
                  <CardDescription>
                    Visual representation of your typing patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Experience a revolutionary way to visualize your typing
                    patterns with our custom heat map. See frequency and
                    accuracy patterns for each key, helping you identify
                    strengths and areas for improvement at a glance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="developers">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <Code className="mb-2 h-8 w-8 text-purple-600" />
                  <CardTitle>Multi-Language Support</CardTitle>
                  <div className="mt-2 flex gap-2">
                    <Badge>HTML</Badge>
                    <Badge>JavaScript</Badge>
                    <Badge>React</Badge>
                    <Badge>More</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Choose from a variety of programming languages and
                    frameworks. Practice with real-world code snippets tailored
                    to your interests.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Layers className="mb-2 h-8 w-8 text-purple-600" />
                  <CardTitle>Progressive Learning Path</CardTitle>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="outline">Basic</Badge>
                    <Badge variant="outline">Intermediate</Badge>
                    <Badge variant="outline">Advanced</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Master each language at your own pace with structured
                    difficulty levels. Progress from fundamentals to advanced
                    concepts systematically.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <BookOpen className="mb-2 h-8 w-8 text-purple-600" />
                  <CardTitle>Comprehensive Topic Coverage</CardTitle>
                  <CardDescription>
                    Detailed subject breakdown for thorough learning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Each language features a carefully curated list of topics,
                    from basic syntax to advanced concepts, ensuring complete
                    coverage of essential skills.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CheckCircle className="mb-2 h-8 w-8 text-purple-600" />
                  <CardTitle>Best Practices Focus</CardTitle>
                  <CardDescription>
                    Learn industry-standard coding practices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    All code snippets are expertly crafted to demonstrate best
                    practices and real-world programming patterns, enhancing
                    your development skills.
                  </p>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <Lightbulb className="mb-2 h-8 w-8 text-purple-600" />
                  <CardTitle>Educational Code Examples</CardTitle>
                  <CardDescription>
                    Practical and instructive code samples
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Each code snippet serves as both a typing exercise and a
                    learning opportunity. Whether you're new to programming or
                    refreshing your skills, our examples provide valuable
                    insights and practical knowledge.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

export default Features
