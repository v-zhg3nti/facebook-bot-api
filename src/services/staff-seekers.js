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
    const message = `სანამ შემდეგ ეტაპზე გადავალთ გვინდა ვნახოთ ხართ თუ არა ჩვენს სისტემაში დარეგისტრირებული ამისათვის გთხოვთ მოგვწეროთ ტელეფონის ნომერი მისამართი რომლითაც დარეგისტრირდით hrbaia.com
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

const userObject = {
  userName: "",
  phoneNumber: "",
  email: "",
};

function isValidPhoneNumber(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    return false;
  }
  if (phoneNumber.length < 9) {
    return false;
  }
  return /^\d{10}$/.test(phoneNumber);
}


async function handler3(sessionId, messaging) {
  const phoneNumber = messaging[0].message?.text;
  userObject.phoneNumber = phoneNumber;
  const user = await getUser({ phoneNumber });

  try {
    let message = "";
    if (user == null) {
      message = "ასეთი მომხარებელი არ მოიძებნა, თქვენი სახელი?";
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
}

async function handler4(sessionId, messaging) {
  const userName = messaging[0].message?.text;
  userObject.userName = userName;
  try {
    let message = "მოგვაწოდეთ თქვენი ელ-ფოსტა..";

    const payload = {
      messaging_type: "RESPONSE",
      recipient: {
        id: sessionId,
      },
      message: {
        text: message,
      },
    };
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
}

async function handler5(sessionId, messaging) {
  const email = messaging[0].message?.text;
  userObject.email = email;

  try {
    let message = "თქვენ წარმატებით გაიარეთ რეგისტრაცია! <3";
    const payload = {
      messaging_type: "RESPONSE",
      recipient: {
        id: sessionId,
      },
      message: {
        text: message,
      },
    };
    await createUser({ sessionId, ...userObject });
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
}

module.exports = {
  handler1,
  handler2,
  handler3,
  handler4,
  handler5,
};
