import React, { Fragment } from 'react';
import styled from 'styled-components';

import { Container } from 'styles/Layout';
import { Loading } from 'styles/Loading';

import InfiniteScroll from 'components/shared/InfiniteScroll';
import Skeleton from 'components/shared/Skeleton';
import Empty from 'components/shared/Empty';
import Head from 'components/shared/Head';
import PeopleCard from './PeopleCard';

import { GET_USERS } from 'graphql/user';

import { PEOPLE_PAGE_USERS_LIMIT } from 'constants/DataLimit';

import { useStore } from 'store';

import { useQuery } from '@apollo/client';

const Root = styled(Container)`
    margin-top: ${(p) => p.theme.spacing.lg};

    @media (min-width: ${(p) => p.theme.screen.lg}) {
        margin-left: ${(p) => p.theme.spacing.lg};
        padding: 0;
    }
`;

const PeopleContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 3fr));
    grid-auto-rows: auto;
    grid-gap: 20px;
    margin-bottom: ${(p) => p.theme.spacing.lg};
`;

/**
 * People
 */
const People = () => {
    const [{ auth }] = useStore();
    const variables = {
        userId: auth.user.id,
        skip: 0,
        limit: PEOPLE_PAGE_USERS_LIMIT,
    };
    const { data, loading, fetchMore, networkStatus } = useQuery(GET_USERS, {
        variables,
        notifyOnNetworkStatusChange: true,
    });

    const renderContent = () => {
        if (loading && networkStatus === 1) {
            return (
                <PeopleContainer>
                    <Skeleton height={280} count={PEOPLE_PAGE_USERS_LIMIT} />
                </PeopleContainer>
            );
        }

        const { users, count } = data.getUsers;
        if (!users.length > 0) return <Empty text="No people yet." />;

        return (
            <InfiniteScroll
                data={users}
                dataKey="getUsers.users"
                count={parseInt(count)}
                variables={variables}
                fetchMore={fetchMore}
            >
                {(data) => {
                    const showNextLoading = loading && networkStatus === 3 && count !== data.length;

                    return (
                        <Fragment>
                            <PeopleContainer>
                                {data.map((user) => (
                                    <PeopleCard key={user.id} user={user} />
                                ))}
                            </PeopleContainer>

                            {showNextLoading && <Loading top="lg" />}
                        </Fragment>
                    );
                }}
            </InfiniteScroll>
        );
    };

    return (
        <Root maxWidth="md">
            <Head title="Find new People" />

            {renderContent()}
        </Root>
    );
}

export default People;