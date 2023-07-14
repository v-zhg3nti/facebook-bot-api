const {
  server: { verify_token },
} = require("../config/index");
const { eventEraser } = require("../utils");
const {
  LOOKING_FOR_JOB,
  PAGE,
  SUBSCRIBE,
  JOB_SEEKERS,
  LOOKING_FOR_STAFF,
  STAFF_SEEKER,
  NEW_USER,
} = require("../constants/index");

const jobSeekers = require("./job-seekers");
const staffSeeker = require("./staff-seekers");
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

  if (!token || !mode || !challenge) {
    throw new Error(400);
  }

  if (mode === SUBSCRIBE && token === verify_token) {
    return { challenge, status: 200 };
  } else {
    throw new Error(403);
  }
}

async function distributeEvents(object, messaging, userId) {
  let res;

  if (object === PAGE) {
    const eventText = messaging[0]?.message?.text;
    const event = eventEraser(eventText);

    switch (event) {
      case LOOKING_FOR_JOB: {
        const sessionObject = {
          sessionId: userId,
          stage: 1,
          serviceName: JOB_SEEKERS,
        };
        try {
          await createSession({ userId, ...sessionObject });
          res = await jobSeekers[`handler${sessionObject.stage}`](userId, messaging);
        } catch (error) {
          console.error("Error in distributeEvents:", error);
        }
        break;
      }
      case LOOKING_FOR_STAFF: {
        const sessionObject = {
          sessionId: userId,
          stage: 1,
          serviceName: STAFF_SEEKER,
        };
        try {
          await createSession({ userId, ...sessionObject });
          res = await staffSeeker[`handler${sessionObject.stage}`](userId, messaging);
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
  let selectedService = null;

  switch (serviceName) {
    case JOB_SEEKERS:
      selectedService = jobSeekers;
      break;
    case STAFF_SEEKER:
      selectedService = staffSeeker;
      break;
    default:
      break;
  }

  return selectedService;
}

async function handleWebHookFlow(object, messaging, sessionId) {
  try {
    const userSession = await getSession(sessionId);

    if (userSession.length) {
      let { stage, serviceName } = userSession[0];

      const service = serviceDistribution(serviceName);
      try {
        stage++;
        await updateSession(sessionId, { stage, serviceName });
        if (service && typeof service[`handler${stage}`] === "function") {
          const res = await service[`handler${stage}`](sessionId, messaging);
          return res;
        } else {
          console.error(`Error in handleWebHookFlow: Invalid service or handler function for stage ${stage}`);
          throw new Error(`Invalid service or handler function for stage ${stage}`);
        }
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