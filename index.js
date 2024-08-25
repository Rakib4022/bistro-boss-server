
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000 ;


app.use(cors())
app.use(express.json())










const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = `mongodb+srv://rakib18042000:3Knt315sUpw7bjW4@cluster0.vpjpd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri = "mongodb+srv://rakib18042000:3Knt315sUpw7bjW4@cluster0.vpjpd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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

    const menusCollection = client.db("bistroboss").collection("menus");
    const reviewsCollection = client.db("bistroboss").collection("reviews");
    const cartsCollection = client.db("bistroboss").collection("carts");

    app.get('/menus', async (req, res) => {
      const result = await menusCollection.find().toArray();
      res.send(result);
    })
    app.get('/reviews', async (req, res) => {
      const result = await reviewsCollection.find().toArray();
      res.send(result);
    })
    app.get('/carts', async (req, res) => {
      const catrItem = req.body;
      const result = await cartsCollection.insertOne(catrItem);
      res.send(result);
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
  res.send('Bistro boss is running ..')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})