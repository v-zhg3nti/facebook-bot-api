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

const { getUser2, createUsers2, updateUseer2 } = require("./user-services2");
const { filterJobs } = require("./jobs-service");
const { filterDelivery } = require("./delivery-services");
const attachmentUrl = "https://macra.mw/storage/2021/05/Job-vacancy.jpg";
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
    const request = await axiosInstance();
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
  const message = `თქვენ არ ხართ რეგისტრირებული, გთხოვთ მოგვწეროთ თქვენი სახელი /you aren't registrated yet`;

  try {
    const user = await getUser2({ phoneNumber });
    if (user !== null) {
      try {
        const fltersession = await filterSessions({ sessionId: sessionId });
        const filterjobs = await filterJobs(fltersession.interest);

        const message = `თქვენ უკვე რეგისტრირებული ხართ თბილისის საოჯახო პერსონალის საკადრო ცენტრ 
        ,,ბაია”-ს გვერდზე პროფილში ${filterjobs[0].dataValues.sataurige}/ ${filterjobs[0].dataValues.sataurien}.
      `;

        const payload = {
          messaging_type: "RESPONSE",
          recipient: {
            id: sessionId,
          },
          message: {
            text: message,
          },
        };

        const payloadxx = {
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

        const request = await axiosInstance();
        await request.post(
          `/me/messages?access_token=${access_token}`,
          payload
        );
        const response = await request.post(
          `/me/messages?access_token=${access_token}`,
          payloadxx
        );

        return response;
      } catch (error) {}
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

    return response;
  } catch (error) {}
}

async function handler4(sessionId, messaging) {
  const userName = messaging[0].message?.text;
  const message = `თქვენი მეილი/your email;`;
  const answer = messaging[0]?.postback?.payload;

  try {
    if (answer === "yes" && answer !== undefined) {
      const fltersession = await filterSessions({ sessionId: sessionId });

      const filterjobs = await filterJobs(fltersession.interest);

      const message = `თქვენ წარმატებით გაიარეთ რეგისტრაცია თბილისის საოჯახო პერსონალის საკადრო ცენტრ 
        ,,ბაია”-ს გვერდზე პროფილში ${filterjobs[0].dataValues.sataurige}/ ${filterjobs[0].dataValues.sataurien}.
      `;

      const payload = {
        messaging_type: "RESPONSE",
        recipient: {
          id: sessionId,
        },
        message: {
          text: message,
        },
      };

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
                    url: `https://hrbaia.com/ge/applicant/vacancy/${filterjobs[0].dataValues.slug}`,
                    webview_height_ratio: "tall",
                  },
                  buttons: [
                    {
                      type: "web_url",
                      url: `https://hrbaia.com/ge/applicant/vacancy/${filterjobs[0].dataValues.slug}`,
                      title: "View Website",
                    },
                  ],
                },
              ],
            },
          },
        },
      };

      const request = await axiosInstance();
      await deleteSession(sessionId);

      await request.post(`/me/messages?access_token=${access_token}`, payload);

      const response = await request.post(
        `/me/messages?access_token=${access_token}`,
        payloadxxxxx
      );

      return response;
    } else if (answer === "no" && answer !== undefined) {
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

      await deleteSession(sessionId);

      const request = await axiosInstance();

      const response = await request.post(
        `/me/messages?access_token=${access_token}`,
        payload
      );

      return response;
    } else {
      const payload = {
        messaging_type: "RESPONSE",
        recipient: {
          id: sessionId,
        },
        message: {
          text: message,
        },
      };

      await updateUseer2(sessionId, { userName: userName });
      const request = await axiosInstance();
      const response = await request.post(
        `/me/messages?access_token=${access_token}`,
        payload
      );

      return response;
    }
  } catch (error) {}
}

async function handler5(sessionId, messaging) {
  const userEmail = messaging[0].message?.text;
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

    await updateUseer2(sessionId, { email: userEmail });

    const request = await axiosInstance();
    const response = await request.post(
      `/me/messages?access_token=${access_token}`,
      payload
    );

    return response;
  } catch (error) {}
}

async function handler6(sessionId, messaging) {
  const answer = messaging[0]?.postback?.payload;

  try {
    if (answer === "yes") {
      const fltersession = await filterSessions({ sessionId: sessionId });

      const filterjobs = await filterJobs(fltersession.interest);

      const message = `თქვენ წარმატებით გაიარეთ რეგისტრაცია თბილისის საოჯახო პერსონალის საკადრო ცენტრ 
        ,,ბაია”-ს გვერდზე პროფილში ${filterjobs[0].dataValues.sataurige}/ ${filterjobs[0].dataValues.sataurien}.
      `;

      const payload = {
        messaging_type: "RESPONSE",
        recipient: {
          id: sessionId,
        },
        message: {
          text: message,
        },
      };

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
                    url: `https://hrbaia.com/ge/applicant/vacancy/${filterjobs[0].dataValues.slug}`,
                    webview_height_ratio: "tall",
                  },
                  buttons: [
                    {
                      type: "web_url",
                      url: `https://hrbaia.com/ge/applicant/vacancy/${filterjobs[0].dataValues.slug}`,
                      title: "View Website",
                    },
                  ],
                },
              ],
            },
          },
        },
      };

      const request = await axiosInstance();
      await deleteSession(sessionId);

      await request.post(`/me/messages?access_token=${access_token}`, payload);

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
  handler6,
};
