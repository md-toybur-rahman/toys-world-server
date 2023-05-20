const express = require('express');
const cors = require('cors')
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());


// toys-world
// GMlq4N9OaxQUOFPR





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z50rydu.mongodb.net/?retryWrites=true&w=majority`;

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

    const toysCollection = client.db('toys-world-DB').collection('toys');

    app.get('/toys', async(req, res) => {
      const cursor = toysCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })


    app.get('/myToys', async(req, res) => {
      let query = {};
      if(req.query?.email) {
        query = {email: req.query.email}
      }
      const result = await toysCollection.find(query).toArray();
      res.send(result);
    })


    app.get('/toys/plush', async(req, res) => {
        const query = {sub_category: "Plush"} 
        const cursor = toysCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
    });

    app.get('/toys/bath', async(req, res) => {
        const query = {sub_category: "Bath"} 
        const cursor = toysCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
    });
    
    app.get('/toys/puzzle', async(req, res) => {
        const query = {sub_category: "Puzzle"} 
        const cursor = toysCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
    });

    app.get('/toys/puppet', async(req, res) => {
        const query = {sub_category: "Puppet"} 
        const cursor = toysCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
    });

    app.post('/toys', async(req, res) => {
      const newToys = req.body;
      const result = await(toysCollection.insertOne(newToys));
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






app.get('/', (req, res) => {
    res.send('toys world is now open')
});


app.listen(port, () => {
    console.log(`toys world is running on port: ${port}`);
})