import userResolver from './userResolver';
import postResolver from './postResolver';
import likeResolver from './likeResolver';
import followResolver from './followResolver';
import commentResolver from './commentResolver';
import notificationResolver from './notificationResolver';
import message from './messageResolver';

export default [
    userResolver,
    postResolver,
    likeResolver,
    followResolver,
    commentResolver,
    notificationResolver,
    message,
];