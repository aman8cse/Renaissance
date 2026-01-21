import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}`
    )
    // this is unnessary filling log size 
    console.log(
      `\n MongoDB connected !! DB Host:${connectionInstance.connection.host} on port ${process.env.PORT}`
    );
  } catch (error) {
    console.error("mongoDb connnection failed :", error);
    process.exit(1);
  }
};

export default connectDB;