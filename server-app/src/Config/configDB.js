const mongoose = require("mongoose");

async function configureDB(app) {
  try {
    const CONNECTION_URL = process.env.CONNECTION_URL;
    const PORT = process.env.PORT;
    const connection = await mongoose.connect(CONNECTION_URL);
    app.listen(PORT, () => {
      console.log(`Chat Application server is listening at ${PORT}...`);
    });
  } catch (error) {
    console.error("Unable to establish connection with DB, Reason: ");
    console.error(error.message);
    process.exit(0);
  }
}

module.exports = configureDB;
