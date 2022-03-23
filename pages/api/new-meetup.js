import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log("bdy:", req.body);

    const client = await MongoClient.connect(
      "mongodb+srv://admin-Shiyadh:Shiyadh1212@cluster0.uzrul.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne({ data });

    await client.close();

    res.status(201).json({ message: "Inserted successfully!" });
  }
}

export default handler;
