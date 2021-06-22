import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { generatePath } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { A } from 'styles/Text';
import { Spacing, Container } from 'styles/Layout';
import { Loading } from 'styles/Loading';

import CreatePost from 'components/Post/CreatePost'
import PostPopup from 'components/Post/PostPopup';
import PostCard from 'components/Post/PostCard';
import InfiniteScroll from 'components/Shared/InfiniteScroll';
import Skeleton from 'components/Shared/Skeleton';
import Modal from 'components/Shared/Modal';
import Head from 'components/Shared/Head';

import { GET_FOLLOWED_POSTS } from 'graphql/post';

import { useStore } from 'store';

import { HOME_PAGE_POSTS_LIMIT } from 'constants/DataLimit';

import * as Routes from 'routes';

const Empty = styled.div`
    padding: ${(p) => p.theme.spacing.sm};
    border: 1px solid ${(p) => p.theme.colors.border.main};
    border-radius: ${(p) => p.theme.radius.sm};
    margin-top: ${(p) => p.theme.spacing.lg};
    background-color: ${(p) => p.theme.colors.white};
`;

const StyledA = styled(A)`
    text-decoration: underline;
    font-weight: ${(p) => p.theme.font.weight.bold};
`;

/**
 * Home of web
 */
const Home = () => {
    const [{ auth }] = useStore();
    const [modalPostId, setModalPostId] = useState(null);
    const variables = {
        userId: auth.user.id,
        skip: 0,
        limit: HOME_PAGE_POSTS_LIMIT,
    };
    const { data, loading, fetchMore, networkStatus } = useQuery(GET_FOLLOWED_POSTS, {
        variables,
        notifyOnNetworkStatusChange: true,
    });

    const closeModal = () => {
        window.history.pushState('', '', '/');
        setModalPostId(null);
    };

    const openModal = (postId) => {
        window.history.pushState('', '', generatePath(Routes.POST, { id: postId }));
        setModalPostId(postId);
    };

    const renderContent = () => {
        if (loading && networkStatus === 1) {
            return <Skeleton height={500} bottom="lg" top="lg" count={HOME_PAGE_POSTS_LIMIT} />;
        }

        const { posts, count } = data.getFollowedPosts;
        if (!posts.length) {
            return (
                <Empty>
                    <StyledA to={generatePath(Routes.EXPLORE)}>Explore new posts</StyledA>
                    <StyledA to={generatePath(Routes.PEOPLE)}>Find new people</StyledA>
                </Empty>
            );
        }

        return (
            <InfiniteScroll
                data={posts}
                dataKey="getFollowedPosts.posts"
                count={parseInt(count)}
                variables={variables}
                fetchMore={fetchMore}
            >
                {(data) => {
                    const showNextLoading = loading && networkStatus === 3 && count !== data.length;

                    return (
                        <Fragment>
                            {data.map((post) => (
                                <Fragment key={post.id}>
                                    <Modal open={modalPostId === post.id} onClose={closeModal}>
                                        <PostPopup id={post.id} closeModal={closeModal} />
                                    </Modal>

                                    <Spacing bottom="lg" top="lg">
                                        <PostCard 
                                            author={post.author}
                                            imagePublicId={post.imagePublicId}
                                            postId={post.id}
                                            comments={post.comments}
                                            createdAt={post.createdAt}
                                            title={post.title}
                                            images={post.image}
                                            likes={post.likes}
                                            openModal={() => openModal(post.id)}
                                        />
                                    </Spacing>
                                </Fragment>
                            ))}

                            {showNextLoading && <Loading top="lg" />}
                        </Fragment>
                    );
                }}
            </InfiniteScroll>
        );
    };

    return (
        <Container maxWidth="sm">
            <Head />

            <Spacing top="lg" />

            <CreatePost />

            {renderContent()}
        </Container>
    );
}

export default Home;