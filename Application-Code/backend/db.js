const mongoose = require("mongoose");

module.exports = async () => {
  const mongoConnectionString = process.env.MONGO_CONN_STR || "mongodb://127.0.0.1:27017/todo";
  const useDbAuth = process.env.USE_DB_AUTH === "true";

  const connectionOptions = {
    serverSelectionTimeoutMS: 5000,
    autoIndex: true,
  };

  if (useDbAuth) {
    connectionOptions.user = process.env.MONGO_USERNAME;
    connectionOptions.pass = process.env.MONGO_PASSWORD;
  }

  try {
    await mongoose.connect(mongoConnectionString, connectionOptions);
    console.log("Connected to database.");
  } catch (error) {
    console.error("Could not connect to database.", error);
    throw error;
  }
};
