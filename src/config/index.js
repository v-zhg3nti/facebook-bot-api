module.exports = {
  server: {
    port: process.env.PORT,
    verify_token: process.env.VERIFY_TOKEN,
  },
  facebook: {
    graph_base_url: process.env.GRAPH_BASE_URL,
    access_token: process.env.ACCESS_TOKEN,
  },
};
