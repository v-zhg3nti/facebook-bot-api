require("dotenv").config("../../.env");

const axiosInstance = require("../http/index");
const {
  facebook: { access_token },
} = require("../config/index");

const { createPayload } = require("../utils/index");
const { handler1Payload } = require("../data/index");
const { updateSession, getSession } = require("./session-services");
const { getUser } = require("./user-services");

async function handler1(userId) {
  const textGE = "რა პოზიციაზე ეძებთ სამსახურს ?";
  const textENG = "In which position you looking for job?";
  const textRU = "какой должности вы ищете работу? ?";
  const text = `${textGE} / ${textENG} / ${textRU}`;
  const payload = createPayload(userId, text, handler1Payload);

  try {
    const request = axiosInstance();
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

async function handler2(sessionId, messaging) {
  try {
    const interest = messaging[0]?.message?.quick_reply?.payload;
    // console.log("@@@@@userId", sessionId);
    console.log("@@@@@@interest", interest);
    const message = `სანამ შემდეგ ეტაპზე გადავალთ გვინდა ვნახოთ ხართ თუ არა ჩვენს სისტემაში დარეგისტრირებული ამისათვის გთხოვთ მოგვწეროთ ემაილ მისამართი რომლითაც დარეგისტრირდით hrbaia.com
     / Before we go to the next step, we want to see if you are registered in our system, please write us the email address you registered with hrbaia.com`;
    const payload = {
      messaging_type: "RESPONSE",
      recipient: {
        id: sessionId,
      },
      message: {
        text: message,
      },
    };
    console.log("@@@@@sessinId", sessionId);
    await updateSession(sessionId, { interest });
    const request = axiosInstance();
    const response = await request.post(
      `/me/messages?access_token=${access_token}`,
      payload
    );
    return response;
  } catch (error) {
    console.log("error acquired in handler 2: ", error);
    throw error;
  }
}

async function handler3(sessionId, messaging) {
  const phoneNumber = messaging[0].message?.text;

  const user = await getUser({ phoneNumber });

  // const nextStage = Object.keys(user).length ?
}

async function handlePositive() {}
async function handleNegative() {}

module.exports = {
  handler1,
  handler2,
  handler3,
};
