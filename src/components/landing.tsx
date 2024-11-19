import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Keyboard,
  Code,
  BarChart,
  Zap,
  ChevronRight,
  CheckCircle,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Layout from './Layout'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function Landing() {
  const [email, setEmail] = useState('')
  const { hash } = useLocation()

  useEffect(() => {
    if (hash === '#about') {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [hash])

  return (
    <Layout>
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <DemoSection />

        <PricingSection />
        <CtaSection email={email} setEmail={setEmail} />
      </main>
    </Layout>
  )
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-8 max-w-4xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl md:text-8xl/tight">
            Master Typing,
            <br />
            Conquer Coding
          </h1>
          <p className="mb-10 max-w-prose text-lg text-gray-600 dark:text-gray-400">
            Elevate your typing speed and coding skills simultaneously. The
            ultimate platform for developers to enhance productivity and write
            code faster than ever before.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link to="/mode">
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6 text-lg text-white shadow-lg transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl"
              >
                Start Typing Now
              </Button>
            </Link>
            {/* <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-lg"
            >
              Watch Demo
            </Button> */}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)] dark:stroke-gray-700"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg
            x="50%"
            y={-1}
            className="overflow-visible fill-gray-50 dark:fill-gray-900"
          >
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
          />
        </svg>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    {
      icon: Keyboard,
      title: 'Adaptive Learning',
      description:
        'Our AI-powered system adapts to your skill level, providing personalized exercises to improve your weaknesses.',
    },
    {
      icon: Code,
      title: 'Real Code Snippets',
      description:
        'Practice with actual code from popular libraries and frameworks, preparing you for real-world scenarios.',
    },
    {
      icon: BarChart,
      title: 'Detailed Analytics',
      description:
        'Track your progress with comprehensive metrics, identifying areas for improvement and celebrating your achievements.',
    },
    {
      icon: Zap,
      title: 'Speed Challenges',
      description:
        'Compete against yourself or others in timed challenges to push your limits and improve rapidly.',
    },
  ]

  return (
    <section className="py-20 sm:py-20">
      <div className="container px-4 md:px-6">
        <h2 className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text pb-5 text-center text-3xl font-bold tracking-tight text-transparent sm:text-5xl">
          Supercharge Your Coding Skills
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 rounded-full bg-indigo-100 p-3 dark:bg-indigo-900">
                <feature.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DemoSection() {
  return (
    <section className="py-20 dark:bg-gray-900 sm:py-20">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-5xl">
              Experience the Power of Swift Key
            </h2>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
              Watch our demo to see how Swift Key can transform your coding
              experience. Witness real-time improvements in your typing speed
              and accuracy.
            </p>
            <Link to="/mode">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
              >
                Start Free Trial
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="relative aspect-video rounded-xl bg-gray-100 shadow-2xl dark:bg-gray-800">
            <div className="absolute inset-0 flex items-center justify-center">
              <Button size="lg" variant="outline" className="rounded-full">
                Play Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  const plans = [
    {
      name: 'Why Swift Key?',
      price: '$0.00',
      features: [
        'Swift Key enhances coding productivity by training developers to type faster and more accurately, turning keyboard proficiency into a competitive advantage ',
        'With instant character-by-case feedback and performance metrics (WPM, accuracy rates, keyboard heatmap) Swift Key helps you identify and improve your typing weaknesses.',
        'With instant feedback and detailed stats, Swift Key helps you identify and fix typing weaknesses.',
      ],
    },
    {
      name: 'What inspired me',

      features: [
        'Swift Key was born from my self-taught coding journey, where I discovered that typing speed and accuracy are fundamental to programming success.',
        'After creating over 900 programming notes in Obsidian, I wanted to share my accumulated knowledge by incorporating real coding snippets into the typing practice.',
        'I built Swift Key to help others master the essential skill of typing while learning from real programming examples.',
      ],
    },
  ]

  return (
    <section id="about" className="sm:py-15 py-20 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <h2 className="mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text pb-5 text-center text-3xl font-bold tracking-tight text-transparent sm:text-5xl">
          About Swift Key!
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800"
            >
              <h3 className="mb-5 text-2xl font-bold">{plan.name}</h3>

              <div className="flex-grow">
                <ul className="flex flex-col space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="grid grid-cols-[24px,1fr] items-start gap-3"
                    >
                      <CheckCircle className="mt-1 h-5 w-5 text-green-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link to="/mode">
                <Button className="mt-8 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700">
                  Get Started
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaSection({
  email,
  setEmail,
}: {
  email: string
  setEmail: (email: string) => void
}) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Submitted email:', email)
  }

  return (
    <section className="py-20 sm:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text pb-10 text-3xl font-bold tracking-tight text-transparent sm:text-5xl">
            Ready to Transform Your Coding?
          </h2>
          <p className="mb-8 max-w-prose text-lg text-gray-600 dark:text-gray-400">
            Join thousands of developers who are already coding faster and more
            efficiently with Swift Key.
          </p>
        </div>
      </div>
    </section>
  )
}
