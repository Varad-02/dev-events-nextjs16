import mongoose, { type ConnectOptions, type Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  // Fail fast during build/startup rather than throwing deep in request handlers.
  throw new Error("Missing MONGODB_URI in environment variables");
}

type MongooseCache = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

// In development, Next.js can hot-reload files and re-run module initialization.
// We cache the connection on the global object to prevent creating multiple
// connections (which can quickly exhaust MongoDB connection limits).
declare global {
  var __mongooseCache: MongooseCache | undefined;
}

const globalCache = globalThis.__mongooseCache;
const cached: MongooseCache = globalCache ?? { conn: null, promise: null };

globalThis.__mongooseCache = cached;

export async function connectToDatabase(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    // Keep options explicit and typed; avoid passing untyped/unknown values.
    const opts: ConnectOptions = {
      bufferCommands: false,
    };

      cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m).catch((err) => {
                // Clear the cached promise so the next call can retry
                    cached.promise = null;
                throw err;
              });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
