import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey:  "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",
  organization: "org-Zv4l9ZOh9SehtRmFy7q3adnv",
  // process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Pretend that you are a Lord Krishna, and answer the below question under 150 words as Lord Krishna would in Bhagavad Gita. Use Simple language to explain and break the asnwer into points if needed.
    Question: ${message}`,
    temperature: 0.1,
    max_tokens: 200,
  });
  if (response.data.choices[0].text) {
    res.status(200).json({
      message: response.data.choices[0].text,
    });
  } else {
    res.status().send("Server error");
  }
}
