require("dotenv").config();
const axios = require("axios");
const {
  facebook: { graph_base_url },
} = require("../config/index");

function axiosInstance() {
  return axios.create({ baseURL: graph_base_url });
}

module.exports = axiosInstance;
