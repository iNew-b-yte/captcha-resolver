const express = require('express');
const {ocrSpace} = require('ocr-space-api-wrapper');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});

app.post('/', (req,res)=>{
  
    let _url = req.body.url;
    let _engine = req.body.engine;
    
    const data = getRecognizedText(_url,_engine);
    data.then(text => res.send(text.ParsedResults[0].ParsedText));     
    
});



const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

async function getRecognizedText(url,engine){
    try {
      const result = await ocrSpace(url,{apiKey:process.env.OCR_SPACE_API_KEY, OCREngine:engine});
      return result;
    } catch (error) {
     console.error(error);
    }  
}