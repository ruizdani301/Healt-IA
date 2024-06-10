import OpenAI from "openai";
// import dotenv from "dotenv";
// dotenv.config();

const openai = new OpenAI({
  apiKey: "PONER ACA APIKEY DE OPENAI",
  dangerouslyAllowBrowser: true,
});

export default openai;
