import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { jwtConstants } from '../constants';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super ({
            clientID: jwtConstants.GOOGLE_CLIENT_ID,
            clientSecret: jwtConstants.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/api/user/auth/google/callback',
            scope: ['email', 'profile'],
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        done(null, profile);
    }
}