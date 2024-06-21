const http = require('http');
const fs = require('fs');
const path = require('path');
const { error } = require('console');

const server = http.createServer(async (req,res)=>{
    if(req.url === '/'){
        await serveFile('./input.html','text/html',res)   
    }
    else if(req.url === '/inputStyle.css'){
        await serveFile('./inputStyle.css','text/css',res);
    }
    else{
        console.error('Page not found',req.url)
        res.end('Page was not found');
    }
})

async function serveFile(filePath,contentType,res){
    try{
        const data = await fs.promises.readFile(filePath,'utf-8');
        res.setHeader('Content-Type',contentType)
        res.end(data);
    }
    catch(error){
        console.error('Error while reading file',error,filePath)
        res.end('Internal Server Error')
    }   
}

server.listen(5000,()=>{
    console.log('Server is listening on port 5000...')
})