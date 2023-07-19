require("dotenv").config("../../.env");

const axiosInstance = require("../http/index");
const {
  facebook: { access_token },
} = require("../config/index");

const { createPayload } = require("../utils/index");
const { handler1Payload } = require("../data/index");
const {
  updateSession,
  getSession,
  filterSessions,
  deleteSession,
} = require("./session-services");


;
async function handler1(sessionId) {
  const textGE = "რა გაინტერესებთ?";
  const textENG = "In which position you looking for job?";
  const textRU = "какой должности вы ищете работу? ?";
  const text = `${textGE} / ${textENG} / ${textRU}`;

  
  const payload = {
    messaging_type: "RESPONSE",
    recipient: {
      id: sessionId,
    },
    message: {
      text: text,
    },
  };

  try {
    const request = await axiosInstance();
    const response = await request.post(
      `/me/messages?access_token=${access_token}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error sending request to Facebook Graph API:",
      error.message
    );
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
    throw error;
  }
}


module.exports = {
    handler1,
   
  };