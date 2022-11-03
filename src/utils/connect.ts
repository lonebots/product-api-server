import mongoose from "mongoose";
import config from "config";

async function connect() {
  const dbUri = config.get<string>("dbUri");
  try {
    await mongoose.connect(dbUri);
    console.log("DB connnection successfull");
  } catch (error) {
    console.log("DB connection failed : ", error);
    process.exit(1);
  }
}

export default connect;
