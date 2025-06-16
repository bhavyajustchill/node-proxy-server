const express = require("express");
const cors = require("cors");
const { PORT } = require("./config/server.config");

const proxyRoutes = require("./routes/proxy.route");

const app = express();

app.use(express.json());
app.use(cors());

app.use(proxyRoutes);

// app.get("/test", async (req, res) => {
//   return res.json({ message: "Proxy Server Running Successfully!" });
// });

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
