import { defineRoute, router } from "./utils/define-route.js";
import compareID from "./utils/compare-users-id.js";
import {
  saveUsers,
  getUsers,
  savePosts,
  getPosts,
} from "./utils/db-operations.js";

let posts = getPosts();
let users = getUsers();

defineRoute("GET", "/users", (req, res) => {
  let status = 404;
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

  let status = 404;
  let message = "User not found";

  if (getUser) {
    status = 200;
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
    saveUsers(users);

    status = 201;
    message = newUser;
  }

  res.writeHead(status, { "Content-type": "application/json" });
  res.end(JSON.stringify(message));
});

defineRoute("PUT", "/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const getUser = users.find((user) => userId === user.id);

  let status = 404;
  let message = "The requested user is not found";

  const changeName = req.body.userName;
  const changeEmail = req.body.email;

  if (getUser) {
    if (changeName && changeEmail) {
      getUser.userName = changeName;
      getUser.email = changeEmail;

      for (const [index, user] of users.entries()) {
        if (user.id === getUser.id) {
          users[index] = getUser;
          saveUsers(users);
          break;
        }
      }

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

  let status = 404;
  let message = "The requested user is not found";

  for (let item of users) {
    if (userId === item.id) {
      item.userName = req.body.userName || item.userName;
      item.email = req.body.email || item.email;
      saveUsers(users);
      status = 200;
      message = item;
      break;
    }
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
  saveUsers(users);

  res.writeHead(status, { "Content-type": "application/json" });
  res.end(JSON.stringify(message));
});

defineRoute("GET", "/posts", (req, res) => {
  const sortedPostsById = compareID(posts);
  let message = "Posts not found";
  let status = 404;

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
  let status = 404;
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
  let status = 404;
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

defineRoute("POST", "/posts", (req, res) => {
  const sortedPostsById = compareID(posts);

  let message = "Unable to post this article";
  let status = 400;

  const userId = Number(req.body.userId);
  const id =
    sortedPostsById.reduce((acc, cur) => {
      return (acc = acc > cur.id ? acc : cur.id);
    }, 0) + 1;

  const title = req.body.title;
  const body = req.body.body;
  const reactions = Number(req.body.reactions);
  const tags = req.body.tags;

  const post = {
    id,
    title,
    body,
    userId,
    tags,
    reactions,
  };

  if (userId) {
    if (title && body && tags && reactions) {
      status = 201;
      message = post;

      posts.unshift(post);
      savePosts(posts);
    } else {
      message = "please provide all information about the article";
    }
  }

  res.writeHead(status, { "Content-type": "application/json" });
  res.end(JSON.stringify({ message }));
});

defineRoute("PATCH", "/posts/:id", (req, res) => {
  const postId = Number(req.params.id);

  let status = 404;
  let message = "Post not found";

  for (let item of posts) {
    if (postId === item.id) {
      item.title = req.body.title || item.title;
      item.body = req.body.body || item.body;
      item.reactions = Number(req.body.reactions) || item.reactions;
      item.tags = req.body.tags || item.tags;
      savePosts(posts);
      status = 200;
      message = item;
      break;
    }
  }

  res.writeHead(status, { "Content-type": "application/json" });
  res.end(JSON.stringify(message));
});

defineRoute("PATCH", "/posts/user/:id", (req, res) => {
  const userId = Number(req.params.id);
  const postId = Number(req.body.id);

  let status = 404;
  let message = "post not found";

  for (let item of posts) {
    if (userId === item.userId && postId === item.id) {
      item.title = req.body.title || item.title;
      item.body = req.body.body || item.body;
      item.reactions = Number(req.body.reactions) || item.reactions;
      item.tags = req.body.tags || item.tags;
      savePosts(posts);
      status = 200;
      message = item;
      break;
    }
  }

  res.writeHead(status, { "Content-type": "application/json" });
  res.end(JSON.stringify(message));
});

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
  savePosts(posts);

  res.writeHead(status, { "Content-type": "application/json" });
  res.end(JSON.stringify(message));
});

export default router;
