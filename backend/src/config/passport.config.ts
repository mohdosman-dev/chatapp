import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { UnauthorizedError } from "../utils/app-error";
import { Env } from "./env.config";
import { findUserByIdService } from "../services/user.service";

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        // 1) Browser: Cookie
        (req) => {
          if (req?.cookies?.accessToken) {
            return req.cookies.accessToken;
          }
          return null;
        },

        // 2) Mobile / API clients: Authorization header
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: Env.JWT_SECRET,
      audience: ["user"],
      algorithms: ["HS256"],
    },
    async ({ userId }, done) => {
      try {
        const user = userId && (await findUserByIdService(userId));
        return done(null, user || false);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export const passportJwtAuthenticate = passport.authenticate("jwt", {
  session: false,
});
