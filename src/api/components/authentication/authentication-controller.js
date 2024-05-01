const { errorResponder, errorTypes } = require('../../../core/errors');
const authenticationServices = require('./authentication-service');
const loginAttempts = {}; // Object to track login attempts for each email

/**
 * Handle login request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function login(request, response, next) {
  const { email, password } = request.body;

  try {
    // Check if there are previous failed attempts for this email
    if (!loginAttempts[email]) {
      loginAttempts[email] = {
        count: 0,
        lastAttempt: null,
      };
    }

    const { count, lastAttempt } = loginAttempts[email];

    if (lastAttempt && Date.now() - lastAttempt < 30 * 60 * 1000) {
      if (count >= 5) {
        const minutesLeft = Math.ceil(
          (lastAttempt + 30 * 60 * 1000 - Date.now()) / (60 * 1000)
        );
        throw errorResponder(
          errorTypes.FORBIDDEN,
          `Too many failed login attempts. Please try again in ${minutesLeft} minutes.`
        );
      }
    } else {
      loginAttempts[email].count = 0;
    }

    const loginSuccess = await authenticationServices.checkLoginCredentials(
      email,
      password
    );

    if (!loginSuccess) {
      loginAttempts[email].count++;
      loginAttempts[email].lastAttempt = Date.now();
      const currentDate = new Date().toLocaleDateString();
      const loginTime = new Date().toLocaleTimeString();
      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        `Wrong email or password for user ${email}. Total failed attempts: ${loginAttempts[email].count}. Date: ${currentDate}. Login Time: ${loginTime}`
      );
    }

    loginAttempts[email].count = 0;
    loginAttempts[email].lastAttempt = null;

    // Login successful, add login time to the response
    const loginTime = new Date().toLocaleTimeString();
    const responseData = {
      ...loginSuccess,
      loginTime: loginTime,
    };

    return response.status(200).json(responseData);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  login,
};
