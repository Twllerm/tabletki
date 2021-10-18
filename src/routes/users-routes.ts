import { Router } from "express";
import { Session } from "inspector";

const usersRouter = Router();

type UserRole = "admin" | "subscriber";

type User = {
  id: string;
  login: string;
  password: string;
  role: UserRole;
};

type UserSession = {
  userId: string;
  token: string;
};

const users: User[] = [];
const sessions: UserSession[] = [];

usersRouter.post("/register", (request, response) => {
  const newUser: User = {
    id: String(users.length + 1),
    login: request.body.login,
    password: request.body.password,
    role: "admin",
  };

  users.push(newUser);

  response.json(newUser);
});

usersRouter.post("/login", (request, response) => {
  const user = users.find(
    (item) =>
      item.login === request.body.login &&
      item.password === request.body.password
  );

  if (!user) {
    response.status(401).json();

    return;
  }

  const session: UserSession = {
    userId: user.id,
    token: Math.random().toString(),
  };

  sessions.push(session);

  response.cookie("sessionToken", session.token);

  response.json(session);
});

usersRouter.get("/me", (request, response) => {
  const token = request.cookies.sessionToken;

  console.log(token);

  const session = sessions.find((item) => String(item.token) === String(token));

  console.log(sessions);

  if (!session) {
    response.status(401).json();

    return;
  }

  const user = users.find((item) => item.id === session.userId);

  response.json(user);
});

export { usersRouter };
