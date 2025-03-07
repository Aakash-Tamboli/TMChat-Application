// const mongoose = require("mongoose");

import mongoose from "mongoose";

async function configureDB(server) {
  try {
    const CONNECTION_URL = process.env.CONNECTION_URL;
    const PORT = process.env.PORT;
    const connection = await mongoose.connect(CONNECTION_URL);
    server.listen(PORT, () => {
      console.log(`Chat Application server is listening at ${PORT}...`);
    });
  } catch (error) {
    console.error("Unable to establish connection with DB, Reason: ");
    console.error(error.message);
    process.exit(0);
  }
}

// module.exports = configureDB;
export default configureDB;
