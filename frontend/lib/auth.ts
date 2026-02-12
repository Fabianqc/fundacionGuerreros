import { AuthOptions } from "next-auth";
import axios from "axios";
import Credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

// Helper to refresh the token
async function refreshAccessToken(token: JWT) {
    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/auth/refresh", {
            oldToken: token.backendRefreshToken, // Send the refresh token as oldToken
            email: token.email,
            id: token.sub // User ID
        });

        return {
            ...token,
            backendAccessToken: response.data.access_token,
            backendRefreshToken: response.data.refresh_token,
            backendAccessTokenExpires: Date.now() + 86400 * 1000, // 1 day
        }
    } catch (error) {
        console.error("Error refreshing access token", error);
        return {
            ...token,
            error: "RefreshAccessTokenError",
        }
    }
}

export const authOptions: AuthOptions = {
    // configure the provider with the client id and client secret
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: Record<"email" | "password", string> | undefined) {
                try {
                    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
                        email: credentials?.email,
                        password: credentials?.password,
                    });
                    const user = response.data;
                    // Assign the email from credentials if the backend doesn't return it
                    if (user) {
                        if (!user.email) {
                            user.email = credentials?.email;
                        }
                        user.backendAccessToken = user.access_token;
                        user.backendRefreshToken = user.refresh_token;
                    }
                    return user;
                } catch (error) {
                    console.error("Error logging in:", error);
                    return null;
                }
            }
        })
    ],
    events: {
        signOut: async ({ token }: { token: JWT }) => {
            // We make a post request to the backend to log out
            console.log("logout");
            console.log(token);
            if (token?.backendAccessToken) {
                try {
                    await axios.post(process.env.NEXT_PUBLIC_API_URL + "/auth/logout", {}, { headers: { Authorization: `Bearer ${token?.backendAccessToken}` } });
                } catch (e) {
                    console.error("Error logging out from backend", e);
                }
            }
        },
    },
    // We verified that the secret is in the .env file
    secret: process.env.NEXTAUTH_SECRET,
    // Configure the callbacks
    callbacks: {

        // Configure the sign in callback
        async signIn({ user, account }: { user: any, account: any }) {
            // We return true or authenticated session
            return true;
        },

        async jwt({ token, account, user }: { token: JWT, account: any, user: any }) {
            // 1. Initial login
            if (account && user) {
                // We recover the token that we saved in signIn
                token.backendAccessToken = user.backendAccessToken;
                token.backendRefreshToken = user.backendRefreshToken;
                // We also save the email to ensure it's available in the token
                token.email = user.email;
                token.sub = user.id; // Save User ID for refresh endpoint

                // Optional: If the backend returns expiration, we would use it here.
                // For now, we assume a standard duration or decode it if necessary.
                token.backendAccessTokenExpires = Date.now() + 86400 * 1000;
            }

            // Return previous token if the access token has not expired yet
            // If backendAccessTokenExpires is missing, we assume it valid or let it fail
            if (token.backendAccessTokenExpires && Date.now() < (token.backendAccessTokenExpires as number)) {
                return token;
            }

            // Access token has expired, try to update it
            return refreshAccessToken(token);
        },
        // Configure the session callback
        async session({ session, token }: { session: any, token: JWT }) {
            // Ensure user object exists
            if (!session.user) {
                session.user = {};
            }
            // We save the token that the backend returns in the session object
            session.user.backendAccessToken = token.backendAccessToken;
            return session;
        }
    },
    // Configure the pages in case of authentication
    pages: {
        signIn: '/login'
    }
};
