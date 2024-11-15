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
                <Link to="/learnermode">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start learner mode{' '}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </Layout>
  )
}
