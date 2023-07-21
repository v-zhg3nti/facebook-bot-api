require("dotenv").config("../../.env");
const axiosInstance = require("../http/index");
const {
  facebook: { access_token },
} = require("../config/index");

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
              image_url:
                "https://www.rovers.ge/wp-content/uploads/2022/01/Purple-Illustrated-Frequently-Asked-Questions-Instagram-Post-1024x1024.png",
              subtitle: "ვეცდებით გიპასუხოთ ყველა კითხვაზე 😊",
              buttons: [
                {
                  type: "postback",
                  title: "ჩვენი საკონტაქტო ინფორმაცია",
                  payload: "CONTACT",
                },
                {
                  type: "postback",
                  title: "პირობები",
                  payload: "PIROBEBI",
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

// async function handler2(sessionId, messaging) {
//   const answer = messaging[0]?.postback?.payload;
//   try {
//     let session = await getSession(sessionId);

//     if (answer === "CONTACT") {
//       const contactInfo = `Contact Information:
//       🌹 1) არჩილ ჯორჯაძის ქ.№5 (ქაშუეთის ეკლესიის გვერდით)
//          https://goo.gl/maps/VnYrzPZeATt
//          T: {{511110225}}

//       🌺 2) ვაჟა ფშაველას გამზ N76ბ (მ/სადგურ ,,ვაჟა ფშაველა"-ს გვერდით, მარჯვენა ამოსასვლელთან მდებარე კორპუსი)
//          https://goo.gl/maps/fZjatKHFqWQ2
//          T: {{599613090}}

//       🌲 3) ილია ჭავჭავაძის გამზ N2 (ვაკე - თ.ს.უ-ს I-კორპუსის წინ)
//          https://goo.gl/maps/VnCSaWhpwNPoVXcJ6
//          T: {{599191507}}

//       სადაც თქვენთვის უფრო ხელსაყრელი იქნება. სამუშაო საათებია: ორშაბათიდან შაბათის ჩათვლით დილის 10:00-დან საღამოს 18:00-მდე, ხოლო თუ მხოლოდ კვირა დღეს გცალიათ და გაწყობთ მობრძანება, მაშინ რუსთაველზე, არჩილ ჯორჯაძის ქ.№5 (ქაშუეთის ეკლესიის გვერდით)
//          https://goo.gl/maps/VnYrzPZeATt
//          მდებარე ფილიალში შეგიძლიათ მობრძანდეთ.`;

//       const payload = {
//         messaging_type: "RESPONSE",
//         recipient: {
//           id: sessionId,
//         },
//         message: {
//           text: contactInfo,

//         },
//       };
//             // await deleteSession(sessionId);

//       const request = await axiosInstance();
//       // await deleteSession(sessionId);

//       const response = await request.post(
//         `/me/messages?access_token=${access_token}`,
//         payload
//       );

//       return response;
//     } else if (answer === "PIROBEBI") {
//       const aboutInfo = `👇 გამარჯობა, გთხოვთ გაეცნოთ ჩვენს პირობებს 👇

//       🌹კანდიდატის პირობები🌹

//       ჩვენ გაგასაუბრებთ თქვენს მოთხოვნებთან მაქსიმალურ შესაბამისობაში 4-5 პასპორტიზირებულ კანდიდატს, ყველასათვის ცნობებით და რომელიმე მოწონებისა და გამოსაცდელი ვადის წარმატებით გავლის შემთხვევაში ჩვენთან იხდით კადრის მოძიების საფასურს, რომელიც განისაზღვრება თვიურ ხელფასს მხოლოდ 10%-ს ერთჯერადად. რაც შედის 1 წლის განმავლობაში, კადრი, თუ წავიდა სამსახურიდან, მისგან დამოუკიდებელი მიზეზების გამო ან თავად დაითხოვეთ, უფასოდ გაგინაცვლებთ 3 ჯერ სხვა კანდიდატურით.

//       🌹პერსონალის პირობები🌹

//       ჩვენი პირობები შემდგომში მდგომარეობს: პირველ თვეს ანაზღაურებიდან ნახევარი ჩამოგეჭრებათ მას შემდეგ, რაც აიღებთ ამ ანაზღაურებას. რეგისტრაცია კი ფასიანია და ავანსად გადახდილი იქნება 30 ლარი.

//       `;

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
//       // await deleteSession(sessionId);

//       const response = await request.post(
//         `/me/messages?access_token=${access_token}`,
//         payload
//       );

//       return response;
//     }
//   } catch (error) {
//     console.log("Error acquired in handler 2:", error);
//     throw error;
//   }
// }
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
         მდებარე ფილიალში შეგიძლიათ მობრძანდეთ.`;

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

      // Send the template message again to prompt for another selection
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
                  image_url:
                    "https://www.rovers.ge/wp-content/uploads/2022/01/Purple-Illustrated-Frequently-Asked-Questions-Instagram-Post-1024x1024.png",
                  subtitle: "ვეცდებით გიპასუხოთ ყველა კითხვაზე 😊",
                  buttons: [
                    {
                      type: "postback",
                      title: "ჩვენი საკონტაქტო ინფორმაცია",
                      payload: "CONTACT",
                    },
                    {
                      type: "postback",
                      title: "პირობები",
                      payload: "PIROBEBI",
                    },
                  ],
                },
              ],
            },
          },
        },
      };

      await request.post(
        `/me/messages?access_token=${access_token}`,
        templatePayload
      );

      return response;
    } else if (answer === "PIROBEBI") {
      const aboutInfo = `👇 გამარჯობა, გთხოვთ გაეცნოთ ჩვენს პირობებს 👇

      🌹კანდიდატის პირობები🌹 
      
      ჩვენ გაგასაუბრებთ თქვენს მოთხოვნებთან მაქსიმალურ შესაბამისობაში 4-5 პასპორტიზირებულ კანდიდატს, ყველასათვის ცნობებით და რომელიმე მოწონებისა და გამოსაცდელი ვადის წარმატებით გავლის შემთხვევაში ჩვენთან იხდით კადრის მოძიების საფასურს, რომელიც განისაზღვრება თვიურ ხელფასს მხოლოდ 10%-ს ერთჯერადად. რაც შედის 1 წლის განმავლობაში, კადრი, თუ წავიდა სამსახურიდან, მისგან დამოუკიდებელი მიზეზების გამო ან თავად დაითხოვეთ, უფასოდ გაგინაცვლებთ 3 ჯერ სხვა კანდიდატურით.
      

      🌹პერსონალის პირობები🌹 
      
      ჩვენი პირობები შემდგომში მდგომარეობს: პირველ თვეს ანაზღაურებიდან ნახევარი ჩამოგეჭრებათ მას შემდეგ, რაც აიღებთ ამ ანაზღაურებას. რეგისტრაცია კი ფასიანია და ავანსად გადახდილი იქნება 30 ლარი.
      
      `;

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

      // Send the template message again to prompt for another selection
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
                  image_url:
                    "https://www.rovers.ge/wp-content/uploads/2022/01/Purple-Illustrated-Frequently-Asked-Questions-Instagram-Post-1024x1024.png",
                  subtitle: "ვეცდებით გიპასუხოთ ყველა კითხვაზე 😊",
                  buttons: [
                    {
                      type: "postback",
                      title: "ჩვენი საკონტაქტო ინფორმაცია",
                      payload: "CONTACT",
                    },
                    {
                      type: "postback",
                      title: "პირობები",
                      payload: "PIROBEBI",
                    },
                  ],
                },
              ],
            },
          },
        },
      };

      await request.post(
        `/me/messages?access_token=${access_token}`,
        templatePayload
      );

      return response;
    }
  } catch (error) {
    console.log("Error in handler2:", error);
  }
}

async function handler3(sessionId, messaging) {
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
         მდებარე ფილიალში შეგიძლიათ მობრძანდეთ.`;

      const payload = {
        messaging_type: "RESPONSE",
        recipient: {
          id: sessionId,
        },
        message: {
          text: contactInfo,
        },
      };
      // await deleteSession(sessionId);

      const request = await axiosInstance();
      await deleteSession(sessionId);

      const response = await request.post(
        `/me/messages?access_token=${access_token}`,
        payload
      );

      return response;
    } else if (answer === "PIROBEBI") {
      const aboutInfo = `👇 გამარჯობა, გთხოვთ გაეცნოთ ჩვენს პირობებს 👇

      🌹კანდიდატის პირობები🌹 
      
      ჩვენ გაგასაუბრებთ თქვენს მოთხოვნებთან მაქსიმალურ შესაბამისობაში 4-5 პასპორტიზირებულ კანდიდატს, ყველასათვის ცნობებით და რომელიმე მოწონებისა და გამოსაცდელი ვადის წარმატებით გავლის შემთხვევაში ჩვენთან იხდით კადრის მოძიების საფასურს, რომელიც განისაზღვრება თვიურ ხელფასს მხოლოდ 10%-ს ერთჯერადად. რაც შედის 1 წლის განმავლობაში, კადრი, თუ წავიდა სამსახურიდან, მისგან დამოუკიდებელი მიზეზების გამო ან თავად დაითხოვეთ, უფასოდ გაგინაცვლებთ 3 ჯერ სხვა კანდიდატურით.
      

      🌹პერსონალის პირობები🌹 
      
      ჩვენი პირობები შემდგომში მდგომარეობს: პირველ თვეს ანაზღაურებიდან ნახევარი ჩამოგეჭრებათ მას შემდეგ, რაც აიღებთ ამ ანაზღაურებას. რეგისტრაცია კი ფასიანია და ავანსად გადახდილი იქნება 30 ლარი.
      
      `;

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
    }
  } catch (error) {
    console.log("Error acquired in handler 2:", error);
    throw error;
  }
}
module.exports = {
  handler1,
  handler2,
  handler3,
};
