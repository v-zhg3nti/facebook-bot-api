const {
  server: { verify_token },
} = require("../config/index");
const { eventEraser } = require("../utils/index");
const {
  LOOKING_FOR_JOB,
  PAGE,
  SUBSCRIBE,
  JOB_SEEKERS,
} = require("../constants/index");

const jobSeekers = require("./job-seekers");
const {
  createSession,
  updateSession,
  getSession,
} = require("./session-services");

async function authorizeWebHook(verifyParameters) {
  const {
    "hub.verify_token": token,
    "hub.mode": mode,
    "hub.challenge": challenge,
  } = verifyParameters;

  if (!token && !mode && !challenge) {
    throw new Error(400);
  }

  if (mode === SUBSCRIBE && token === verify_token) {
    return { challenge, status: 200 };
  } else {
    throw new Error(403);
  }
}

async function distributeEvents(object, messaging, userId) {
  let res = undefined;

  if (object === PAGE) {
    const eventText = messaging[0]?.message?.text;
    const event = eventEraser(eventText);
   // console.log("eventText",eventText)
   // console.log("event",event)
    switch (event) {
      case LOOKING_FOR_JOB: {
        const sessionObject = {
          sessionId: userId,
          stage: 1,
          serviceName: JOB_SEEKERS,
        };
        try {
          await createSession({ userId, ...sessionObject });
          res = await jobSeekers[`handler${sessionObject.stage}`](userId);
        } catch (error) {
          console.error("Error in distributeEvents:", error);
        }
        break;
      }
      default:
        break;
    }
  }

  return res;
}

function serviceDistribution(serviceName) {
  let selectedService = undefined;

  switch (serviceName) {
    case JOB_SEEKERS:
      selectedService = jobSeekers;
      break;
    default:
      selectedService = null;
      break;
  }
  //console.log('selectedService',selectedService)
  return selectedService;
}

async function handleWebHookFlow(object, messaging, sessionId) {
  try {
    const userSession = await getSession(sessionId);
    //console.log("fg",userSession)
    //console.log("useSession",userSession)
    if (userSession.length) {
      let { _, stage, serviceName } = userSession[0];
      //console.log("serviceName",serviceName)
      
      const service = serviceDistribution(serviceName);
      
      try {
        stage = stage + 1;
        await updateSession(sessionId, { sessionId, stage, serviceName }).then(
          (res) => console.log("updated session", res)
        );
        const res = await service[`handler${stage}`](sessionId, messaging);
        return res;
      } catch (error) {
        console.error("Error in handleWebHookFlow:", error);
        throw error;
      }
    }

    return await distributeEvents(object, messaging, sessionId);
  } catch (error) {
    console.error("Error in handleWebHookFlow:", error);
    throw error;
  }
}

module.exports = {
  authorizeWebHook,
  distributeEvents,
  handleWebHookFlow,
};
