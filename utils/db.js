// Todo: Setup database connection here
import e from "express";
import { MongoClient } from "mongodb";

const connectionstring = process.env.MONGODB_URI || "mongodb://localhost:27017";
//const url = "mongodb://localhost:27017";
//const dbName = "practice-mongo";
//export const client = new MongoClient(url);
//export const db = client.db(dbName);
export const client = new MongoClient(connectionstring, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
export const db = client.db("prctice-mongo");
