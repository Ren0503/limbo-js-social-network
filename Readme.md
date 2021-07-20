# LIMBO
![Limbo](https://github.com/Ren0503/limbo-js-social-network/blob/master/client/public/logo.png)
> Limbo  with M.E.R.N Stack and GraphQL. Repository is divided into 2 main packages: 
- **server** This package contains API for Social Networking App, built with Nodejs, Express, GraphQL, Apollo Server and MongoDB with Mongoose.
- **client** Is a frontend for app, built with React, GraphQL, Apollo Client and Styled Components.

## Features

- **Messenger** Real time messaging system.
- **Notifications** Get instant notification when someone follows/messages you or likes/comments on your post.
- **User Status** Check if user is Online or not in real time.
- **News Feed** Fresh posts from people you are following.
- **Explore** New Posts and People.
- **Follow** a particular user and get notified for their activity.
- **Personalize Profile** With profile/cover photo and personal posts.
- **Authentication & Authorization** with Password reset functionality.

### Server

| Plugin | README |
| ------ | ------ |
| apollo-server | [plugins/apollo-server/README.md](https://github.com/apollographql/apollo-server/blob/main/packages/apollo-server/README.md) |
| apollo-server-express | [plugins/apollo-server-express/README.md](https://github.com/apollographql/apollo-server/blob/main/packages/apollo-server-express/README.md) |
| bcryptjs | [plugins/bcryptjs/README.md](https://github.com/dcodeIO/bcrypt.js/blob/master/README.md) |
| cloudinary | [plugins/cloudinary/README.md](https://github.com/cloudinary/cloudinary_npm/blob/master/README.md) |
| cors | [plugins/cors/README.md](https://github.com/expressjs/cors/blob/master/README.md)|
| express | [plugins/express/README.md](https://github.com/expressjs/express/blob/master/Readme.md) |
| graphql | [plugins/graphql/README.md](https://github.com/graphql/graphql-js/blob/main/README.md)|
| graphql-tools | [plugins/graphql-tools/README.md](https://github.com/ardatan/graphql-tools/blob/master/README.md)|
| jsonwebtoken | [plugins/jsonwebtoken/README.md](https://github.com/auth0/node-jsonwebtoken/blob/master/README.md) |
| mongoose | [plugins/mongoose/README.md](https://github.com/Automattic/mongoose/blob/master/README.md) |
| subscriptions-transport-ws | [plugins/subscriptions-transport-ws/README.md](https://github.com/apollographql/subscriptions-transport-ws/blob/master/README.md) |
| nodemon | [plugins/nodemon/README.md](https://github.com/remy/nodemon/blob/master/README.md) |

### Client

| Plugin | README |
| ------ | ------ |
| @apollo/client | [plugins/@apollo/client/README.md](https://github.com/apollographql/apollo-client/blob/main/README.md) |
| graphql | [plugins/graphql/README.md](https://github.com/graphql/graphql-js/blob/main/README.md)|
| jwt-decode | [plugins/jwt-decode/README.md](https://github.com/auth0/jwt-decode/blob/master/README.md) |
| prop-types | [plugins/prop-types/README.md](https://github.com/facebook/prop-types/blob/master/README.md) |
| react | [plugins/react/README.md](https://github.com/facebook/react/blob/master/README.md) |
| react-router-dom | [plugins/react-router/README.md](https://github.com/ReactTraining/react-router/blob/master/README.md) |
| styled-components | [plugins/styled-components/README.md](https://github.com/styled-components/styled-components/blob/main/README.md)|
| subscriptions-transport-ws | [plugins/subscriptions-transport-ws/README.md](https://github.com/apollographql/subscriptions-transport-ws/blob/master/README.md) |

## Core Structure
    code
      ├── package.json
      │
      ├── client
      │   ├── public
      │   ├── src
      │   │   ├── assets
      │   │   ├── components
      │   │   ├── constants
      │   │   ├── graphql
      │   │   ├── hooks
      │   │   ├── layout
      │   │   ├── screens
      │   │   ├── store
      │   │   ├── styles
      │   │   ├── utils
      │   │   ├── App.js
      │   │   ├── routes.js
      │   │   ├── theme.js
      │   │   └── index.js
      │   │
      │   └── package.json
      │
      ├── server 
      │   ├── config
      │   ├── constants
      │   ├── models
      │   ├── resolvers
      │   ├── schema
      │   ├── utils
      │   ├── server.js
      │   ├── index.js
      │   └── package.json
      │
      ├── .gitignore
      └── README.md

### Screenshots


|                                        Home                                        |                                        Explore                                        |                                        People                                        |
| :--------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| ![](https://github.com/Ren0503/react-fullstack-social-network/blob/master/client/src/assets/screenshots/209358596_327975328821742_2710158796537880921_n.png) | ![](https://github.com/Ren0503/react-fullstack-social-network/blob/master/client/src/assets/screenshots/208629941_503018647448750_6931958110622238631_n.png) | ![](https://github.com/Ren0503/react-fullstack-social-network/blob/master/client/src/assets/screenshots/208619752_1237298446701253_1190424865250211487_n.png) |

|                                        Notification                                        |                                        Messages                                        |                                        Auth                                        |
| :--------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| ![](https://github.com/Ren0503/react-fullstack-social-network/blob/master/client/src/assets/screenshots/209605937_330883225195602_2742746821014700587_n.png) | ![](https://github.com/Ren0503/react-fullstack-social-network/blob/master/client/src/assets/screenshots/209408194_1499350860401584_9011862527090200689_n.png) | ![](https://github.com/Ren0503/react-fullstack-social-network/blob/master/client/src/assets/screenshots/203589467_324703812523322_2343031291932701555_n.png) |