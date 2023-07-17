const { UserSession } = require("../models/index");

async function createSession(sessionData) {
  try {
    const userSession = (await UserSession.create(sessionData)).toJSON();
    console.log("created session: ", userSession);
    return userSession;
  } catch (error) {
    console.log("error acquired in createSession method: ", error);
    throw error;
  }
}

async function deleteSession(sessionId) {
  try {
    const deletedSession = await UserSession.destroy({ where: { sessionId } });
    if (deletedSession) {
      console.log("deleted session with sessionId: ", sessionId);
      return deletedSession;
    } else {
      throw new Error("Session not found");
    }
  } catch (error) {
    console.log("error occurred in deleteSession method: ", error);
    throw error;
  }
}

async function updateSession(sessionId, updateData) {
  try {
    const updatedSession = await UserSession.update(updateData, {
      where: { sessionId },
    });
    return updatedSession;
  } catch (error) {
    console.log("error acquired in updateSession method: ", error);
    throw error;
  }
}

async function filterSessions(sessionId) {
  try {
    const filterSession = await UserSession.findAll({
        where: { sessionId: sessionId },
      });
    return filterSession;
  } catch (error) {
    console.log("error acquired in createSession method: ", error);
    throw error;
  }
}

async function getSession(sessionId) {
  try {
    const session = await UserSession.findAll(
      {
        where: { sessionId },
      },
      { raw: true }
    );
    return session;
  } catch (error) {
    console.log("error acquired in getSession method: ", error);
    throw error;
  }
}

module.exports = {
  createSession,
  updateSession,
  deleteSession,
  getSession,
  filterSessions
};
