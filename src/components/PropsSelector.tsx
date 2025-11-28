'use client'

import { useState } from 'react'
import { PropBundle } from '@/types'

interface PropsSelectorProps {
  onSendProps: (bundle: PropBundle, message: string) => void
  propsRemaining: {
    prop: number
    madProp: number
    propHellYeah: number
  }
}

const PROP_BUNDLES: PropBundle[] = [
  { type: 'prop', kudosAmount: 10, cost: 1 },
  { type: 'madProp', kudosAmount: 50, cost: 1 },
  { type: 'propHellYeah', kudosAmount: 100, cost: 1 }
]

export default function PropsSelector({ onSendProps, propsRemaining }: PropsSelectorProps) {
  const [selectedBundle, setSelectedBundle] = useState<PropBundle | null>(null)
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (selectedBundle) {
      onSendProps(selectedBundle, message)
      setSelectedBundle(null)
      setMessage('')
    }
  }

  const getBundleIcon = (type: PropBundle['type']) => {
    switch (type) {
      case 'prop': return '👍'
      case 'madProp': return '🔥'
      case 'propHellYeah': return '🚀'
    }
  }

  const getBundleColor = (type: PropBundle['type']) => {
    switch (type) {
      case 'prop': return 'bg-blue-500'
      case 'madProp': return 'bg-orange-500'
      case 'propHellYeah': return 'bg-purple-500'
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Send Props</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {PROP_BUNDLES.map((bundle) => {
          const remaining = propsRemaining[bundle.type]
          const isAvailable = remaining > 0
          
          return (
            <button
              key={bundle.type}
              onClick={() => isAvailable && setSelectedBundle(bundle)}
              disabled={!isAvailable}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedBundle?.type === bundle.type
                  ? 'border-primary-500 bg-primary-50'
                  : isAvailable
                    ? 'border-gray-200 hover:border-gray-300'
                    : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="text-2xl mb-2">{getBundleIcon(bundle.type)}</div>
              <div className="font-medium capitalize">{bundle.type.replace(/([A-Z])/g, ' $1')}</div>
              <div className={`text-white text-sm px-2 py-1 rounded mt-2 ${getBundleColor(bundle.type)}`}>
                {bundle.kudosAmount} kudos
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {remaining} remaining
              </div>
            </button>
          )
        })}
      </div>

      {selectedBundle && (
        <div className="space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a message (optional)..."
            className="w-full p-3 border-2 border-gray-200 rounded-lg resize-none"
            rows={3}
          />
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Sending {selectedBundle.kudosAmount} kudos via {selectedBundle.type}
            </div>
            <button
              onClick={handleSend}
              className="btn-primary"
            >
              Send Props 🎁
            </button>
          </div>
        </div>
      )}
    </div>
  )
}