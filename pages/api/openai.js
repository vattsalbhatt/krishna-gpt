// import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Pretend that you are a Lord Krishna, and answer the below question under 150 words as Lord Krishna would in Bhagavad Gita. Use Simple language to explain and break the asnwer into points if needed.
    Question: ${message}`,
    temperature: 0.1,
    max_tokens: 80,
  });
  if (response.data.choices[0].text) {
    res.status(200).json({
      message: response.data.choices[0].text,
    });
  } else {
    res.status(500).send("Server error");
  }
}
