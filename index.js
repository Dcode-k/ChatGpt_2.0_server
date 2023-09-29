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


app.get('/models',async(req,res)=>{
const response = await openai.models.list();
res.json({
  models:response.data
})
})

app.post('/',async(req,res)=>{
  const {message,model}=req.body;
  console.log(model)
    const response = await openai.completions.create({
        model:`${model}`,
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

