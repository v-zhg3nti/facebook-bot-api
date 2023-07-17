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
  filterSessions2,
} = require("./session-services");
const { getUser2, createUsers2, updateUser2} = require('./user-services2');

const { filterJobs } = require("./jobs-service");

async function handler1(userId) {
  const textGE = "რა პოზიციაზე ეძებთ სამსახურს ?";
  const textENG = "In which position you looking for a job?";
  const textRU = "На какой должности вы ищете работу?";
  const text = `${textGE} / ${textENG} / ${textRU}`;
  const payload = createPayload(userId, text, handler1Payload);

  try {
    const request = await axiosInstance();
    const response = await request.post(
      `/me/messages?access_token=${access_token}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error sending a request to the Facebook Graph API:",
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
    const message = `სანამ შემდეგ ეტაპზე გადავალთ გვინდა ვნახოთ ხართ თუ არა ჩვენს სისტემაში დარეგისტრირებული ამისათვის გთხოვთ მოგვწეროთ ტელეფონი, რომლითაც დარეგისტრირდით hrbaia.com.
     / Before we go to the next step, we want to see if you are registered in our system. Please write us the phone number which you registered with hrbaia.com`;
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
    console.log("Error acquired in handler2:", error);
    throw error;
  }
}

async function handler3(sessionId, messaging) {
  const phoneNumber = messaging[0].message?.text;
  const message = `თქვენ არ ხართ რეგისტრირებული, გთხოვთ მოგვწეროთ თქვენი სახელი / You aren't registered yet`;
  try {
    const user = await getUser2({ PhoneNumber: phoneNumber });
    console.log("userLength#@#$$ ", user);
    if (user !== null) {
      try {
        const filterSession2 = await filterSessions2(sessionId);
        const filterJobsResult = await filterJobs(filterSession2[0].interest);
        const message = `ტქვენ უკვე რეგისტრირებული ხართ. იხილეთ ვაკანსიები / You have already been registered. See our vacancies:
        ${filterJobsResult[0].dataValues.sataurige} / ${filterJobsResult[0].dataValues.sataurien}`;
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
      } catch (error) {
        console.log("Error in handler3 - inner try:", error);
      }
    }

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
    await createUsers2({ userId: sessionId, phoneNumber: phoneNumber });
    console.log("response 33333", response.data);
    return response;
  } catch (error) {
    console.log("Error in handler3 - outer try:", error);
  }
}

async function handler4(sessionId, messaging) {
  const userName = messaging[0].message?.text;
  const message = `თქვენი მეილი / Your email:`;

  try {
    const payload = {
      messaging_type: "RESPONSE",
      recipient: {
        id: sessionId,
      },
      message: {
        text: message,
      },
    };

    console.log("sessionId ", sessionId);
    await updateUser2(sessionId, { userName: userName });
    const request = await axiosInstance();
    const response = await request.post(
      `/me/messages?access_token=${access_token}`,
      payload
    );
    console.log("response 33333", response.data);
    return response;
  } catch (error) {
    console.log("Error in handler4:", error);
  }
}

async function handler5(sessionId, messaging) {
  const userEmail = messaging[0].message?.text;

  const message = `თქვენ უკვე რეგისტრირებული ხართ. იხილეთ ვაკანსიები / You have already been registered. See our vacancies:
  
  `;

  try {
    const filterSession = await filterSessions(sessionId);
    const filterJobsResult = await filterJobs(filterSession[0].interest);
    const message = `თქვენ წარმატებით გაიარეთ რეგისტრაცია თბილისის საოჯახო პერსონალის საკადრო ცენტრი ,,ბაია”-ს გვერდზე პროფილში
    ${filterJobsResult[0].dataValues.sataurige} / ${filterJobsResult[0].dataValues.sataurien}. 
    გადადით ლინკზე და იხილეთ თქვენთვის სასურველი ვაკანსიები: 
    https://hrbaia.com/ge/applicant/vacancy/${filterJobsResult[0].dataValues.slug}`;

    const payload = {
      messaging_type: "RESPONSE",
      recipient: {
        id: sessionId,
      },
      message: {
        text: message,
      },
    };

    await updateUseer(sessionId, { email: userEmail });

    const request = await axiosInstance();
    const response = await request.post(
      `/me/messages?access_token=${access_token}`,
      payload
    );

    return response;
  } catch (error) {
    console.log("Error in handler5:", error);
  }
}

async function handlePositive() { }
async function handleNegative() { }

module.exports = {
  handler1,
  handler2,
  handler3,
  handler4,
  handler5,
};