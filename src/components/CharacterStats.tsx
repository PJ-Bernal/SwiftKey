import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CardContent } from '@/components/ui/card'

// Interface for the letter counts object
interface LetterCounts {
  [key: string]: number
}

// Props interface for the component
interface CharacterStatsProps {
  letterAsserts: LetterCounts
  letterFails: LetterCounts
}

const CharacterStats: React.FC<CharacterStatsProps> = ({
  letterAsserts,
  letterFails,
}) => {
  // Helper function to calculate total
  const calculateTotal = (obj: LetterCounts): number => {
    return Object.values(obj).reduce((acc, curr) => acc + curr, 0)
  }

  // Get unique sorted letters from both objects
  const uniqueLetters = [
    ...new Set([...Object.keys(letterAsserts), ...Object.keys(letterFails)]),
  ].sort()

  return (
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Character</TableHead>
            <TableHead className="text-center">Accurate</TableHead>
            <TableHead className="text-center">Inaccurate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {uniqueLetters.map(letter => (
            <TableRow key={letter}>
              <TableCell className="font-mono">
                {letter === ' ' ? 'space/untyped letter' : letter}
              </TableCell>
              <TableCell className="text-center">
                <span className="font-medium text-green-500">
                  {letterAsserts[letter] || 0}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <span className="font-medium text-red-500">
                  {letterFails[letter] || 0}
                </span>
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="font-medium">
            <TableCell>Total</TableCell>
            <TableCell className="text-center text-green-500">
              {calculateTotal(letterAsserts)}
            </TableCell>
            <TableCell className="text-center text-red-500">
              {calculateTotal(letterFails)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  )
}

export default CharacterStats
