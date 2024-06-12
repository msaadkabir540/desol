import mongoose, { Schema } from "mongoose";

const vehicleSchema = new Schema(
  {
    city: String,
    phone: String,
    price: String,
    modal: String,
    imageUrls: [String],
  },
  { timestamps: true }
);

const Vehicle = mongoose.models.Vehicle || mongoose.model("vehicle", vehicleSchema);

export default Vehicle;
