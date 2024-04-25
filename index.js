const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// midleWare
app.use(cors())
require('dotenv').config(); 
app.use(express.json());


// admon info/ admin info 
// BistroBoss
// rOrbBWsoil9f9wOU
const uri = "mongodb+srv://BistroBoss:rOrbBWsoil9f9wOU@cluster0.tpodeld.mongodb.net/?retryWrites=true&w=majority";


const { MongoClient, ServerApiVersion } = require('mongodb');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


const manueCollaction = client.db('BistroDB').collection('manue');
const reviewCollaction = client.db('BistroDB').collection('reviews');

async function run() {
  try {


    // -------------------------------
          // services related apis
    // -------------------------------

    // get manue from mongodb in useMnue hooks
    app.get('/getManues', async(req, res) => {
      const result = await manueCollaction.find().toArray();
      res.send(result)
    })
    // get reviews from mongodb for home page reviews/clint what say section
    app.get('/getReviews', async(req, res) => {
      const result = await reviewCollaction.find().toArray();
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {  }
}
run().catch(console.dir);








app.get('/', (req, res) => {
    res.send('BISTRO BOSS server is running')
})

app.listen( port, () => {
    console.log(`bistro sit in ${port} port`);
})