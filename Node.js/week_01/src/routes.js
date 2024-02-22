import { defineRoute, router } from "./utils/define-route.js";
import compareUsersID from "./utils/compareUsersID.js";

let posts = [
  {
    id: 1,
    title: "Handball",
    body: "Handball is a team sport in which two teams of seven players each pass a ball using their hands with the aim of throwing it into the goal of the opposing team. A standard match consists of two periods of 30 minutes, and the team that scores more goals wins.",
    userId: 2,
    tags: ["sport", "handballplayer", "handballtime"],
    reactions: 3,
  },
  {
    id: 1,
    title: "Swimming",
    body: "Swimming is an individual or team racing sport that requires the use of one's entire body to move through water. The sport takes place in pools or open water.",
    userId: 4,
    tags: ["sport", "swimmingtime", "openwater"],
    reactions: 3,
  },
  {
    id: 3,
    title: "Basketball",
    body: "Basketball is a team sport in which two teams, most commonly of five players each, opposing one another on a rectangular court, compete with the primary objective of shooting a basketball through the defender's hoop, while preventing the opposing team from shooting through their own hoop.",
    userId: 2,
    tags: ["sport", "basketballplayer", "basketballtime"],
    reactions: 3,
  },
];

let users = [
  { id: 1, userName: "Anna", email: "anna@anna.com" },
  { id: 2, userName: "Peter", email: "peter@peter.com" },
  { id: 3, userName: "John", email: "john@john.com" },
  { id: 4, userName: "Sarah", email: "sarah@sarah.com" },
];

defineRoute("GET", "/users", (req, res) => {
  if (users.length > 0) {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify(users));
  } else {
    res.writeHead(400, { "Content-type": "application/json" });
    res.end("Users not found");
  }
});

defineRoute("GET", "/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const getUser = users.find((user) => userId === user.id);

  if (getUser) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(getUser));
  } else {
    res.writeHead(400, { "Content-type": "application/json" });
    res.end("User not found");
  }
});

defineRoute("POST", "/users", (req, res) => {
  const sortUsersById = compareUsersID(users);

  const id =
    sortUsersById.reduce((acc, cur) => {
      return (acc = acc > cur.id ? acc : cur.id);
    }, 0) + 1;

  const userName = req.body.userName;
  const email = req.body.email;
  const newUser = { id, userName, email };

  if (userName && email) {
    users.unshift(newUser);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newUser));
  } else {
    res.writeHead(400, { "Content-type": "application/json" });
    res.end("Please provide your username and email");
  }
});

// defineRoute("PUT", "/users/:id", (req, res) => {
//   const userId = Number(req.params.id);
//   const getUser = users.find((user) => userId === user.id);

//   const updateUser = req.body;

//   if (getUser) {
//     if (changeName && changeEmail) {
//       getUser.userName = changeName;
//       getUser.email = changeEmail;

//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.end(JSON.stringify(getUser));
//     }
//     res.writeHead(400, { "Content-Type": "application/json" });
//     res.end(JSON.stringify("please provide your new name and email"));
//   }

//   res.writeHead(404, { "Content-type": "application/json" });
//   res.end(JSON.stringify({ message: "User not found" }));
// });

defineRoute("PUT", "/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const getUser = users.find((user) => userId === user.id);

  const changeName = req.body.userName;
  const changeEmail = req.body.email;

  if (getUser && changeName && changeEmail) {
    getUser.userName = changeName;
    getUser.email = changeEmail;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(getUser));
  } else {
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "User not found" }));
  }
});

defineRoute("PATCH", "/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const getUser = users.find((user) => userId === user.id);

  const changeName = req.body.userName;
  const changeEmail = req.body.email;

  if (getUser) {
    getUser.userName = changeName || getUser.userName;
    getUser.email = changeEmail || getUser.email;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(getUser));
  } else {
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "User not found" }));
  }
});

defineRoute("DELETE", "/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const getUser = users.find((user) => userId === user.id);
  const indexOfUser = users.indexOf(getUser);

  if (!getUser) {
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "User not found" }));
  } else {
    users.splice(indexOfUser, 1);

    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "User deleted" }));
  }
});

defineRoute("GET", "/posts", (req, res) => {
  if (posts.length > 0) {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify(posts));
  } else {
    res.writeHead(400, { "Content-type": "application/json" });
    res.end("Posts not found");
  }
});

defineRoute("GET", "/posts/:id", (req, res) => {
  const userId = Number(req.params.id);
  const getUser = users.find((user) => userId === user.id);

  if (getUser) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(getUser));
  } else {
    res.writeHead(400, { "Content-type": "application/json" });
    res.end("User not found");
  }
});

export default router;
