import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    //send back a response

    // const { title, image, address, description } = data;
    //store the data in a database...!
    const client = await MongoClient.connect(
      "mongodb+srv://hsanshine:WTBWk7qXMDYK414f@cluster0.rfedb.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log("result", result);
    //check errors when some stuff failes
    client.close();

    res.status(201).json({ message: "Meetup inserted" });
  }
}

export default handler;
