import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Header from 'components/core/Header';
import SideBar from 'components/core/SideBar';
import UserSuggestions from 'components/core/UserSuggestion';
import NotFound from 'components/shared/NotFound';

import Home from 'screens/Home';
import Profile from 'screens/Profile';
import Explore from 'screens/Explore';
import People from 'screens/People';
import Notifications from 'screens/Notifications';
import Post from 'screens/Post';
import Messages from 'screens/Messages';

import { useWindowSize } from 'hooks/useWindowSize';
import { useClickOutside } from 'hooks/useClickOutside';

import * as Routes from 'routes';

import theme from 'theme';

import { useStore } from 'store';
import { SET_AUTH_USER } from 'store/auth';

const Root = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    width: 100%;
    position: relative;

    @media (min-width: ${(p) => p.theme.screen.md}) {
        width: ${(p) => p.theme.screen.md};
    }

    @media (min-width: ${(p) => parseInt(p.theme.screen.lg, 10) + 20 + 'px'}) {
        width: ${(p) => p.theme.screen.lg};
    }
`;

/**
 * Main layout of the app, when user is authenticated
 */
const MainLayout = ({ location, authUser }) => {
    const [{ auth }, dispatch] = useStore();

    const windowSize = useWindowSize();
    const isDesktop = windowSize.width >= parseInt(theme.screen.md, 10);
    const [isSideBarOpen, setIsSideBarOpen] = useState(isDesktop)    ;

    const sideBarRef = useRef('');

    useEffect(() => {
        dispatch({ type: SET_AUTH_USER, payload: authUser });
    }, [dispatch, authUser]);

    useClickOutside(sideBarRef, () => {
        if (!isDesktop && isSideBarOpen) {
            setIsSideBarOpen(false);
        }
    });

    useEffect(() => {
        setIsSideBarOpen(isDesktop);
    }, [isDesktop]);

    useEffect(() => {
        return () => {
            if (!isDesktop) {
                setIsSideBarOpen(false);
            }
        };
    }, [location.pathname, isDesktop]);

    if (!auth.user) return null;

    return(
        <>
            <Header toggleSideBar={() => setIsSideBarOpen(!isSideBarOpen)} />

            <Root>
                <SideBar isOpen={isSideBarOpen} sideBarRef={sideBarRef} />

                <Switch>
                    <Route exact path={Routes.HOME} component={Home} />

                    <Route exact path={Routes.EXPLORE} component={Explore} />

                    <Route exact path={Routes.PEOPLE} component={People} />

                    <Route exact path={Routes.NOTIFICATIONS} component={Notifications} />

                    <Route exact path={Routes.MESSAGES} component={Messages} />

                    <Route exact path={Routes.USER_PROFILE} component={Profile} />

                    <Route exact path={Routes.POST} component={Post} />

                    <Route component={NotFound} />
                </Switch>

                <UserSuggestions pathname={location.pathname} />
            </Root>
        </>
    );
}

MainLayout.propTypes = {
    location: PropTypes.object.isRequired,
    authUser: PropTypes.object.isRequired,
};

export default withRouter(MainLayout);