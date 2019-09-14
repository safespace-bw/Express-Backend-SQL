# Safe Space Backend - Build Week 3

## Table of Contents

- Overview
- Tech Stack
- API Endpoints
- Credits

## Overview

This app allows users to login, write positive affirmations and schedule them to be sent via SMS to themselves throughout their busy days.

```
1. Node.js
2. Express
3. PostgreSQL
4. Jest
5. BCryptJS
6. JWT
7. Faker
8. Twilio
```

## API Endpoints

### Authentication

| Method | Endpoint           | Description                                                                                                                                                                             |
| ------ | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /api/auth/register | Creates a `user` using the information sent inside the `body` of the request. The `body` should be `username` and `password` Returns `user_id` and `JSON Web Token`                                                                    |
| POST   | /api/auth/login    | Uses the credentials sent inside the `body` (`username` and `password`) returns `user_id` and `JSON Web Token(JWT)` |

### Profiles

| Method | Endpoint          | Description                                                                                                                                                                                                |
| ------ | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /api/profiles     | Creates a `profile` for the current user using the information sent inside the `body` of the request. The body should include `name`, `phone`, `email`, `timezone`, `picture`, `mood`, `birthday`          |
| GET    | /api/profiles     | Shows the profile of the user currently logged in. (Checks `JWT` and `id` in headers)                                                                                                                      |
| PUT    | /api/profiles/:id | Updates the `profile` for the id sent in the request using the information sent inside the `body` of the request. The body can include `name`, `phone`, `email`, `timezone`, `picture`, `mood`, `birthday` |

### Messages

| Method | Endpoint          | Description                                                                                                                                                                                      |
| ------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| POST   | /api/messages     | Creates a new `message` for the current user using the information sent inside the `body` of the request. The body should include `body`, `scheduled`                                            |
| GET    | /api/messages     | Shows all messages of the user currently logged in. (Checks `JWT` and `id` in headers)                                                                                                           |
| GET    | /api/messages/:id | Shows the message of the user currently logged in. With that ID (Checks `JWT` and `id` in headers)                                                                                               |
| PUT    | /api/messages/:id | Updates the `message` for the id sent in the request using the information sent inside the `body` of the request. The body can include `body`, `scheduled`. If no message is found returns `404` |
| DELETE | /api/messages/:id | Deletes the `message` for the id sent in the request. If no message is found returns `404`                                                                                                       |

## Credits

### Backend

Jonas Walden: https://github.com/UnknownMonk  
Gill Abada: https://github.com/gabada

### Frontend

Austin James: https://github.com/AJLambda

### Team Lead

Liz Baker: https://github.com/LizBaker

### User Interface

Sydney Crumley: https://github.com/srsimps19
