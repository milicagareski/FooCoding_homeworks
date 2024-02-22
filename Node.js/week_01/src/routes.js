import { defineRoute, router } from "./utils/define-route.js";
import compareID from "./utils/compareUsersID.js";

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
    id: 2,
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
  let status = 400;
  let message = "Users not found";
  if (users.length > 0) {
    status = 200;
    message = users;
  }
  res.writeHead(status, { "Content-type": "application/json" });
  res.end(JSON.stringify(message));
});

defineRoute("GET", "/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const getUser = users.find((user) => userId === user.id);

  let status = 400;
  let message = "User not found";

  if (getUser) {
    status = 400;
    message = getUser;
  }
  res.writeHead(status, { "Content-type": "application/json" });
  res.end(JSON.stringify(message));
});

defineRoute("POST", "/users", (req, res) => {
  const sortUsersById = compareID(users);

  const id =
    sortUsersById.reduce((acc, cur) => {
      return (acc = acc > cur.id ? acc : cur.id);
    }, 0) + 1;

  const userName = req.body.userName;
  const email = req.body.email;
  const newUser = { id, userName, email };

  let status = 400;
  let message = "Please provide your username and email";

  if (userName && email) {
    users.unshift(newUser);

    status = 200;
    message = newUser;
  }
  res.writeHead(status, { "Content-type": "application/json" });
  res.end(JSON.stringify(message));
});

defineRoute("PUT", "/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const getUser = users.find((user) => userId === user.id);

  let status = 400;
  let message = "user not found";

  const changeName = req.body.userName;
  const changeEmail = req.body.email;

  if (getUser) {
    if (changeName && changeEmail) {
      getUser.userName = changeName;
      getUser.email = changeEmail;
      status = 200;
      message = getUser;
    } else {
      status = 400;
      message = "please provide your new name and email";
    }
  }

  res.writeHead(status, { "Content-type": "application/json" });
  res.end(JSON.stringify(message));
});

defineRoute("PATCH", "/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const getUser = users.find((user) => userId === user.id);

  const changeName = req.body.userName;
  const changeEmail = req.body.email;

  let status = 400;
  let message = "User not found";

  if (getUser) {
    getUser.userName = changeName || getUser.userName;
    getUser.email = changeEmail || getUser.email;

    status = 200;
    message = getUser;
  }
  res.writeHead(status, { "Content-type": "application/json" });
  res.end(JSON.stringify(message));
});

defineRoute("DELETE", "/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const getUser = users.find((user) => userId === user.id);
  const indexOfUser = users.indexOf(getUser);

  let status = 200;
  let message = "User deleted";

  if (!getUser) {
    status = 404;
    message = "User not found";
  }
  users.splice(indexOfUser, 1);

  res.writeHead(status, { "Content-type": "application/json" });
  res.end(JSON.stringify(message));
});

defineRoute("GET", "/posts", (req, res) => {
  const sortedPostsById = compareID(posts);
  let message = "Posts not found";
  let status = 400;

  if (sortedPostsById.length > 0) {
    status = 200;
    message = sortedPostsById;
  }
  res.writeHead(status, { "Content-type": "application/json" });
  res.end(JSON.stringify({ message }));
});

defineRoute("GET", "/posts/:id", (req, res) => {
  const postId = Number(req.params.id);
  const getPostById = posts.find((post) => postId === post.id);
  let status = 400;
  let message = "post not found";

  if (getPostById) {
    status = 200;
    message = getPostById;
  }
  res.writeHead(status, { "Content-type": "application/json" });
  res.end(JSON.stringify({ message }));
});

defineRoute("GET", "/posts/user/:id", (req, res) => {
  const userId = Number(req.params.id);
  const getUser = users.find((user) => userId === user.id);
  let status = 400;
  let message = "user not found";

  if (getUser) {
    const getUserPosts = posts.filter((post) => {
      return post.userId === getUser.id;
    });
    if (getUserPosts.length > 0) {
      status = 200;
      message = getUserPosts;
    } else {
      message = "This user don't have any posts";
    }
  }
  res.writeHead(status, { "Content-type": "application/json" });
  res.end(JSON.stringify({ message }));
});

defineRoute("POST", "/posts/:id", (req, res) => {
  const sortedPostsById = compareID(posts);

  let message = "user not found";
  let status = 400;

  const userId = Number(req.params.id);
  const id =
    sortedPostsById.reduce((acc, cur) => {
      return (acc = acc > cur.id ? acc : cur.id);
    }, 0) + 1;

  const title = req.body.title;
  const body = req.body.body;
  const reactions = Number(req.body.reactions);
  const tags = req.body.tags;
  const postTags = tags.split(" ");

  const post = {
    id,
    title,
    body,
    userId,
    postTags,
    reactions,
  };

  if (userId) {
    if (title && body && postTags && reactions) {
      status = 200;
      message = post;

      posts.unshift(post);
    } else {
      status = 400;
      message = "please provide all information about the post";
    }
  }

  res.writeHead(status, { "Content-type": "application/json" });
  res.end(JSON.stringify({ message }));
});

defineRoute("PATCH", "/posts/:id", (req, res) => {
  const postId = Number(req.params.id);
  const post = posts.find((item) => postId === item.id);

  const title = req.body.title;
  const body = req.body.body;
  const reactions = Number(req.body.reactions);
  const tags = req.body.tags;

  let status = 400;
  let message = "Post not found";

  if (post) {
    post.title = title || post.title;
    post.body = body || post.body;
    post.reactions = reactions || post.reactions;
    post.tags = tags || post.tags;

    status = 200;
    message = post;
  }

  res.writeHead(status, { "Content-type": "application/json" });
  res.end(JSON.stringify(message));
});

// defineRoute("PATCH", "/posts/user/:id/:sport", (req, res) => {
//   const postId = Number(req.params.id);
//   const sportName = req.params.sport;
//   const UserPosts = posts.filter((post) => postId === post.userId);
//   console.log(UserPosts);
//   const findPost = UserPosts.filter((post) => console.log(post.title));

//   console.log(findPost);
//   res.end("hi");
// });

defineRoute("DELETE", "/posts/:id", (req, res) => {
  const postId = Number(req.params.id);
  const getPost = posts.find((post) => postId === post.id);
  const indexOfPost = posts.indexOf(getPost);

  let status = 200;
  let message = "Post deleted";

  if (!getPost) {
    status = 404;
    message = "Post not found";
  }
  posts.splice(indexOfPost, 1);

  res.writeHead(status, { "Content-type": "application/json" });
  res.end(JSON.stringify(message));
});

export default router;
