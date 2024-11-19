import { Keyboard } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import Layout from './Layout'

export default function SelectMode() {
  return (
    <Layout>
      <main className="flex-1">
        <section className="lg:py-18 xl:py-15 w-full px-10 py-5 text-center md:py-10">
          <div className="container grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle> Classic typing practice</CardTitle>
                <CardDescription>
                  Classic practice with random paragraphs to improve your
                  general typing skills.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/classicmode">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start classic mode{' '}
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle> Code - learner path</CardTitle>
                <CardDescription>
                  Reinforce your coding skills with code-specific exercises of
                  HTML, CSS and JS.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="group relative">
                  <Link to="/codemode">
                    <Button disabled size="lg" className="w-full sm:w-auto">
                      Start learner mode{' '}
                    </Button>
                  </Link>

                  {/* Tooltip */}
                  <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-3 py-1 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Under developing
                    {/* Tooltip arrow */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 rotate-180 border-4 border-transparent border-b-gray-900"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </Layout>
  )
}
