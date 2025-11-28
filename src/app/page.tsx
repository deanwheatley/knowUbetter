import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          know<span className="text-primary-500">U</span>better
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Quiz, earn kudos, give props!
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Take Quiz</h2>
          <p className="text-gray-600 mb-4">Answer questions and earn kudos</p>
          <Link href="/quiz" className="btn-primary">
            Start Quiz
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Leaderboard</h2>
          <p className="text-gray-600 mb-4">See who's leading in kudos</p>
          <Link href="/leaderboard" className="btn-primary">
            View Rankings
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Give Props</h2>
          <p className="text-gray-600 mb-4">Send kudos to other players</p>
          <Link href="/props" className="btn-primary">
            Send Props
          </Link>
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className="inline-flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
          <div className="text-center">
            <div className="kudos-badge">1,250</div>
            <p className="text-sm text-gray-600 mt-1">Total Kudos</p>
          </div>
          <div className="text-center">
            <div className="kudos-badge bg-purple-500">340</div>
            <p className="text-sm text-gray-600 mt-1">Prop Kudos</p>
          </div>
        </div>
      </div>
    </div>
  )
}