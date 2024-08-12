import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import valuesModel from "./models/valuesModel.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
connectDB();
app.use(cors());
const corsOptions = {
  origin: 'http://localhost:3000', // replace with your frontend's origin
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);

app.post("/api/v1/sensors/data", async (req, res) => {
  try {
    const { pH, TSS, TDS, BOD, COD, chloride } = req.body;

    const newData = new valuesModel({
      pH,
      TSS,
      TDS,
      BOD,
      COD,
      chloride,
    });

    const savedData = await newData.save();

    res.status(201).json({
      success: true,
      data: savedData,
      message: "success",
    });
  } catch (error) {
    console.error("Error saving sensor data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save sensor data",
    });
  }
});

const generateRandomData = () => ({
  pH: parseFloat((Math.random() * (14 - 0) + 0).toFixed(2)),
  TSS: parseFloat((Math.random() * 100).toFixed(2)),
  TDS: parseFloat((Math.random() * 500).toFixed(2)),
  BOD: parseFloat((Math.random() * 200).toFixed(2)),
  COD: parseFloat((Math.random() * 500).toFixed(2)),
  chloride: parseFloat((Math.random() * 250).toFixed(2)),
});

app.get("/api/v1/sensors/simulate", async (req, res) => {
  try {
    const simulatedData = new valuesModel(generateRandomData());

    const savedData = await simulatedData.save();
    console.log(savedData);

    res.status(201).json({
      success: true,
      data: savedData,
    });
  } catch (error) {
    console.error("Error saving simulated data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save simulated data",
    });
  }
});

// GET endpoint to fetch historical data for a specific sensor type
app.get("api/v1/sensors/simulate:type", async (req, res) => {
  try {
    const sensorType = req.params.type;
    const historicalData = await SensorData.find(
      {},
      { _id: 0, [sensorType]: 1, timestamp: 1 }
    ).sort({ timestamp: 1 });
    const formattedData = historicalData.map((entry) => ({
      value: entry[sensorType],
      timestamp: entry.timestamp,
    }));
    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching historical data", error });
  }
});

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//   app.get('/api/v1/sensors/simulate', async (req, res) => {
//     try {
//       // Fetch all sensor data from the MongoDB collection
//       const data = await savedData.find();

//       // Send the retrieved data as a JSON response
//       res.status(200).json({
//         success: true,
//         data: data,
//       });
//     } catch (error) {
//       console.error('Error retrieving sensor data:', error);
//       res.status(500).json({
//         success: false,
//         message: 'Failed to retrieve sensor data',
//       });
//     }
//   });

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Running ${process.env.DEV} on ${PORT}`);
});
