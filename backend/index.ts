import express from "express";
import 'dotenv/config';
import fetch from 'node-fetch';


const url = 'https://api.assemblyai.com/v2/transcript';

const app = express();

app.use(express.json());

app.get("/", (req:any, res:any):any => {
   return res.json("Ping pong")
})

// endpoint for converting audio to text and then pass it to llm to generate relative response
app.post("/convert/audio",(req:any,res:any):any=>{

})

app.listen(8000,()=>{
    console.log("Server started on port 8000");
})
