import { gql } from '@apollo/client';

/**
 * Creates a follow between two users
 */
export const CREATE_FOLLOW = gql`
    mutation($input: CreateFollowInput!) {
        createFollow(input: $input) {
            id
        }
    }
`;

/**
 * Deletes a following
 */
export const DELETE_FOLLOW = gql`
    mutation($input: DeleteFollowInput!) {
        deleteFollow(input: $input) {
            id
        }
    }
`;