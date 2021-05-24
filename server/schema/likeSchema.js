import { gql } from 'apollo-server-express';

/**
 * Like schema
 */
const LikeSchema = gql`
    # ---------------------------------------
    # Model Object
    # ---------------------------------------
    type Like {
        id: ID!
        post: ID
        user: ID
    }

    # ---------------------------------------
    # Input Objects
    # ---------------------------------------
    input CreateLikeInput {
        userId: ID!
        postId: ID!
    }

    input DeleteLikeInput {
        id: ID!
    }

    # ----------------------------------------
    # Return Payloads
    # ----------------------------------------
    type LikePayload {
        id: ID!
        post: PostPayload
        user: UserPayload
    }

    # -----------------------------------------
    # Mutation
    # -----------------------------------------
    extend type Mutation {
        # Creates a like for post
        createLike(input: CreateLikeInput!): Like

        # Delete a post like
        deleteLike(input: DeleteLikeInput): Like
    }
`;

export default LikeSchema;