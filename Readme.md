# LIMBO
![Limbo](https://github.com/Ren0503/limbo-js-social-network/blob/master/client/src/assets/header.png)
> Trang mạng xã hội Limbo với M.E.R.N Stack và GraphQL. Repo chia làm hai phần chính:
- **server** Là package chứa API cho ứng dụng, sử dụng Node.js, Express, GraphQL, Apollo Server và MongoDB với Mongoose.
- **client** là trang giao diện của ứng dụng, sử dụng React, GraphQL, Apollo Client và Styled Components.

## Chức năng
- **Messager** nhắn tin thời gian thực.
- **Notifications** nhận thông báo khi có người theo dõi, nhắn tin hay like/comment trên bài đăng của bạn.
- **User Status** kiểm tra người dùng đang hoạt động.
- **News feed** hiển thị bài đăng theo người bạn đang theo dõi.
- **Explore** khám phá bài đăng và người dùng.
- **Follow** theo dõi người dùng bạn thích.
- **Personalize Profile** avatar và background và bài đăng người dùng.
- **Authentication & Authorization** chức năng reset mật khẩu.

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

## Cấu trúc thư mục
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
| ![](https://github.com/Ren0503/limbo-js-social-network/blob/master/client/src/assets/screenshots/home.png) | ![](https://github.com/Ren0503/limbo-js-social-network/blob/master/client/src/assets/screenshots/explore.png) | ![](https://github.com/Ren0503/limbo-js-social-network/blob/master/client/src/assets/screenshots/people.png) |

|                                        Notification                                        |                                        Messages                                        |                                        Profile                                        |
| :--------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| ![](https://github.com/Ren0503/limbo-js-social-network/blob/master/client/src/assets/screenshots/notification.png) | ![](https://github.com/Ren0503/limbo-js-social-network/blob/master/client/src/assets/screenshots/message.png) | ![](https://github.com/Ren0503/limbo-js-social-network/blob/master/client/src/assets/screenshots/profile.png) |