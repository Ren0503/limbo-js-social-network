import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { Content } from 'styles/Layout';
import PostPopup from 'components/post/PostPopup';

/**
 * Post detail
 */
const Post = ({ match }) => {
    return (
        <Content>
            <PostPopup usedInModal={false} id={match.params.id} />
        </Content>
    );
}

Post.propTypes = {
    match: PropTypes.object.isRequired,
};

export default withRouter(Post);