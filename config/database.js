const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error);
    console.log("DB Connection Failed");
    process.exit(1);
  }
};
module.exports = dbConnect;
