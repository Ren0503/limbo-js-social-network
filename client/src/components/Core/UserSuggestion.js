import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { matchPath } from 'react-router';
import { generatePath } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Loading } from 'styles/Loading';
import { H3, A } from 'styles/Text';
import { Spacing } from 'styles/Layout';

import Avatar from 'components/shared/Avatar';

import { useStore } from 'store';

import { USER_SUGGESTIONS } from 'graphql/user';

import { USER_SUGGESTIONS_WIDTH, HEADER_HEIGHT } from 'constants/Layout';

import * as Routes from 'routes';

const Root = styled.div`
    display: none;
    background-color: ${(p) => p.theme.colors.white};
    border: 1px solid ${(p) => p.theme.colors.border.main};
    position: sticky;
    top: ${HEADER_HEIGHT + 40}px;
    right: 0;
    height: 100%;
    width: ${USER_SUGGESTIONS_WIDTH}px;
    padding: ${(p) => p.theme.spacing.sm};
    border-radius: ${(p) => p.theme.radius.sm};

    @media (min-width: ${(p) => p.theme.screen.md}) {
        display: block;
    }
`;

const List = styled.ul`
    padding: 0;
    padding-top: ${(p) => p.theme.spacing.xs};
`;

const ListItem = styled.li`
    list-style-type: none;
    display: flex;
    flex-direction: row;
    margin-bottom: ${(p) => p.theme.spacing.sm};

    &:last-child {
        margin-bottom: 0;
    }
`;

const FullName = styled.div`
    font-weight: ${(p) => p.theme.font.weight.bold};
    color: ${(p) => (p.active ? p.theme.colors.primary.main : p.theme.colors.text.primary)};
`;

const UserName = styled.div`
    color: ${(p) => p.theme.colors.text.hint};
`;

/**
 * Displays user suggestions
 */
const UserSuggestions = ({ pathname }) => {
    const [{ auth }] = useStore();
    const { data, loading } = useQuery(USER_SUGGESTIONS, {
        variables: { userId: auth.user.id },
    });

    const hideUserSuggestions = matchPath(pathname, {
        path: [Routes.MESSAGES, Routes.PEOPLE, Routes.EXPLORE, Routes.USER_PROFILE],
    });

    if (hideUserSuggestions)    return null;

    if (loading) {
        return (
            <Root>
                <Loading />
            </Root>
        );
    }

    if (!data.suggestPeople.length > 0) {
        return null;
    }

    return (
        <Root>
            <H3>Suggestion For You</H3>

            <List>
                {data.suggestPeople.map((user) => {
                    if(!user.username)  return null;

                    return (
                        <ListItem key={user.id}>
                            <A 
                                to={generatePath(Routes.USER_PROFILE, {
                                    username: user.username,
                                })}
                            >
                                <Avatar image={user.image} />
                            </A>

                            <Spacing left="xs">
                                <A 
                                    to={generatePath(Routes.USER_PROFILE, {
                                        username: user.username
                                    })}
                                >
                                    <FullName>{user.fullName}</FullName>
                                    <UserName>@{user.username}</UserName>
                                </A>
                            </Spacing>
                        </ListItem>
                    )
                })}
            </List>
        </Root>
    );
}

UserSuggestions.propTypes = {
    pathname: PropTypes.string.isRequired,
};

export default UserSuggestions;