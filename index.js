import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv'
dotenv.config();
const app=express();
app.use(bodyParser.json());
app.use(cors());

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey:process.env.OPENAI_API_KEY,
});


app.post('/',async(req,res)=>{
  const {message}=req.body;
    const response = await openai.completions.create({
        model:"gpt-3.5-turbo-instruct",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
      });
      res.json({
        message:response.choices[0].text,
      })
})

app.listen(3001,function(){
    console.log("Example app is listening on port 3001");
})

