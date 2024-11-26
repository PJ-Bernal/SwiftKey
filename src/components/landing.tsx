import { useState } from 'react'
import { Button } from '@/components/ui/button'
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
import GeneralResults from '../assets/General_results.avif'
import TimeFeedBack from '../assets/In_real_time_feedback.webp'
import HeatMap from '../assets/KB_heatmap.avif'
import Restart from '../assets/Restar_add_time_options.avif'
import Table from '../assets/Table.webp'
import InRealTime from '../assets/In_real_time.webp'

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
        <CtaSection />
      </main>
    </Layout>
  )
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <div className="container m-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-8 max-w-4xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text pb-1 text-5xl font-bold tracking-tight text-transparent sm:text-7xl md:text-8xl/tight">
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
    </section>
  )
}

function FeaturesSection() {
  const features = [
    {
      icon: Keyboard,
      title: 'Adaptive Learning',
      description:
        'Our in-real-time system provides instant feedback that will enhance your speed and accuracy.',
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
      <div className="container m-auto px-4 md:px-6">
        <h2 className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text pb-5 text-center text-3xl font-bold tracking-tight text-transparent sm:text-5xl">
          Supercharge Your Coding Skills
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-indigo-100 p-3 dark:bg-indigo-900">
                <feature.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DemoSection() {
  return (
    <section className="py-20 dark:bg-gray-900 sm:py-20">
      <div className="container m-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text pb-2 text-3xl font-semibold tracking-tight text-transparent sm:text-5xl">
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
                Start Typying now!
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-2 rounded-2xl p-6 md:grid-cols-2">
            {/* First row */}

            <div className="group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:shadow-lg md:col-span-2">
              <img
                src={InRealTime}
                alt="Real Time Feedback"
                className="h-full w-full rounded-2xl object-contain transition-all duration-300 group-hover:blur-sm"
              />

              <div className="absolute inset-0 z-10 flex items-center justify-center text-lg font-semibold text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                In-real-time feedback with visual cues
              </div>
            </div>

            <div className="group relative w-3/4 justify-self-center overflow-hidden rounded-2xl bg-white p-4 shadow-md transition-all duration-300 hover:shadow-lg md:col-span-2">
              <div className="flex justify-center text-center">
                <img
                  src={HeatMap}
                  alt="Keyboard Heatmap"
                  className="h-full w-3/4 rounded-2xl object-contain transition-all duration-300 group-hover:blur-sm"
                />
              </div>
              <div className="absolute inset-0 top-14 z-10 flex items-center justify-center p-6 text-center text-base font-semibold text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Keyboard heatmap with key usage frequency based on asserts or
                fails
              </div>
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

      features: [
        'Swift Key enhances coding productivity by training developers to type faster and more accurately, turning keyboard proficiency into a competitive advantage ',
        'With instant character-by-case feedback and performance metrics (WPM, accuracy rates, keyboard heatmap) Swift Key helps you identify and improve your typing weaknesses.',
        'Practice typing with Winnipeg trivia, or level up your JavaScript skills in code mode',
      ],
    },
    {
      name: 'What inspired me',

      features: [
        'Swift Key was born from my self-taught coding journey, where I discovered that typing speed and accuracy are fundamental to programming success.',
        'After creating over 900 programming notes in Obsidian, I decided to share my knowledge by writing myself the coding snippets of the code learner mode.',
        'I designed Swift Key with a dual purpose: helping everyone type better while enabling developers to strengthen their coding knowledge.',
      ],
    },
  ]

  return (
    <section id="about" className="py-20 dark:bg-gray-900 sm:py-20">
      <div className="container m-auto px-4 md:px-6">
        <h2 className="mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text pb-5 text-center text-3xl font-bold tracking-tight text-transparent sm:text-5xl">
          About Swift Key!
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {plans.map((plan, index) => (
            <div
              key={index}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaSection() {
  return (
    <section className="py-20 sm:py-20">
      <div className="container m-auto px-4 md:px-6">
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
