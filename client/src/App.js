import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Loading } from 'styles/Loading';
import { GlobalStyle } from 'styles/GlobalStyles';

import { GET_AUTH_USER } from 'graphql/user';
import { GET_NEW_CONVERSATIONS_SUBSCRIPTION } from 'graphql/messages';
import { NOTIFICATION_CREATED_OR_DELETED } from 'graphql/notification';

import AuthLayout from 'layouts/AuthLayout';
import MainLayout from 'layouts/MainLayout';
import Message from 'components/shared/Message';
import NotFound from 'components/shared/NotFound';
import ScrollToTop from 'components/shared/ScrollToTop';

import { useStore } from 'store';

const App = () => {
    const [{ message }] = useStore();

    const { loading, subscribeToMore, data, error, refetch } = useQuery(GET_AUTH_USER);

    useEffect(() => {
        const unsubscribe = subscribeToMore({
            document: NOTIFICATION_CREATED_OR_DELETED,
            updateQuery: async (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;

                const oldNotifications = prev.getAuthUser.newNotifications;
                const { operation, notification } = subscriptionData.data.notificationCreatedOrDelete;

                let newNotifications;

                if (operation === 'CREATE') {
                    if (window.location.href.split('/')[3] === 'notifications') {
                        return prev;
                    }

                    newNotifications = [notification, ...oldNotifications];
                } else {
                    const notifications = oldNotifications;
                    const index = notifications.findIndex((n) => n.id === notification.id);
                    if (index > -1) {
                        notifications.splice(index, 1);
                    }

                    newNotifications = notification;
                }

                const authUser = prev.getAuthUser;
                authUser.newNotifications = newNotifications;

                return { getAuthUser: authUser };
            },
        });

        return () => {
            unsubscribe();
        }
    }, [subscribeToMore]);

    useEffect(() => {
        const unsubscribe = subscribeToMore({
            document: GET_NEW_CONVERSATIONS_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;

                const oldConversations = prev.getAuthUser.newNotifications;
                const { newConversation } = subscriptionData.data;

                if (window.location.href.split('/')[3] === 'messages') {
                    return prev;
                }

                const index = oldConversations.findIndex((u) => u.id === newConversation.id);
                if (index > -1) {
                    oldConversations.splice(index, 1);
                }

                const mergeConversations = [newConversation, ...oldConversations];

                const authUser = prev.getAuthUser;
                authUser.newConversation = mergeConversations;

                return { getAuthUser: authUser };
            },
        });

        return () => {
            unsubscribe()
        }
    }, [subscribeToMore]);

    if (loading) return <Loading top="xl" />;
    if (error) {
        const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
        if (isDevelopment) {
            console.error(error);
        }
        const devErrorMessage =
            'Sorry, something went wrong. Please open the browser console to view the detailed error message.';
        const prodErrorMessage = "Sorry, something went wrong. We're working on getting this fixed as soon as we can.";
        return <NotFound message={isDevelopment ? devErrorMessage : prodErrorMessage} showHomePageLink={false} />;
    }

    return (
        <Router>
            <GlobalStyle />

            <ScrollToTop>
                <Switch>
                    {data.getAuthUser ? (
                        <Route exact render={() => <MainLayout authUser={data.getAuthUser} />} />
                    ) : (
                        <Route exact render={() => <AuthLayout refetch={refetch} />} />
                    )}
                </Switch>
            </ScrollToTop>

            {message.content.text && (
                <Message type={message.content.type} autoClose={message.content.autoClose}>
                    {message.content.text}
                </Message>
            )}
        </Router>
    );
}

export default App;