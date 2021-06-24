import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import { Container, Content } from 'styles/Layout';
import { Loading } from 'styles/Loading';
import Notification from 'components/core/Notification';
import InfiniteScroll from 'components/shared/InfiniteScroll';
import Skeleton from 'components/shared/Skeleton';
import Empty from 'components/shared/Empty';
import Head from 'components/shared/Head';

import { useStore } from 'store';

import { GET_USER_NOTIFICATION } from 'graphql/notification';

import { NOTIFICATIONS_PAGE_NOTIFICATION_LIMIT } from 'constants/DataLimit';

const Root = styled(Container)`
    margin-top: ${(p) => p.theme.spacing.lg};
`;

const List = styled.div`
    overflow: hidden;
    border-radius: ${(p) => p.theme.radius.sm};
    border: 1px solid ${(p) => p.theme.colors.border.main};
`;

/**
 * Notifications page
 */
const Notifications = () => {
    const [{ auth }] = useStore();
    const variables = {
        userId: auth.user.id,
        skip: 0,
        limit: NOTIFICATIONS_PAGE_NOTIFICATION_LIMIT,
    };
    const { data, loading, fetchMore, networkStatus } = useQuery(GET_USER_NOTIFICATION, {
        variables,
        notifyOnNetworkStatusChange: true,
    });

    const renderContent = () => {
        if (loading && networkStatus === 1) {
            return <Skeleton height={56} bottom="xxs" count={NOTIFICATIONS_PAGE_NOTIFICATION_LIMIT} />;
        }

        const { notifications, count } = data.getUserNotifications;
        if (!notifications.length) {
            return <Empty text="No notifications yet" />;
        }

        return (
            <InfiniteScroll
                data={notifications}
                dataKey="getUserNotifications.notifications"
                count={parseInt(count)}
                variables={variables}
                fetchMore={fetchMore}
            >
                {(data) => {
                    const showNextLoading = loading && networkStatus === 3 && count !== data.length;

                    return (
                        <>
                            <List>
                                {data.map((notification) => (
                                    <Notification key={notification.id} notification={notification} close={() => false} />
                                ))}
                            </List>

                            {showNextLoading && <Loading top="lg" />}
                        </>
                    );
                }}
            </InfiniteScroll>
        );
    };

    return (
        <Content>
            <Root maxWidth="md">
                <Head title={`${auth.user.username}'s notifications`} />

                {renderContent()}
            </Root>
        </Content>
    )
}

export default Notifications;