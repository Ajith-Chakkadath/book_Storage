const express = require('express')
const app = express()
const port =process.env.PORT|| 4000
const cors = require('cors')


app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('welocme')
})







const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const uri ="mongodb+srv://mean-book-store:ASD%40%23%241234zx@cluster0.blqnojj.mongodb.net/?retryWrites=true&w=majority"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //create a collection for the data base
    const bookCollections=client.db("BookInventory").collection('books')

    //Insetrt books
    app.post('/upload-book',async (req,res)=>{
        const data = req.body
        const result =await bookCollections.insertOne(data)
        res.send(result)
    })

//get the books

app.get("/all-books" , async(req,res)=>{
    const books = bookCollections.find()
    const result = await books.toArray()
    res.send(result)
})

//update a book data

app.patch('/book/:id', async(req,res)=>{
  const id = req.params.id
  const updateBookData = req.body
  const filter ={id:new ObjectId(id)}
  const option ={upsert : true}

  const updateDoc={
    $set:{
      ...updateBookData
    }
  }

  const result =bookCollections.updateOne(filter,updateDoc,option)

  res.send(result)


})

// delete a book

app.delete('/book/:id',async(req,res)=>{
  const id = req.params.id
  const filter ={id:new ObjectId(id)}
  const result=bookCollections.deleteOne(filter)
  res.send(result)
})



//flter data

app.get("/all-books",async(req,res)=>{
  let query={}
  if(req.query?.category){
    query={category:req.query.category}
  }
  const result = await bookCollections.find(query).toArray()
  res.send(result)
})


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.listen(port,()=>{
    console.log(`example app listen on port ${port}`)
})