// greetingHandler.js

const greetings = ['hello', 'hi', 'bonjour', 'merhaba'];

const isGreeting = (message) => {
    const lowerCaseMessage = message.toLowerCase();
    return greetings.some(greeting => lowerCaseMessage.includes(greeting));
};

module.exports = {
    isGreeting
};
