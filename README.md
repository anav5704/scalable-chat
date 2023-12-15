# Scalable Web Socket Chat ⚡

![hero](https://github.com/anav5704/scalable-chat/blob/main/scalable-chat.png)

This a real time chat app made to be both vertically and horizontally scalable. Scaling web sockets is hard but it is made easy through the use of a Redis server. In this app, users can only send and receive messages in a global chat room. Using Redis make this extremely fast and truly real time.

## Technologies Used
- Next JS
- Node JS
- Redis Server
- Socket IO
- Turbo Repo

## Hosting
There are 3 main parts to this project, the Next JS app, the Node JS server and the Redis server. The Next JS app is hosted on [Vercel](https://vercel.com/dashboard), the Node JS server is hosted on [Render](https://render.com/) and the Redis sever is fully managed by [Aiven](https://aiven.io/redis). All of these have free tiers so feel free to check them out.

## Architecture
This project incorporates both a client/server architecture and and a pub/sub architecture. The Node JS server, which uses web sockets to listen for users connecting to the server, subscribes them to the Redis server on load. When a user sends a message, the web sockets pick it up and publish it to the Redis server which broadcasts it to all connected clients(regardless of which Node JS server published it).

## Getting Started

## Learning Resources
- [Scalable Realtime Chat App](https://www.youtube.com/watch?v=CQQc8QyIGl0)
- [WebSockets in 100 seconds](https://www.youtube.com/watch?v=1BfCnjr_Vjg)
- [What are monorepos?](https://www.youtube.com/watch?v=9iU_IE6vnJ8)
