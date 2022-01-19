import express from "express";
import { MongoClient } from "mongodb";
const app = express();
app.use(express.json());
const PORT = 5000;




async function createConnection(){
const MONGO_URL="mongodb://localhost";
const client= new MongoClient(MONGO_URL);
await client.connect();
console.log("MongoDb connected");
return client;


}
const client=await createConnection();


app.get("/files",async(request,response)=>{
    const files= await client
    .db("filesystem")
    .collection("files1")
    .find({})
    .toArray();
  
response.send(files);
})


app.post("/files",async(request,response)=>{
    const data=request.body;
    const result=await client
    .db("filesystem")
    .collection("files1")
    .insertMany(data);
    response.send(result);
})



app.get("/", (request, response) => {
  response.send("Welcomd to Nodejs file system");
});

app.listen(PORT, () => console.log("App is started in", PORT));
