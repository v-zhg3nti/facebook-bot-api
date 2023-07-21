function eventEraser(text) {
  if (text === undefined || text === null) {
    return ""; // or any other default value you prefer
  }

  const result = text.replace(/[^a-zA-Zა-ჰ👇❓?]/gu, "");
  return result;
}

function createPayload(userId, text, data) {
  const payload = {
    recipient: {
      id: userId,
    },
    message: {
      text,
      quick_replies: [],
    },
  };

  console.log("data@@@@@@@@@@@@@", data);

  if (data?.length) {
    payload.message.quick_replies.push(...data);
    JSON.stringify(payload.message.quick_replies);
  }
  return payload;
}

module.exports = {
  eventEraser,
  createPayload,
};
