require("dotenv").config("../../.env");

const axiosInstance = require("../http/index");
const {
  facebook: { access_token },
} = require("../config/index");

const { createPayload } = require("../utils/index");
const { handler2Payload } = require("../data/index");
const { updateSession, getSession } = require("./session-services");
const { getUser } = require("./user-services");
const { createUser, updateUser } = require("./session-user");

async function handler1(userId) {
  const textGE = "რა პოზიციაზე ეძებთ თანამშრომელს ?";
  const textENG = "In which position you looking for staff?";
  const text = `${textGE} / ${textENG} `;
  const payload = createPayload(userId, text, handler2Payload);

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
  console.log(sessionId, messaging);
  try {
    const interest = messaging[0]?.message?.quick_reply?.payload;
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

  try {
    let message = "";

    if (user == null) {
      message = "ასეთი მომხარებელი არ მოიძებნა, თქვენი სახელი?";
      const userSesion = {
        userName: null,
        phoneNumber: phoneNumber,
        emailAddress: null,
      };

      await createUser({ sessionId, ...userSesion });
    } else {
      message = "თქვენი მონაცემები ნაპოვნია, ჩვენ მალე დაგიკავშირდებით";
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
    await updateSession(sessionId, { userName: "alex" });
    const request = axiosInstance();
    const response = await request.post(
      `/me/messages?access_token=${access_token}`,
      payload
    );
    return response;
  } catch (error) {
    console.log("error acquired in handler 3: ", error);
    throw error;
  }

  // const nextStage = Object.keys(user).length ?
}
//adding username to sql

async function handler4(sessionId, messaging) {
  const userName = messaging[0].message?.text;
  console.log(userName, "es aris username");

  const user = await getUser({ userName });
  console.log(user);
  try {
    let message = "მოგვაწოდეთ თქვენი ელ-ფოსტა..";
    // const userSesion = {
    //   userName: userName,
    //   // phoneNumber: phoneNumber,
    //   emailAddress: null,
    // };

    const payload = {
      messaging_type: "RESPONSE",
      recipient: {
        id: sessionId,
      },
      message: {
        text: message,
      },
    };
    await updateUser(555112233, { userName });
    const request = axiosInstance();
    const response = await request.post(
      `/me/messages?access_token=${access_token}`,
      payload
    );
    return response;
  } catch (error) {
    console.log("error acquired in handler 4: ", error);
    throw error;
  }

  // const nextStage = Object.keys(user).length ?
}
async function handler5(sessionId, messaging) {
  const email = messaging[0].message?.text;
  console.log(email, "es aris username");
  // const user = await getUser({ phoneNumber });

  try {
    let message = "თქვენ წარმატებით გაიარეთ რეგისტრაცია! <3";
    // const userSesion = {
    //   userName: userName,
    //   // phoneNumber: phoneNumber,
    //   emailAddress: null,
    // };

    const payload = {
      messaging_type: "RESPONSE",
      recipient: {
        id: sessionId,
      },
      message: {
        text: message,
      },
    };
    await updateUser(555112233, { email });
    const request = axiosInstance();
    const response = await request.post(
      `/me/messages?access_token=${access_token}`,
      payload
    );
    return response;
  } catch (error) {
    console.log("error acquired in handler 4: ", error);
    throw error;
  }

  // const nextStage = Object.keys(user).length ?
}

module.exports = {
  handler1,
  handler2,
  handler3,
  handler4,
  handler5,
};
