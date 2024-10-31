import { useEffect, useState } from 'react'
import MOCK_PARAGRAPHS from '../constants/paragraphs'

function TypeWritter() {
  const [paragraph, setParagraph] = useState(MOCK_PARAGRAPHS[0])
  const [cursorWordPosition, setCursorWordPosition] = useState<number>(0)
  const [inputCurrentChar, setInputCurrentChar] = useState('')
  const [inputLetterIndex, setInputLetterIndex] = useState(0)
  const [correctLetters, setCorrectLetters] = useState(0)
  const [wrongLetters, setWrongLetters] = useState(0)
  const [timer, setTimer] = useState(10)
  const [timerStart, setTimerStart] = useState(false)
  const [gameStatus, setGameStatus] = useState(true)
  const [charStatuses, setCharStatuses] = useState<
    Array<'correct' | 'incorrect' | 'untyped'>
  >([])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(gameStatus)
    console.log('outside: ', timer)
    const cursorWordPosition = e.target.value.split(' ').length - 1
    setCursorWordPosition(cursorWordPosition)

    const currentLetter = e.target.value.charAt(e.target.value.length - 1)
    setInputCurrentChar(currentLetter)

    const currentLetterInCurrentWordCount =
      e.target.value.split(' ')[cursorWordPosition].length - 1
    setInputLetterIndex(currentLetterInCurrentWordCount)

    setTimerStart(true)

    const currentIndex = e.target.value.length - 1
    const expectedChar = paragraph[currentIndex]

    setCharStatuses(prev => {
      const newStatuses = [...prev]
      newStatuses[currentIndex] =
        currentLetter === expectedChar ? 'correct' : 'incorrect'
      return newStatuses
    })

    currentLetter === expectedChar && charStatuses[currentIndex] == 'untyped'
      ? setCorrectLetters(prev => prev + 1)
      : setWrongLetters(prev => prev + 1)
  }

  const letterClass = (wordIndex: number, letterIndex: number): string => {
    // Calculate the global index of this letter in the paragraph
    const globalIndex =
      paragraph.split(' ').slice(0, wordIndex).join(' ').length +
      (wordIndex > 0 ? 1 : 0) +
      letterIndex

    // Return color based on stored status
    switch (charStatuses[globalIndex]) {
      case 'correct':
        return 'text-green-500'
      case 'incorrect':
        return 'text-red-500'
      default:
        return 'text-black'
    }
  }

  function randomPara() {
    const randomParagraphs = [...MOCK_PARAGRAPHS]
    let selectedPara =
      randomParagraphs[Math.floor(Math.random() * randomParagraphs.length)]
    let numberOfWords = selectedPara.split('').length
    let booleanArray = [...Array(numberOfWords).fill('')]

    setCharStatuses(new Array(numberOfWords).fill('untyped'))
    return { selectedPara, booleanArray: Array(numberOfWords).fill('') }
  }

  useEffect(() => {
    gameStatus == false ? console.log('end of the game') : ''
  }, [gameStatus])

  useEffect(() => {
    setParagraph(randomPara().selectedPara)
  }, [])

  useEffect(() => {
    const gametime = setInterval(() => {
      if (timer > 0 && timerStart) {
        setTimer(prev => prev - 1)
        console.log(timer)
      }
      if (timer <= 1) {
        setGameStatus(false)
        console.log('inside: ', gameStatus)
      }
    }, 1000)

    return () => clearInterval(gametime)
  }, [timerStart, timer])

  return (
    <div className="m-4 flex flex-col bg-gray-100">
      <h1 className="text-center">Here is you sample</h1>
      <p>{timer}</p>
      <p className="">
        {paragraph.split(' ').map((words, indexwords) => {
          return (
            <span
              key={indexwords}
              className={`${cursorWordPosition == indexwords ? 'rounded-md bg-gray-300' : ''}`}
            >
              {words.split('').map((letters, indexLetters) => {
                return (
                  <span
                    key={indexwords - indexLetters}
                    className={`font-medium ${letterClass(indexwords, indexLetters)}`}
                  >
                    {letters}
                    {}
                  </span>
                )
              })}{' '}
            </span>
          )
        })}
      </p>
      <span className={timer != 0 ? 'hidden' : ''}>
        {' '}
        Correct letters: {correctLetters}
        Incorrect letters letters: {wrongLetters}
        {gameStatus}
      </span>
      <span>Status: {gameStatus}</span>
      <input
        autoFocus
        onChange={handleInput}
        className={`focus:ring-gray-500' w-full rounded border border-gray-300 p-3 focus:border-transparent focus:outline-none focus:ring-2 ${gameStatus ? '' : 'hidden'}`}
      ></input>
    </div>
  )
}

export default TypeWritter
