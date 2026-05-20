const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI, {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 15000,
        socketTimeoutMS: 45000,
        family: 4,
      })
      .then((mongooseInstance) => {
        console.log("MongoDB Atlas connected");
        return mongooseInstance;
      })
      .catch((err) => {
        cached.promise = null;
        if (
          err.message?.includes("unable to verify the first certificate") ||
          err.cause?.code === "UNABLE_TO_VERIFY_LEAF_SIGNATURE"
        ) {
          throw new Error(
            "TLS certificate verification failed. On Node.js 22+, run with: node --use-system-ca server.js (already set in npm scripts)."
          );
        }
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDB;
