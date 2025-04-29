import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.body
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    )

    const result = response.data.choices[0].message.content
    res.status(200).json({ result })
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' })
  }
}
