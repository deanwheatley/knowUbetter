'use client'

import { useState } from 'react'
import { Question } from '@/types'

interface QuizCardProps {
  question: Question
  onAnswer: (correct: boolean) => void
}

export default function QuizCard({ question, onAnswer }: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [showResult, setShowResult] = useState(false)

  const handleSubmit = () => {
    const isCorrect = selectedAnswer === question.correctAnswer
    setShowResult(true)
    setTimeout(() => onAnswer(isCorrect), 1500)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
          question.category.color || 'bg-blue-100 text-blue-800'
        }`}>
          {question.category.name}
        </span>
        <span className="ml-2 kudos-badge">+{question.kudosReward} kudos</span>
      </div>
      
      <h2 className="text-xl font-semibold mb-6">{question.content}</h2>
      
      {question.options ? (
        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(option)}
              disabled={showResult}
              className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                selectedAnswer === option
                  ? showResult
                    ? option === question.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-primary-500 bg-primary-50'
                  : showResult && option === question.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <input
          type="text"
          value={selectedAnswer}
          onChange={(e) => setSelectedAnswer(e.target.value)}
          disabled={showResult}
          className="w-full p-3 border-2 border-gray-200 rounded-lg mb-6"
          placeholder="Type your answer..."
        />
      )}
      
      {!showResult && (
        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Answer
        </button>
      )}
      
      {showResult && (
        <div className={`text-center p-4 rounded-lg ${
          selectedAnswer === question.correctAnswer
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {selectedAnswer === question.correctAnswer ? '🎉 Correct!' : '❌ Incorrect'}
          <div className="mt-2 text-sm">
            {selectedAnswer === question.correctAnswer 
              ? `You earned ${question.kudosReward} kudos!`
              : `Correct answer: ${question.correctAnswer}`
            }
          </div>
        </div>
      )}
    </div>
  )
}