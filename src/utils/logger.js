const fs = require("fs");
const path = require("path");

const logDir = path.join(__dirname, "../../logs");
const logFile = path.join(logDir, "requests.log");

// Ensure logs directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Helper to read and parse existing logs as array
const readLogs = () => {
  if (!fs.existsSync(logFile)) {
    return [];
  }

  const content = fs.readFileSync(logFile, "utf-8");
  try {
    return JSON.parse(content);
  } catch (err) {
    console.error("Failed to parse logs/requests.log as JSON array");
    return [];
  }
};

const logRequestResponse = (req, resData) => {
  const logs = readLogs();

  const logEntry = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    body: req.body,
    response: {
      status: resData.status,
      data: resData.data,
    },
  };

  logs.push(logEntry);

  fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));
};

module.exports = {
  logRequestResponse,
};
