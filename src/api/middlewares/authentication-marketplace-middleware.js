const passport = require('passport');
const passportJWT = require('passport-jwt');

const config = require('../../core/config');
const { Marketplace } = require('../../models');

// Authenticate user based on the JWT token
passport.use(
  'marketplace',
  new passportJWT.Strategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      secretOrKey: config.secret.jwt,
    },
    async (payload, done) => {
      const marketplace = await Marketplace.findOne({
        id: payload.marketplace_id,
      });
      return marketplace ? done(null, marketplace) : done(null, false);
    }
  )
);

module.exports = passport.authenticate('marketplace', { session: false });
