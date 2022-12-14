import mongoose from "mongoose";
import config from "config";
import logger from '../utils/logger'

async function connect() {
  const dbUri = config.get<string>("dbUri");
  try {
    await mongoose.connect(dbUri);
    logger.info("DB connnection successfull");
  } catch (error) {
    logger.error("DB connection failed : ", error);
    process.exit(1);
    
  }
}

export default connect;
