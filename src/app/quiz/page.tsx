'use client';

import { useState } from 'react';

export default function QuizPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Mock data
  const question = {
    id: 'q-001',
    content: 'What is the primary programming language used in this project?',
    category: 'Product',
    categoryColor: '#3B82F6',
    categoryIcon: '⚙️',
    options: ['JavaScript', 'Python', 'TypeScript'],
    correctAnswer: 'TypeScript',
    difficulty: 'easy',
    timeLimit: 20,
    kudosReward: 10,
  };

  const userProgress = {
    questionsUsed: 12,
    questionLimit: 20,
    passesLeft: 3,
  };

  const [timeLeft] = useState(question.timeLimit);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <main className="min-h-screen bg-[#0b0f14] text-white/90 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-sm">
            ← Back to Dashboard
          </button>
          <div className="text-sm text-white/60">
            Question {userProgress.questionsUsed + 1}/{userProgress.questionLimit}
          </div>
        </div>

        {/* Timer & Progress */}
        <div className="rounded-2xl border border-white/10 bg-[#11161d] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⏱️</span>
              <span className="text-lg font-bold">{timeLeft}s</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm">
                <span className="text-white/60">Passes: </span>
                <span className="font-bold">{userProgress.passesLeft}</span>
              </div>
              <div className="flex items-center gap-1">
                {question.difficulty === 'easy' && <span className="text-green-400">🟢 Easy</span>}
                {question.difficulty === 'medium' && <span className="text-yellow-400">🟡 Medium</span>}
                {question.difficulty === 'hard' && <span className="text-red-400">🔴 Hard</span>}
              </div>
            </div>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-1000"
              style={{ width: `${(timeLeft / question.timeLimit) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="rounded-2xl border border-white/10 bg-[#11161d] p-8 shadow-2xl">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-6">
            <div 
              className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
              style={{ backgroundColor: `${question.categoryColor}20`, color: question.categoryColor }}
            >
              <span>{question.categoryIcon}</span>
              {question.category}
            </div>
            <div className="px-3 py-1 rounded-full text-sm font-medium bg-[#F59E0B]/20 text-[#F59E0B]">
              +{question.kudosReward} kudos
            </div>
          </div>

          {/* Question */}
          <h2 className="text-2xl font-semibold mb-8">{question.content}</h2>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === question.correctAnswer;
              
              let buttonClass = 'w-full p-4 text-left rounded-xl border-2 transition-all font-medium ';
              
              if (showResult) {
                if (isCorrectOption) {
                  buttonClass += 'border-green-500 bg-green-500/20 text-green-300';
                } else if (isSelected && !isCorrectOption) {
                  buttonClass += 'border-red-500 bg-red-500/20 text-red-300';
                } else {
                  buttonClass += 'border-white/10 bg-white/5 text-white/40';
                }
              } else {
                if (isSelected) {
                  buttonClass += 'border-[#6c8cff] bg-[#6c8cff]/20 text-white';
                } else {
                  buttonClass += 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10 text-white';
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswer(option)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Result Message */}
          {showResult && (
            <div className={`p-4 rounded-xl mb-6 ${
              isCorrect 
                ? 'bg-green-500/20 border border-green-500/30' 
                : 'bg-red-500/20 border border-red-500/30'
            }`}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{isCorrect ? '🎉' : '❌'}</span>
                <div>
                  <div className="font-bold text-lg">
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </div>
                  <div className="text-sm text-white/80">
                    {isCorrect 
                      ? `You earned ${question.kudosReward} kudos!` 
                      : `Correct answer: ${question.correctAnswer}`
                    }
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {!showResult ? (
            <div className="flex gap-3">
              <button
                className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 font-medium"
              >
                Pass ({userProgress.passesLeft} left)
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className="flex-1 px-6 py-3 rounded-lg bg-[#6c8cff] hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed font-medium"
              >
                Submit Answer
              </button>
            </div>
          ) : (
            <button
              onClick={() => window.location.reload()}
              className="w-full px-6 py-3 rounded-lg bg-[#6c8cff] hover:opacity-90 font-medium"
            >
              Next Question →
            </button>
          )}
        </div>

        {/* Stats Footer */}
        <div className="flex items-center justify-center gap-6 text-sm text-white/60">
          <div>🔥 5 correct streak</div>
          <div>•</div>
          <div>📊 85% accuracy</div>
          <div>•</div>
          <div>⭐ 300 total kudos</div>
        </div>
      </div>
    </main>
  );
}
