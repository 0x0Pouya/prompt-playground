import { useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const sendPrompt = async () => {
    setLoading(true)
    const res = await axios.post('/api/ask', { prompt })
    setResponse(res.data.result)
    setLoading(false)
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">🧠 Prompt Playground</h1>
      <textarea
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        rows={6}
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={sendPrompt}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Submit'}
      </button>

      {response && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Response:</h2>
          <pre className="whitespace-pre-wrap">{response}</pre>
        </div>
      )}
    </div>
  )
}
