import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            backendAccessToken?: string;
            backendRefreshToken?: string;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        backendAccessToken?: string;
        backendRefreshToken?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        backendAccessToken?: string;
        backendAccessTokenExpires?: number;
        backendRefreshToken?: string;
        error?: string;
    }
}
