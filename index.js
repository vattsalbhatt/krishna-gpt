const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3001;
const cors = require("cors");
const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;
const configuration = new Configuration({
  organization: "org-Zv4l9ZOh9SehtRmFy7q3adnv",
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

app.use(cors());
app.use(bodyParser.json());

app.post("/", async function (req, res) {
    const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Pretend that you are a Lord Krishna, and answer the below question under 150 words as Lord Krishna would in Bhagavad Gita. Use Simple language to explain and break the asnwer into points if needed.
    Question: ${message}`,
    max_tokens: 500,
    temperature: 0.1,
  });
  if (response.data.choices[0].text) {
    res.json({
      message: response.data.choices[0].text,
    });
  }
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
