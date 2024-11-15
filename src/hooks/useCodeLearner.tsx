import { useEffect, useState } from 'react'
import material from '../constants/material.json'

interface CharStatus {
  char: string
  status: 'correct' | 'incorrect' | 'untyped'
}

interface Stats {
  correctLetters: number
  incorrectLetters: number
  wordsPerMinute: number
}

interface GameState {
  isActive: boolean
  hasStarted: boolean
  timeRemaining: number
}

interface LetterStats {
  [key: string]: number
}

export function CodeLearnerWriter() {
  const test = []

  const [content, setContent] = useState(material)
  const [paragraph, setParagraph] = useState('')
  const [charStatuses, setCharStatuses] = useState<CharStatus[]>([])

  const getTopic = (level: string, topic: string) => {
    const selectedTopic: string[] = content.javascript[0][level][topic]

    return {
      selectedTopic,
      initialCharStatuses: selectedTopic.map((sentences, sentencesIndex) =>
        sentences
          .split('')
          .map((chars, charsIndex) => ({ chars, status: 'untyped' as const }))
      ),
    }
  }

  console.dir(typeof content.javascript[0]['basic']['DataTypes'].toString())

  return (
    <div>
      <p>{content.javascript[0]['basic']['DataTypes']}</p>
    </div>
  )
}

export default CodeLearnerWriter
