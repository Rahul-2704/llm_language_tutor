import express from "express";
import dotenv from "dotenv";
import {AssemblyAI} from "assemblyai";
import multer from "multer";
import path from "path";

dotenv.config();

const app = express();

app.use(express.json());

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname) || '.mp3' // Get original extension or default to .mp3
        const filename = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}` // Generate unique filename
        cb(null, filename)
    },
})
const upload = multer({ storage })
const client = new AssemblyAI({
    apiKey: process.env.ASSEMBLYAI_API_KEY,
})

const audioFile='https://assembly.ai/sports_injuries.mp3';
const params = {
    audio: audioFile
}

app.get("/", (req:any, res:any):any => {
   return res.json("Ping pong")
})

// endpoint for converting audio to text and then pass it to llm to generate relative response
app.post("/convert/audio",async(req:Request,res:Response):any=>{
    let transcript = await client.transcripts.transcribe(params);
    if(transcript.error){
        console.error(transcript.error)
    }
    let text=transcript.text;
    return res.json({"response":text})
})

app.listen(8000,()=>{
    console.log("Server started on port 8000");
})
