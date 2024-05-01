const authenticationRepository = require('./authentication-repository');
const { generateToken } = require('../../../utils/session-token');
const { passwordMatched } = require('../../../utils/password');

/**
 * Check username and password for login.
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {object} An object containing, among others, the JWT token if the email and password are matched. Otherwise returns null.
 */
async function checkLoginCredentials(email, password) {
  const user = await authenticationRepository.getUserByEmail(email);

  // We define default user password here as '<RANDOM_PASSWORD_FILTER>'
  // to handle the case when the user login is invalid. We still want to
  // check the password anyway, so that it prevents the attacker in
  // guessing login credentials by looking at the processing time.
  const userPassword = user ? user.password : '<RANDOM_PASSWORD_FILLER>';
  const passwordChecked = await passwordMatched(password, userPassword);

  // Because we always check the password (see above comment), we define the
  // login attempt as successful when the `user` is found (by email) and
  // the password matches.
  if (user && passwordChecked) {
    return {
      email: user.email,
      name: user.name,
      user_id: user.id,
      token: generateToken(user.email, user.id),
    };
  }

  return null;
}

/**
 * Get remaining login attempts and time to next attempt.
 * @param {string} email - Email
 * @returns {object} An object containing remaining login attempts and time to next attempt.
 */
async function getLoginAttemptsAndTime(email) {
  const user = await authenticationRepository.getUserByEmail(email);

  // Jika pengguna tidak ditemukan, kembalikan null
  if (!user) {
    return null;
  }

  // Jika pengguna ditemukan, hitung waktu yang akan di panggil
  const now = new Date();
  const nextAttemptTime = new Date(user.last_login_attempt.getTime() + 60000); // Tambahkan 1 menit ke waktu percobaan login terakhir
  const timeToNextAttempt = nextAttemptTime - now; // Hitung selisih waktu

  // Jika waktu yang akan di panggil masih lebih dari 0, kembalikan waktu yang akan di panggil
  if (timeToNextAttempt > 0) {
    return {
      remainingAttempts: user.login_attempts,
      timeToNextAttempt: timeToNextAttempt,
    };
  }

  // Jika waktu yang akan di panggil sudah 0, reset jumlah percobaan login dan waktu percobaan login terakhir
  await authenticationRepository.resetLoginAttemptsAndLastLoginAttempt(email);

  return null;
}

module.exports = {
  checkLoginCredentials,
  getLoginAttemptsAndTime,
};
