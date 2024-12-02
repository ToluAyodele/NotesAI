const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/chatbot', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are an AI assistant helping users write notes.' },
          { role: 'user', content: message },
        ],
        max_tokens: 100,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Error with OpenAI API:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch response from OpenAI API' });
  }
});

module.exports = router;
