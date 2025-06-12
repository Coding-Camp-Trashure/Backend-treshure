const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRouter");
const scanRoutes = require("./routes/scanRouter");
const saldoRoutes = require("./routes/saldoRouter");
const historyRoutes = require("./routes/historyRouter");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(
  cors({
    origin: "https://frontend-production-2db3.up.railway.app",
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/scan", scanRoutes);
app.use("/saldo", saldoRoutes);
app.use("/history", historyRoutes);

app.get("/", (req, res) => {
  res.send("Trashure Backend API");
});

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
