// require("dotenv").config("../../.env");

// const axiosInstance = require("../http/index");
// const {
//   facebook: { access_token },
// } = require("../config/index");

// const { createPayload } = require("../utils/index");
// const { handler2Payload } = require("../data/index");
// const { updateSession, getSession } = require("./session-services");
// const { getUser } = require("./user-services");
// const { createUser, updateUser } = require("./session-user");
// // const { getJobs } = require("./jobs-service")

// async function handler1(userId) {
//   const textGE = "რა პოზიციაზე ეძებთ თანამშრომელს ?";
//   const textENG = "In which position you looking for staff?";
//   const text = `${textGE} / ${textENG} `;
//   // const jobs = await getJobs({jobs:"jobs"})
//   // console.log(jobs, "jooobobss staff seeker");
//   const payload = createPayload(userId, text, handler2Payload);

//   try {
//     const request = axiosInstance();
//     const response = await request.post(
//       `/me/messages?access_token=${access_token}`,
//       payload
//     );
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Error sending request to Facebook Graph API:",
//       error.message
//     );
//     if (error.response) {
//       console.error("Response status:", error.response.status);
//       console.error("Response data:", error.response.data);
//     }
//     throw error;
//   }
// }

// async function handler2(sessionId, messaging) {
//   console.log(sessionId, messaging);
//   try {
//     const pozicia = messaging[0]?.message?.quick_reply?.payload;
//     userObject.pozicia = pozicia; // Adding the position in the user object
//     const message = `სანამ შემდეგ ეტაპზე გადავალთ გვინდა ვნახოთ ხართ თუ არა ჩვენს სისტემაში დარეგისტრირებული ამისათვის გთხოვთ მოგვწეროთ ტელეფონის ნომერი მისამართი რომლითაც დარეგისტრირდით hrbaia.com
//        / Before we go to the next step, we want to see if you are registered in our system, please write us the email address you registered with hrbaia.com`;
//     const payload = {
//       messaging_type: "RESPONSE",
//       recipient: {
//         id: sessionId,
//       },
//       message: {
//         text: message,
//       },
//     };
//     await updateSession(sessionId, { pozicia });
//     const request = axiosInstance();
//     const response = await request.post(
//       `/me/messages?access_token=${access_token}`,
//       payload
//     );
//     return response;
//   } catch (error) {
//     console.log("error acquired in handler 2: ", error);
//     throw error;
//   }
// }

// const userObject = {
//   saxeli: "",
//   teleponi: "",
//   email: "",
//   raioni: "",
//   grapiki: "",
//   pozicia: "",
//   moqalaqeoba: "",
//   anazgaureba: "",
//   asaki: "",
//   ganatleba: "",
//   movaleobebi: "",
//   sachiroeba: "",
//   damatebiti: ""
// };



// async function handler3(sessionId, messaging) {
//   const teleponi = messaging[0].message?.text;
//   userObject.teleponi = teleponi;
//   const user = await getUser({ teleponi: teleponi });

//   try {
//     let message = "";
//     if (user == null) {
//       message = "ასეთი მომხარებელი არ მოიძებნა, თქვენი სახელი?";
//     } else {
//       message = "თქვენი მონაცემები ნაპოვნია, ჩვენ მალე დაგიკავშირდებით";
//     }

//     const payload = {
//       messaging_type: "RESPONSE",
//       recipient: {
//         id: sessionId,
//       },
//       message: {
//         text: message,
//       },
//     };
//     const request = axiosInstance();
//     const response = await request.post(
//       `/me/messages?access_token=${access_token}`,
//       payload
//     );
//     return response;
//   } catch (error) {
//     console.log("error acquired in handler 3: ", error);
//     throw error;
//   }
// }


// async function handler4(sessionId, messaging) {
//   const saxeli = messaging[0].message?.text;
//   userObject.saxeli = saxeli;

//   try {
//     const message = "Where are you from?";
//     const payload = {
//       messaging_type: "RESPONSE",
//       recipient: {
//         id: sessionId,
//       },
//       message: {
//         text: message,
//       },
//     };
//     const request = axiosInstance();
//     const response = await request.post(
//       `/me/messages?access_token=${access_token}`,
//       payload
//     );
//     return response;
//   } catch (error) {
//     console.log("error acquired in handler 3: ", error);
//     throw error;
//   }
// }


// async function handler5(sessionId, messaging) {
//   const moqalaqeoba = messaging[0].message?.text;
//   userObject.moqalaqeoba = moqalaqeoba;

