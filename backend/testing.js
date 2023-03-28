const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function testing() {
  const response = await openai.createCompletion({
    model: "text-curie-001",
    prompt: "!ping",
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  console.log(response.data.choices[0].text);
}

testing();
