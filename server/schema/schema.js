import { gql } from "apollo-server-core";

import UserSchema from './userSchema';
import PostSchema from './postSchema';
import LikeSchema from './likeSchema';
import FollowSchema from './followSchema';
import CommentSchema from './commentSchema';
import MessageSchema from './messageSchema';
import NotificationSchema from './notificationSchema';

const schema = gql`
    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }

    type Subscription {
        _empty: String
    }

    ${UserSchema}
    ${PostSchema}
    ${LikeSchema}
    ${FollowSchema}
    ${CommentSchema}
    ${MessageSchema}
    ${NotificationSchema}
`;

export default schema;