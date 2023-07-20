
require("dotenv").config("../../.env");

const axiosInstance = require("../http/index");
const {
  facebook: { access_token },
} = require("../config/index");

// const { createPayload } = require("../utils/index");
// const { handler1Payload } = require("../data/index");
const {
  updateSession,
  getSession,
  filterSessions,
  deleteSession,
} = require("./session-services");

async function handler1(sessionId) {
  const textGE = "რა გაინტერესებთ?";
  const textENG = "In which position you looking for a job?";
  const textRU = "Какой должности вы ищете работу?";
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

  const templatePayload = {
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
              title: "ხშირად დასმული კითხვები",
              image_url: "https://www.rovers.ge/wp-content/uploads/2022/01/Purple-Illustrated-Frequently-Asked-Questions-Instagram-Post-1024x1024.png",
              subtitle: "ვეცდებით გიპასუხოთ ყველა კითხვაზე 😊",
              buttons: [
                {
                  type: "postback",
                  title: "ჩვენი საკონტაქტო ინფორმაცია",
                  payload: "CONTACT",
                },
                {
                  type: "postback",
                  title: "პირობები დამქირავებლის",
                  payload: "PIROBEBI",
                },
                {
                  type: "postback",
                  title: "პირობები კანდიდატის",
                  payload: "PIROBEBI2",
                },
              ],
            },
          ],
        },
      },
    },
  };

  try {
    const request = await axiosInstance();
    const response = await request.post(
      `/me/messages?access_token=${access_token}`,
      templatePayload
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
  const answer = messaging[0]?.postback?.payload;
  try {
    let session = await getSession(sessionId);

    if (answer === "CONTACT") {
      const contactInfo = `Contact Information:
      🌹 1) არჩილ ჯორჯაძის ქ.№5 (ქაშუეთის ეკლესიის გვერდით)
         https://goo.gl/maps/VnYrzPZeATt
         T: {{511110225}}
      
      🌺 2) ვაჟა ფშაველას გამზ N76ბ (მ/სადგურ ,,ვაჟა ფშაველა"-ს გვერდით, მარჯვენა ამოსასვლელთან მდებარე კორპუსი)
         https://goo.gl/maps/fZjatKHFqWQ2
         T: {{599613090}}
      
      🌲 3) ილია ჭავჭავაძის გამზ N2 (ვაკე - თ.ს.უ-ს I-კორპუსის წინ)
         https://goo.gl/maps/VnCSaWhpwNPoVXcJ6
         T: {{599191507}}
      
      სადაც თქვენთვის უფრო ხელსაყრელი იქნება. სამუშაო საათებია: ორშაბათიდან შაბათის ჩათვლით დილის 10:00-დან საღამოს 18:00-მდე, ხოლო თუ მხოლოდ კვირა დღეს გცალიათ და გაწყობთ მობრძანება, მაშინ რუსთაველზე, არჩილ ჯორჯაძის ქ.№5 (ქაშუეთის ეკლესიის გვერდით)
         https://goo.gl/maps/VnYrzPZeATt
         მდებარე ფილიალში შეგიძლიათ მობრძანდეთ.
      
      პატივისცემით: თბილისის საოჯახო პერსონალის საკადრო ცენტრ ,,ბაია"-ს ადმინისტრაცია.`;
      const payload = {
        messaging_type: "RESPONSE",
        recipient: {
          id: sessionId,
        },
        message: {
          text: contactInfo,
        },
      };

      const request = await axiosInstance();
      await deleteSession(sessionId);

      const response = await request.post(
        `/me/messages?access_token=${access_token}`,
        payload
      );

      return response;
    } else if (answer === "PIROBEBI") {
      const aboutInfo = "პირობები დამქირავლებლის"; // Replace with actual about information

      const payload = {
        messaging_type: "RESPONSE",
        recipient: {
          id: sessionId,
        },
        message: {
          text: aboutInfo,
        },
      };

      const request = await axiosInstance();
      await deleteSession(sessionId);

      const response = await request.post(
        `/me/messages?access_token=${access_token}`,
        payload
      );

      return response;
    } else if (answer === "PIROBEBI2") {
      let locationInfo;

      if (session.lastInteraction === "CONTACT") {
        locationInfo = "პირობები კანდიდატის"; // Replace with location information related to Contact
      } else {
        locationInfo = "პირობები კანდიდატის";
      }

      const payload = {
        messaging_type: "RESPONSE",
        recipient: {
          id: sessionId,
        },
        message: {
          text: locationInfo,
        },
      };

      session.lastInteraction = "LOCATION";
      await updateSession(sessionId, session);

      const request = await axiosInstance();
      const response = await request.post(
        `/me/messages?access_token=${access_token}`,
        payload
      );

      return response;
    } else {
      const message = `კარგით გისურვებთ წარმატებებს`;

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
    console.log("Error acquired in handler 2:", error);
    throw error;
  }
}

// async function handler2(sessionId, messaging) {
//   const answer = messaging[0]?.postback?.payload;
//   try {
//     const session = await getSession(sessionId);

//     if (answer === "CONTACT") {
//       const contactInfo = "Contact Information"; // Replace with actual contact information

//       const payload = {
//         messaging_type: "RESPONSE",
//         recipient: {
//           id: sessionId,
//         },
//         message: {
//           text: contactInfo,
//         },
//       };

//       const request = await axiosInstance();
//       await deleteSession(sessionId);

//       const response = await request.post(
//         `/me/messages?access_token=${access_token}`,
//         payload
//       );

//       return response;
//     } else if (answer === "ABOUT") {
//       const aboutInfo = "About Us"; // Replace with actual about information

//       const payload = {
//         messaging_type: "RESPONSE",
//         recipient: {
//           id: sessionId,
//         },
//         message: {
//           text: aboutInfo,
//         },
//       };

//       const request = await axiosInstance();
//       await deleteSession(sessionId);

//       const response = await request.post(
//         `/me/messages?access_token=${access_token}`,
//         payload
//       );

//       return response;
//     } else if (answer === "LOCATION") {
//       let locationInfo;

//       if (session.lastInteraction === "CONTACT") {
//         locationInfo = "Location information related to Contact"; // Replace with location information related to Contact
//       } else {
//         locationInfo = generateRandomLocation(); // Replace with your logic to generate a random location
//       }

//       const payload = {
//         messaging_type: "RESPONSE",
//         recipient: {
//           id: sessionId,
//         },
//         message: {
//           text: locationInfo,
//         },
//       };

//       session.lastInteraction = "LOCATION";
//       await updateSession(sessionId, session);

//       const request = await axiosInstance();
//       const response = await request.post(
//         `/me/messages?access_token=${access_token}`,
//         payload
//       );

//       return response;
//     } else {
//       const message = `კარგით გისურვებთ წარმატებებს`;

//       const payload = {
//         messaging_type: "RESPONSE",
//         recipient: {
//           id: sessionId,
//         },
//         message: {
//           text: message,
//         },
//       };

//       const request = await axiosInstance();
//       await deleteSession(sessionId);

//       const response = await request.post(
//         `/me/messages?access_token=${access_token}`,
//         payload
//       );

//       return response;
//     }
//   } catch (error) {
//     console.log("Error acquired in handler 11:", error);
//     throw error;
//   }
// }


// Helper function to generate a random location

// async function handler2(sessionId, messaging) {
//   const answer = messaging[0]?.postback?.payload;
//   try {
//     let session = await getSession(sessionId);

//     if (answer === "CONTACT") {
//       const contactInfo = "Contact Information"; // Replace with actual contact information

//       const payload = {
//         messaging_type: "RESPONSE",
//         recipient: {
//           id: sessionId,
//         },
//         message: {
//           text: contactInfo,
//         },
//       };

//       const request = await axiosInstance();
//       await deleteSession(sessionId);

//       const response = await request.post(
//         `/me/messages?access_token=${access_token}`,
//         payload
//       );

//       return response;
//     } else if (answer === "ABOUT") {
//       const aboutInfo = "About Us"; // Replace with actual about information

//       const payload = {
//         messaging_type: "RESPONSE",
//         recipient: {
//           id: sessionId,
//         },
//         message: {
//           text: aboutInfo,
//         },
//       };

//       const request = await axiosInstance();
//       await deleteSession(sessionId);

//       const response = await request.post(
//         `/me/messages?access_token=${access_token}`,
//         payload
//       );

//       return response;
//     } else if (answer === "LOCATION") {
//       let locationInfo;

//       if (session.lastInteraction === "CONTACT") {
//         locationInfo = "Location information related to Contact"; // Replace with location information related to Contact
//       } else {
//         locationInfo = generateRandomLocation(); // Replace with your logic to generate a random location
//       }

//       const payload = {
//         messaging_type: "RESPONSE",
//         recipient: {
//           id: sessionId,
//         },
//         message: {
//           text: locationInfo,
//         },
//       };

//       session.lastInteraction = "LOCATION";
//       await updateSession(sessionId, session);

//       const request = await axiosInstance();
//       const response = await request.post(
//         `/me/messages?access_token=${access_token}`,
//         payload
//       );

//       return response;
//     } else {
//       const message = `კარგით გისურვებთ წარმატებებს`;

//       const payload = {
//         messaging_type: "RESPONSE",
//         recipient: {
//           id: sessionId,
//         },
//         message: {
//           text: message,
//         },
//       };

//       const request = await axiosInstance();
//       await deleteSession(sessionId);

//       const response = await request.post(
//         `/me/messages?access_token=${access_token}`,
//         payload
//       );

//       return response;
//     }
//   } catch (error) {
//     console.log("Error acquired in handler 11:", error);
//     throw error;
//   }
// }




async function handler3(sessionId) {

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
async function handler4(sessionId) {

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
async function handler5(sessionId) {

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
async function handler6(sessionId) {

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
async function handler7(sessionId) {

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
async function handler8(sessionId) {

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
async function handler9(sessionId) {

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
async function handler10(sessionId) {

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
async function handler11(sessionId) {

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
async function handler12(sessionId) {

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
};