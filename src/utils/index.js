function eventEraser(text) {
  const result = text.replace(/[^a-zA-Z]/g, "");
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