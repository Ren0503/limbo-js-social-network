import jwt from 'jsonwebtoken';
import { ApolloServer } from 'apollo-server-express';
import { PubSub } from 'apollo-server';
import { IS_USER_ONLINE } from '../constants/Subscriptions';

// Export pubsub instance for publishing events
export const pubSub = new PubSub();

/**
 * Checks if client is authenticated by checking authorization key from req headers
 * 
 * @param {obj} req
 */
const checkAuthorization = (token) => {
    return new Promise(async (resolve, reject) => {
        const authUser = await jwt.verify(token, process.env.SECRET);

        if (authUser) {
            resolve(authUser);
        } else {
            reject("Couldn't authenticate user");
        }
    });
};

/**
 * Creates an Apollo server and identifies if user is authenticated or not
 * 
 * @param {obj} schema GraphQL Schema
 * @param {array} resolvers GraphQL Resolvers
 * @param {obj} models Mongoose Models
 */
export const createApolloServer = (schema, resolvers, models) => {
    return new ApolloServer({
        typeDefs: schema,
        resolvers,
        context: async ({ req, connection }) => {
            if (connection) {
                return connection.context;
            }

            let authUser;
            if(req.headers.authorization !== 'null') {
                const user = await checkAuthorization(req.headers['authorization']);
                if (user) {
                    authUser = user;
                }
            }

            return Object.assign({ authUser }, models);
        },
        subscriptions: {
            onConnect: async(connectionParams, webSocket) => {
                // Check if user is authenticated
                if(connectionParams.authorization) {
                    const user = await checkAuthorization(connectionParams.authorization);

                    // Publish user isOnline true
                    pubSub.publish(IS_USER_ONLINE, {
                        isUserOnline: {
                            userId: user.id,
                            isOnline: true,
                        },
                    });

                    // Add authUser to socket's context, so we have access to it, in OnDisconnect method
                    return {
                        authUser: user,
                    };
                }
            },
            onDisconnect: async (webSocket, context) => {
                // Get socket's context
                const conn = await context.initPromise;
                if (conn && conn.authUser) {
                    // Publish user isOnline false
                    pubSub.publish(IS_USER_ONLINE, {
                        isUserOnline: {
                            userId: conn.authUser.id,
                            isOnline: false,
                        },
                    });

                    // Update user isOnline to false in DB
                    await models.User.findOneAndUpdate(
                        { email: conn.authUser.email },
                        { 
                            isOnline: false,
                        }
                    );
                }
            },
        },
    });
};