//   try {
//     const message = "moqalaqeoba??";
//     const payload = {
//       messaging_type: "RESPONSE",
//       recipient: {
//         id: sessionId,
//       },
//       message: {
//         text: message,
//       },
//     };
//     const request = axiosInstance();
//     const response = await request.post(
//       `/me/messages?access_token=${access_token}`,
//       payload
//     );
//     return response;
//   } catch (error) {
//     console.log("error acquired in handler 3: ", error);
//     throw error;
//   }
// }

// async function handler6(sessionId, messaging) {
//   const movaleobebi = messaging[0].message?.text;
//   userObject.movaleobebi = movaleobebi;

//   try {
//     const message = "movaleobebi??";
//     const payload = {
//       messaging_type: "RESPONSE",
//       recipient: {
//         id: sessionId,
//       },
//       message: {
//         text: message,
//       },
//     };
//     const request = axiosInstance();
//     const response = await request.post(
//       `/me/messages?access_token=${access_token}`,
//       payload
//     );
//     return response;
//   } catch (error) {
//     console.log("error acquired in handler 3: ", error);
//     throw error;
//   }
// }
// async function handler7(sessionId, messaging) {
//   const gamocdileba = messaging[0].message?.text;
//   userObject.gamocdileba = gamocdileba;

//   try {
//     const message = "any other languages?";
//     const payload = {
//       messaging_type: "RESPONSE",
//       recipient: {
//         id: sessionId,
//       },
//       message: {
//         text: message,
//       },
//     };
//     const request = axiosInstance();
//     const response = await request.post(
//       `/me/messages?access_token=${access_token}`,
//       payload
//     );
//     return response;
//   } catch (error) {
//     console.log("error acquired in handler 3: ", error);
//     throw error;
//   }
// }
// async function handler8(sessionId, messaging) {
//   const damatebiti = messaging[0].message?.text;
//   userObject.damatebiti = damatebiti;

//   try {
//     const message = "your age?";
//     const payload = {
//       messaging_type: "RESPONSE",
//       recipient: {
//         id: sessionId,
//       },
//       message: {
//         text: message,
//       },
//     };
//     const request = axiosInstance();
//     const response = await request.post(
//       `/me/messages?access_token=${access_token}`,
//       payload
//     );
//     return response;
//   } catch (error) {
//     console.log("error acquired in handler 3: ", error);
//     throw error;
//   }
// }
// async function handler9(sessionId, messaging) {
//   const asaki = messaging[0].message?.text;
//   userObject.asaki = asaki;  // setting 'erovneba' to the user's response
//   try {
//     let message = "მოგვაწოდეთ თქვენი ელ-ფოსტა..";

//     const payload = {
//       messaging_type: "RESPONSE",
//       recipient: {
//         id: sessionId,
//       },
//       message: {
//         text: message,
//       },
//     };
//     const request = axiosInstance();
//     const response = await request.post(
//       `/me/messages?access_token=${access_token}`,
//       payload
//     );
//     return response;
//   } catch (error) {
//     console.log("error acquired in handler 5: ", error);
//     throw error;
//   }
// }

// async function handler10(sessionId, messaging) {
//   const email = messaging[0].message?.text;
//   userObject.email = email;

//   try {
//     let message = "თქვენ წარმატებით გაიარეთ რეგისტრაცია! <3";

//     const payload = {
//       messaging_type: "RESPONSE",
//       recipient: {
//         id: sessionId,
//       },
//       message: {
//         text: message,
//       },
//     };
//     await createUser({ sessionId, ...userObject });
//     // await updateUser(555112233, { email });
//     const request = axiosInstance();
//     const response = await request.post(
//       `/me/messages?access_token=${access_token}`,
//       payload
//     );
//     return response;
//   } catch (error) {
//     console.log("error acquired in handler 4: ", error);
//     throw error;
//   }

//   // const nextStage = Object.keys(user).length ?
// }

// module.exports = {
//   handler1,
//   handler2,
//   handler3,
//   handler4,
//   handler5,
//   handler6,
//   handler7,
//   handler8,
//   handler9,
//   handler10,
// };

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
    const pozicia = messaging[0]?.message?.quick_reply?.payload;
    userObject.pozicia = pozicia; // Adding the position in the user object
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
    await updateSession(sessionId, { pozicia });
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

async function handler9(sessionId, messaging) {
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

async function handler10(sessionId, messaging) {
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
};
