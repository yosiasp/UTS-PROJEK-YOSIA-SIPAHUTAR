const passport = require('passport');
const passportJWT = require('passport-jwt');

const config = require('../../core/config');
const { Purchases } = require('../../models');

passport.use(
  'purchase',
  new passportJWT.Strategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      secretOrKey: config.secret.jwt,
    },
    async (payload, done) => {
      const purchase = await Purchases.findOne({
        id: payload.purchase_id,
      });
      return purchase ? done(null, purchase) : done(null, false);
    }
  ));