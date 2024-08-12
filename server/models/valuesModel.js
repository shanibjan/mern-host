import mongoose from "mongoose";

const sensorDataSchema = new mongoose.Schema({
  pH: { type: Number, required: true },
  TSS: { type: Number, required: true },
  TDS: { type: Number, required: true },
  BOD: { type: Number, required: true },
  COD: { type: Number, required: true },
  chloride: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

// const SensorData = mongoose.model('SensorData', sensorDataSchema);
export default mongoose.model('SensorData',sensorDataSchema)
// module.exports = SensorData;
