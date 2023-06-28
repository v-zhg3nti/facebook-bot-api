require("dotenv").config("../../.env");

const axiosInstance = require("../http/index");
const {
  facebook: { access_token },
} = require("../config/index");

const { createPayload } = require("../utils/index");
const { handler1Payload } = require("../data/index");
const { updateSession, getSession } = require("./session-services");

const { getUser, createUsers } = require("./user-services");
const User = require('./userClass');

async function handler1(userId) {
  const textGE = "რა პოზიციაზე ეძებთ სამსახურს ?";
  const textENG = "In which position you looking for job?";
  const textRU = "какой должности вы ищете работу? ?";
  const text = `${textGE} / ${textENG} / ${textRU}`;

  const payload = createPayload(userId, text, handler1Payload);

  try {
    const request = await axiosInstance();
    const response = await request.post(
      `/me/messages?access_token=${access_token}`,
      payload
    );
    console.log("response data", response.data);
    console.log("payload1111111", payload);
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

    console.log("@@@@@@interest", interest);
    const message = `სანამ შემდეგ ეტაპზე გადავალთ გვინდა ვნახოთ ხართ თუ არა ჩვენს სისტემაში დარეგისტრირებული ამისათვის გთხოვთ მოგვწეროთ ტელეფონი  რომლითაც დარეგისტრირდით hrbaia.com
     / Before we go to the next step, we want to see if you are registered in our system, please write us the phone number which you registered with hrbaia.com`;
    const payload = {
      messaging_type: "RESPONSE",
      recipient: {
        id: sessionId,
      },
      message: {
        text: message,
      },
    };
    await updateSession(sessionId, { interest });
    const request = await axiosInstance();
    const response = await request.post(
      `/me/messages?access_token=${access_token}`,
      payload
    );

    console.log("response data222", response.data);
    console.log("payload2222", payload);

    return response;
  } catch (error) {
    console.log("error acquired in handler 2: ", error);
    throw error;
  }
}



const newUser=new User();

async function handler3(sessionId, messaging) {
  const phoneNumber = messaging[0].message?.text;
  const message = `თქვენ არ ხართ რეგისტრირებული, გთხოვთ მოგვწეროთ თქვენი სახელი /you aren't registrated yet`;

  try {
    const user = await getUser({ phoneNumber });
    console.log("userLength#@#$$ ", user);
    if (user !== null) {
      try {
        const message = `ტქვენ უკვე რეგისტრირებული ხართ იხილეთ ვაკანსიები/you has already been registrated see our vaccancies`;
        const payload = {
          messaging_type: "RESPONSE",
          recipient: {
            id: sessionId,
          },
          message: {
            text: message,
          },
        };
        const request = await axiosInstance();
        const response = await request.post(
          `/me/messages?access_token=${access_token}`,
          payload
        );
        console.log("response 33333", response.data);
        return response;
      } catch (error) {}
    }
    
    newUser.phoneNumber=phoneNumber;
    const payload = {
      messaging_type: "RESPONSE",
      recipient: {
        id: sessionId,
      },
      message: {
        text: message,
      },
    };

    const request = await axiosInstance();
    const response = await request.post(
      `/me/messages?access_token=${access_token}`,
      payload
    );
    console.log("response 33333", response.data);
    return response;
  } catch (error) {}

  // const nextStage = Object.keys(user).length ?
}

async function handler4(sessionId, messaging) {
  const userName = messaging[0].message?.text;
  const message = `თქვენი მეილი/your email;`;

  try {
    
    newUser.userName=userName;

    const payload = {
      messaging_type: "RESPONSE",
      recipient: {
        id: sessionId,
      },
      message: {
        text: message,
      },
    };

    const request = await axiosInstance();
    const response = await request.post(
      `/me/messages?access_token=${access_token}`,
      payload
    );
    console.log("response 33333", response.data);
    return response;
  } catch (error) {}
}

async function handler5(sessionId, messaging) {
  const userEmail = messaging[0].message?.text;
  const message = `ტქვენ უკვე რეგისტრირებული ხართ იხილეთ ვაკანსიები/you has already been registrated see our vaccancies`;

  try {
    
    newUser.email=userEmail;
    await createUsers(newUser);
    const payload = {
      messaging_type: "RESPONSE",
      recipient: {
        id: sessionId,
      },
      message: {
        text: message,
      },
    };

    const request = await axiosInstance();
    const response = await request.post(
      `/me/messages?access_token=${access_token}`,
      payload
    );
    console.log("response 33333", response.data);
    return response;
  } catch (error) {}
}

async function handlePositive() {}
async function handleNegative() {}

module.exports = {
  handler1,
  handler2,
  handler3,
  handler4,
  handler5,
};
