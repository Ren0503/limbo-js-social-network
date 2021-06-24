import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { generatePath } from 'react-router-dom';

import { Spacing } from 'styles/Layout';
import { Loading } from 'styles/Loading';

import PostPopup from 'components/post/PostPopup';
import PostCard from 'components/post/PostCard';
import Modal from 'components/shared/Modal';
import Empty from 'components/shared/Empty';
import Skeleton from 'components/shared/Skeleton';
import InfiniteScroll from 'components/shared/InfiniteScroll';

import { PROFILE_PAGE_POSTS_LIMIT } from 'constants/DataLimit';

import { GET_USER_POSTS } from 'graphql/user';

import * as Routes from 'routes';

/**
 * Renders posts in profile 
 */
const ProfilePosts = ({ username }) => {
    const [isPostPopupOpen, setIsPostPopupOpen] = useState(false);
    const [modalPostId, setModalPostId] = useState('');
    const variables = { username, skip: 0, limit: PROFILE_PAGE_POSTS_LIMIT };
    const { data, loading, fetchMore, networkStatus } = useQuery(GET_USER_POSTS, {
        variables,
        notifyOnNetworkStatusChange: true,
    });

    const closeModal = () => {
        window.history.pushState('', '', generatePath(Routes.USER_PROFILE, { username }));
        setIsPostPopupOpen(false)
    };

    const openModal = (postId) => {
        window.history.pushState('', '', generatePath(Routes.POST, { id: postId }));
        setModalPostId(postId);
        setIsPostPopupOpen(true);
    };

    if (loading && networkStatus === 1) {
        return <Skeleton height={500} bottom="lg" top="lg" count={PROFILE_PAGE_POSTS_LIMIT} />;
    }

    const { posts, count } = data.getUserPosts;
    if (!posts.length > 0) {
        return (
            <Spacing bottom="lg">
                <Empty text="No posts yet." />
            </Spacing>
        );
    }

    return (
        <InfiniteScroll
            data={posts}
            dataKey="getPosts.posts"
            count={parseInt(count)}
            variables={variables}
            fetchMore={fetchMore}
        >
            {(data) => {
                return data.map((post, i) => {
                    const showNextLoading = loading && networkStatus === 3 && count !== data.length;
                    
                    return (
                        <Fragment key={post.id}>
                            {modalPostId === post.id && (
                                <Modal open={isPostPopupOpen} onClose={closeModal}>
                                    <PostPopup id={post.id} closeModal={closeModal} />
                                </Modal>
                            )}

                            <Spacing bottom="lg">
                                <PostCard 
                                    author={post.author}
                                    postId={post.id}
                                    imagePublicId={post.imagePublicId}
                                    comments={post.comments}
                                    title={post.title}
                                    image={post.image}
                                    likes={post.likes}
                                    createdAt={post.createdAt}
                                    openModal={() => openModal(post.id)}
                                />
                            </Spacing>
    
                            {showNextLoading && <Loading top="lg" />}
                        </Fragment>
                    );
                });
            }}
        </InfiniteScroll>
    );
}

ProfilePosts.propTypes = {
    username: PropTypes.string.isRequired,
};

export default ProfilePosts;