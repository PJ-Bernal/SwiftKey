import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card } from '@/components/ui/card'
import { AnimatePresence, motion } from 'framer-motion'
import CharacterStats from './CharacterStats'
import KeyBoardHeatMap from './KBHetMap'

interface DetailedResultsProps {
  letterAsserts: { [key: string]: number }
  letterFails: { [key: string]: number }
}

const DetailedResults: React.FC<DetailedResultsProps> = ({
  letterAsserts,
  letterFails,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [current, setCurrent] = useState(0)

  const slides = [
    {
      title: 'Character Statistics',
      component: (
        <CharacterStats
          letterAsserts={letterAsserts}
          letterFails={letterFails}
        />
      ),
    },
    {
      title: 'Keyboard Heatmap - asserts',
      component: <KeyBoardHeatMap usageData={letterAsserts} />,
    },
    {
      title: 'Keyboard Heatmap - fails',
      component: <KeyBoardHeatMap usageData={letterFails} />,
    },
  ]

  const myRef = useRef(null)

  return (
    <div className="w-full space-y-4">
      <Button
        variant="secondary"
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        className="mx-auto mb-5 flex"
      >
        {isOpen ? 'Hide Details' : 'Show Detailed Results'}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden"
          >
            <div className="rounded-lg border bg-card px-10">
              <div className="p-4">
                <h2 className="mb-4 text-center text-lg font-semibold">
                  Typing Analysis
                </h2>
                <CharacterStats
                  letterAsserts={letterAsserts}
                  letterFails={letterFails}
                />
                <KeyBoardHeatMap usageData={letterAsserts} />
                <KeyBoardHeatMap usageData={letterFails} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DetailedResults
