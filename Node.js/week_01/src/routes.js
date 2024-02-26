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

  if (users.length >= 0) {
    status = 200;
    message = users.filter((u) => !u.deleted);
  }

  res.writeHead(status, { "Content-type": "application/json" });
  res.end(JSON.stringify(message));
});

defineRoute("GET", "/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const getUser = users.find((user) => userId === user.id && !user.deleted);

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
  const newUser = { id, userName, email, deleted: false };

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
  const getUser = users.find((user) => userId === user.id && !user.deleted);

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

  for (let user of users) {
    if (userId === user.id && !user.deleted) {
      user.userName = req.body.userName || user.userName;
      user.email = req.body.email || user.email;
      saveUsers(users);
      status = 200;
      message = user;
      break;
    }
  }

  res.writeHead(status, { "Content-type": "application/json" });
  res.end(JSON.stringify(message));
});

defineRoute("DELETE", "/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const getUser = users.find((user) => userId === user.id && !user.deleted);

  let status = 400;
  let message = "User delete failed";

  if (getUser) {
    getUser.deleted = true;

    for (const [index, user] of users.entries()) {
      if (user.id === getUser.id) {
        users[index] = getUser;
        saveUsers(users);
        break;
      }
    }

    status = 200;
    message = "User deleted successfully";
  }

  res.writeHead(status, { "Content-type": "application/json" });
  res.end(JSON.stringify(message));
});

defineRoute("GET", "/posts", (req, res) => {
  const sortedPostsById = compareID(posts);
  let message = "Posts not found";
  let status = 404;

  if (sortedPostsById.length >= 0) {
    status = 200;
    message = sortedPostsById.filter((p) => !p.deleted);
  }

  res.writeHead(status, { "Content-type": "application/json" });
  res.end(JSON.stringify({ message }));
});

defineRoute("GET", "/posts/:id", (req, res) => {
  const postId = Number(req.params.id);
  const getPostById = posts.find((post) => postId === post.id && !post.deleted);
  let status = 404;
  let message = "Post not found";

  if (getPostById) {
    status = 200;
    message = getPostById;
  }

  res.writeHead(status, { "Content-type": "application/json" });
  res.end(JSON.stringify({ message }));
});

defineRoute("GET", "/posts/user/:id", (req, res) => {
  const userId = Number(req.params.id);
  const getUser = users.find((user) => userId === user.id && !user.deleted);
  let status = 404;
  let message = "user not found";

  if (getUser) {
    const getUserPosts = posts.filter((post) => {
      return post.userId === getUser.id && !post.deleted;
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
    deleted: false,
  };

  if (userId) {
    if (title && body && tags && reactions) {
      status = 201;
      message = post;

      posts.unshift(post);
      savePosts(posts);
    } else {
      message = "Please provide all information about the article";
    }
  }

  res.writeHead(status, { "Content-type": "application/json" });
  res.end(JSON.stringify({ message }));
});

defineRoute("PATCH", "/posts/:id", (req, res) => {
  const postId = Number(req.params.id);

  let status = 404;
  let message = "Post not found";

  for (let post of posts) {
    if (postId === post.id && !post.deleted) {
      post.title = req.body.title || post.title;
      post.body = req.body.body || post.body;
      post.reactions = Number(req.body.reactions) || post.reactions;
      post.tags = req.body.tags || post.tags;
      savePosts(posts);
      status = 200;
      message = post;
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
  let message = "Post not found";

  for (let post of posts) {
    if (userId === post.userId && postId === post.id && !post.deleted) {
      post.title = req.body.title || post.title;
      post.body = req.body.body || post.body;
      post.reactions = Number(req.body.reactions) || post.reactions;
      post.tags = req.body.tags || post.tags;
      savePosts(posts);
      status = 200;
      message = post;
      break;
    }
  }

  res.writeHead(status, { "Content-type": "application/json" });
  res.end(JSON.stringify(message));
});

defineRoute("DELETE", "/posts/:id", (req, res) => {
  const postId = Number(req.params.id);
  const getPost = posts.find((post) => postId === post.id && !post.deleted);

  let status = 400;
  let message = "Post delete failed";

  if (getPost) {
    getPost.deleted = true;

    for (const [index, post] of posts.entries()) {
      if (post.id === getPost.id) {
        posts[index] = getPost;
        savePosts(posts);
        break;
      }
    }

    status = 200;
    message = "Post deleted successfully";
  }

  res.writeHead(status, { "Content-type": "application/json" });
  res.end(JSON.stringify(message));
});

export default router;
