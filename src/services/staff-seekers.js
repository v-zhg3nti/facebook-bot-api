require("dotenv").config("../../.env");
const axiosInstance = require("../http/index");
const {
  facebook: { access_token },
} = require("../config/index");

const { createPayload } = require("../utils/index");
const { handler1Payload } = require("../data/index");
const {
  updateSession,
  deleteSession,
  filterSessions,
} = require("./session-services");
const { getUser, createUsers, updateUseer } = require("./user-services");
const { createUser, updateUser } = require("./session-user");
const { isGreeting } = require("./greetingHandler");
const { filterJobs } = require("./jobs-service");
// const { getJobs } = require("./jobs-service")

async function handler1(userId) {
  const textGE = "რა პოზიციაზე ეძებთ თანამშრომელს ?";
  const textENG = "In which position you looking for staff?";
  const text = `${textGE} / ${textENG} `;

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
  const interest = messaging[0]?.message?.quick_reply?.payload;
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

const attachmentUrl = "https://macra.mw/storage/2021/05/Job-vacancy.jpg";

async function handler3(sessionId, messaging) {
  const teleponi = messaging[0].message?.text;

  const user = await getUser({ teleponi: teleponi });

  try {
    let message = "";
    if (user == null) {
      const filterSess = await filterSessions({ sessionId: sessionId });
      message = "ასეთი მომხარებელი არ მოიძებნა, თქვენი სახელი?";
      await createUsers({
        userId: sessionId,
        pozicia: filterSess.interest,
        teleponi: teleponi,
      });
    } else {
      message = "თქვენი მონაცემები ნაპოვნია, ჩვენ მალე დაგიკავშირდებით";
      await deleteSession(sessionId);
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

    // Send both the regular message and the persistent menu
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
  const saxeli = messaging[0].message?.text;

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
    await updateUseer(sessionId, { saxeli: saxeli });
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
  const lokacia = messaging[0].message?.text;

  try {
    const message =
      "გთხოვთ მოგვწეროთ რა სამუშაო გრაფიკზე ეძებთ პერსონალს? (მაგალითისთვის: 9 საათიანი გრაფიკი, სადღეღამისო, დღის, ღამის.)";
    const payload = {
      messaging_type: "RESPONSE",
      recipient: {
        id: sessionId,
      },
      message: {
        text: message,
      },
    };
    await updateUseer(sessionId, { raioni: lokacia });
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
  const grapiki = messaging[0].message?.text;

  try {
    const message =
      "რა მოვალეობების შესრულება მოუწევს პერსონალს აღნიშნულ ვაკანსიაზე?";
    const payload = {
      messaging_type: "RESPONSE",
      recipient: {
        id: sessionId,
      },
      message: {
        text: message,
      },
    };
    await updateUseer(sessionId, { grapiki: grapiki });
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
  const movaleobebi = messaging[0].message?.text;

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
    await updateUseer(sessionId, { movaleobebi: movaleobebi });
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
  const vada = messaging[0].message?.text;

  try {
    const message =
      "გვაინტერესებს რა ასაკის პერსონალს ეძებთ? (მაგალითისთვის: 18 წლიდან - 26 წლამდე, 26 წლიდან - 35 წლამდე და ა.შ )";
    const payload = {
      messaging_type: "RESPONSE",
      recipient: {
        id: sessionId,
      },
      message: {
        text: message,
      },
    };
    await updateUseer(sessionId, { sachiroeba: vada });
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
  const asaki = messaging[0].message?.text;

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
    await updateUseer(sessionId, { asaki: asaki });
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

async function handler10(sessionId, messaging) {
  const email = messaging[0].message?.text;
  try {
    let message =
      "თქვენ რეზიუმე მიღებულია, თქვენ წარმატებით გაიარეთ რეგისტრაცია! მადლობთ რომ სარგებლობთ ჩვენი სერვისით 💌 ";
    const payload = {
      messaging_type: "RESPONSE",
      recipient: {
        id: sessionId,
      },
      message: {
        text: message,
      },
    };

    const payloadxxx = {
      messaging_type: "RESPONSE",
      recipient: {
        id: sessionId,
      },
      message: {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [
              {
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
                  },
                ],
              },
            ],
          },
        },
      },
    };

    await updateUseer(sessionId, { email: email });
    const request = axiosInstance();
    await request.post(`/me/messages?access_token=${access_token}`, payload);
    const response = await request.post(
      `/me/messages?access_token=${access_token}`,
      payloadxxx
    );
    return response;
  } catch (error) {
    console.log("error acquired in handler 4: ", error);
    throw error;
  }
}

async function handler11(sessionId, messaging) {
  const answer = messaging[0]?.postback?.payload;
  try {
    if (answer === "yes") {
      const fltersession = await filterSessions({ sessionId: sessionId });
      const filterjobs = await filterJobs(fltersession.interest);
      const payloadxxxxx = {
        messaging_type: "RESPONSE",
        recipient: {
          id: sessionId,
        },
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: "generic",
              elements: [
                {
                  title: "vacancies",
                  image_url:
                    "https://images-ext-2.discordapp.net/external/K060jWOOgb5odhYIW0AvwF87mGj09a6mUpqczSmgf_E/https/i.ytimg.com/vi/Cz1FPlsPNBo/maxresdefault.jpg?width=993&height=559",
                  subtitle: "We have the right hat for everyone.",
                  default_action: {
                    type: "web_url",
                    url: `https://hrbaia.com/ge/pages/jobs/${filterjobs[0].dataValues.slug}`,
                    webview_height_ratio: "tall",
                  },
                  buttons: [
                    {
                      type: "web_url",
                      url: `https://hrbaia.com/ge/pages/jobs/${filterjobs[0].dataValues.slug}`,
                      title: "View Website",
                    },
                  ],
                },
              ],
            },
          },
        },
      };

      await deleteSession(sessionId);
      const request = await axiosInstance();

      const response = await request.post(
        `/me/messages?access_token=${access_token}`,
        payloadxxxxx
      );

      return response;
    } else {
      const message = `კარგით გისურვებთ წარმატებებს `;

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
      await deleteSession(sessionId);

      const response = await request.post(
        `/me/messages?access_token=${access_token}`,
        payload
      );

      return response;
    }
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
};
