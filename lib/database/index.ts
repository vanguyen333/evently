import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

//initialize a cached variable with attempt to retrieve a property from
// the global object in node.js
//(global as many): provides a space to store Global variables
//the cached variable is intent to hold a cached connection to our database

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  //if cached is connected in case our connection runs for the first time
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");
  // either connect to an already existing cache connection or create a new connection
  //reason to use this function: in serveless functions where our code
  //could be executed multiple times but not in a single continous server process,
  //we need to manage database connections efficiently cuz each invocation of a serverless function could
  //result in a new connection to the database which could exhaust database
  //resouces
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "evently",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
//server actions
// Path: server.ts
//each server action will have to call connect database over again and again
//and if we weren't caching it, it would just be making new connections
// to the database, but by caching our connection or the promise of a connection
// all the subsequent invocations can reuse the existing connection if it's still open
// or just try to create a new one
