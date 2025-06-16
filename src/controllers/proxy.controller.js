const { BASE_URL } = require("../config/server.config");
const axios = require("axios");
const { logRequestResponse } = require("../utils/logger");

const proxyApiCall = async (req, res) => {
  const targetUrl = `${BASE_URL}${req.originalUrl}`;

  try {
    const response = await axios({
      method: req.method,
      url: targetUrl,
      headers: {
        ...req.headers,
        host: new URL(BASE_URL).host,
      },
      data: req.body,
    });

    logRequestResponse(req, { status: response.status, data: response.data });
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error("Error forwarding request:", error.message);
    if (error.response) {
      logRequestResponse(req, {
        status: error.response.status,
        data: error.response.data,
      });
      res.status(error.response.status).send(error.response.data);
    } else {
      logRequestResponse(req, {
        status: 500,
        data: { error: "Internal Server Error" },
      });
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
};

module.exports = { proxyApiCall };
