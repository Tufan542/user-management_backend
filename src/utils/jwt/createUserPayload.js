

const createUserPayload = (user) => {
    return {
      userId: user.id,
    userName: user.username,
    };
  };

module.exports = createUserPayload