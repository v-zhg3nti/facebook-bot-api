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
const { isGreeting } = require('./greetingHandler');
// const { getJobs } = require("./jobs-service")

async function handler1(userId) {
  const textGE = "რა პოზიციაზე ეძებთ თანამშრომელს ?";
  const textENG = "In which position you looking for staff?";
  const text = `${textGE} / ${textENG} `;
  // const jobs = await getJobs({jobs:"jobs"})
  // console.log(jobs, "jooobobss staff seeker");
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
    const phoneNumberQuickReply = {
      content_type: "user_phone_number",
    };

    const message = {
      text: `სანამ შემდეგ ეტაპზე გადავალთ გვინდა ვნახოთ ხართ თუ არა ჩვენს სისტემაში დარეგისტრირებული ამისათვის. გთხოვთ მიუთითოთ ტელეფონის ნომერი, რომლითაც დარეგისტრირდით hrbaia.com-ზე.`,
      quick_replies: [phoneNumberQuickReply],
    };

    const payload = {
      messaging_type: "RESPONSE",
      recipient: {
        id: sessionId,
      },
      message: message,
    };

    const request = axiosInstance();
    const response = await request.post(`/me/messages?access_token=${access_token}`, payload);
    return response;
  } catch (error) {
    console.log("error acquired in handler 2: ", error);
    throw error;
  }
}


const attachmentUrl = 'https://macra.mw/storage/2021/05/Job-vacancy.jpg';
const userObject = {
  saxeli: "",
  teleponi: "",
  email: "",
  raioni: "",
  grapiki: "",
  pozicia: "",
  moqalaqeoba: "",
  anazgaureba: "",
  asaki: "",
  ganatleba: "",
  movaleobebi: "",
  sachiroeba: "",
  damatebiti: ""
};

async function handler3(sessionId, messaging) {
  const teleponi = messaging[0].message?.text;
  userObject.teleponi = teleponi;
  const user = await getUser({ teleponi: teleponi });

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


    // Set persistent menu
    const persistentMenuPayload = {
      messaging_type: "RESPONSE",
      recipient: {
        id: sessionId,
      },
      message: {
        attachment: {
          type: "template",
          payload: {
            template_type: "button",
            text: "საკონტაქტო ინფორმაცია",
            buttons: [
              {
                type: "postback",
                title: "ტელეფონი",
                payload: "OPTION_1",
              },
              {
                type: "postback",
                title: "მისამართი",
                payload: "OPTION_2",
              },
            ],
          },
        },
      },
    };


    // Send both the regular message and the persistent menu
    const request = axiosInstance();
    await request.post(`/me/messages?access_token=${access_token}`, payload);
    const response = await request.post(
      `/me/messages?access_token=${access_token}`,
      persistentMenuPayload
    );
    return response;
  } catch (error) {
    console.log("error acquired in handler 3: ", error);
    throw error;
  }
}

async function handler4(sessionId, messaging) {
  const saxeli = messaging[0].message?.text;
  userObject.saxeli = saxeli;

  try {
    const message = "რა ლოკაციაზე ეძებთ პერსონალს?";
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

async function handler5(sessionId, messaging) {
  const grapiki = messaging[0].message?.text;
  userObject.grapiki = grapiki;

  try {
    const message = "გთხოვთ მოგვწეროთ რა სამუშაო გრაფიკზე ეძებთ პერსონალს? (მაგალითისთვის: 9 საათიანი გრაფიკი, სადღეღამისო, დღის, ღამის.)";
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

async function handler6(sessionId, messaging) {
  const movaleobebi = messaging[0].message?.text;
  userObject.movaleobebi = movaleobebi;

  try {
    const message = "რა მოვალეობების შესრულება მოუწევს პერსონალს აღნიშნულ ვაკანსიაზე?";
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

async function handler7(sessionId, messaging) {
  const gamocdileba = messaging[0].message?.text;
  userObject.gamocdileba = gamocdileba;

  try {
    const message = "გვინდა ვიცოდეთ რომელ ენოვან პერსონალს ეძებთ? (მაგალითისთვის: ქართული, ინგლისური, რუსული, თურქული)";
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

async function handler8(sessionId, messaging) {
  const sachiroeba = messaging[0].message?.text;
  userObject.sachiroeba = sachiroeba;

  try {
    const message = "რა ვადებში ეძებთ პერსონალს? (რიცხვი, დღე)";
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

async function handler9(sessionId, messaging) {
  const damatebiti = messaging[0].message?.text;
  userObject.damatebiti = damatebiti;

  try {
    const message = "გვაინტერესებს რა ასაკის პერსონალს ეძებთ? (მაგალითისთვის: 18 წლიდან - 26 წლამდე, 26 წლიდან - 35 წლამდე და ა.შ )";
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

async function handler10(sessionId, messaging) {
  const asaki = messaging[0].message?.text;
  userObject.asaki = asaki;  // setting 'erovneba' to the user's response
  try {
    let message = "მოგვაწოდეთ თქვენი ელ-ფოსტა...";
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
    console.log("error acquired in handler 5: ", error);
    throw error;
  }
}

async function handler11(sessionId, messaging) {
  const email = messaging[0].message?.text;
  userObject.email = email;
  try {
    let message = "თქვენ რეზიუმე მიღებულია, თქვენ წარმატებით გაიარეთ რეგისტრაცია! მადლობთ რომ სარგებლობთ ჩვენი სერვისით 💌 ";
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
    // await updateUser(555112233, { email });
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

async function handler12(sessionId) {
  try {
    const payload = {
      messaging_type: "RESPONSE",
      recipient: {
        id: sessionId,
      },
      message: {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [{
              title: "გსურთ იხილოთ აქტიური ვაკანსიები?",
              subtitle: "Tap a button to answer.",
              image_url: attachmentUrl,
              buttons: [
                {
                  type: "postback",
                  title: "კი",
                  payload: "yes",
                },
                {
                  type: "postback",
                  title: "არა",
                  payload: "no",
                }
              ]
            }]
          }
        }
      }
    };

    const request = axiosInstance();
    const response = await request.post(
      `/me/messages?access_token=${access_token}`,
      payload
    );
    return response;
  } catch (error) {
    console.log("error acquired in handler 12: ", error);
    throw error;
  }
}

async function handler13(sessionId, messaging) {
  const email = messaging[0].message?.text;
  userObject.email = email;
  try {
    let message = "თქვენ უკვე რეგისტრირებული ხართ. იხილეთ ვაკანსიები / you are already registered, see the vacancies";
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
    // await updateUser(555112233, { email });
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
  handler6,
  handler7,
  handler8,
  handler9,
  handler10,
  handler11,
  handler12,
  handler13,
};
