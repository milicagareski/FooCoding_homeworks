import { URLPattern } from "urlpattern-polyfill";

const router = [];

const defineRoute = (method, pattern, handler) => {
  const urlPattern = new URLPattern({ pathname: pattern });

  router.push({ method, pattern, urlPattern, handler });
};

defineRoute("GET", "/users", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      message: "GET /users/ matched",
    })
  );
});

defineRoute("GET", "/users/:id", (req, res) => {
  const userId = req.params.id;

  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      message: `GET /users/:id route matched with ${userId} ID`,
    })
  );
});

defineRoute("POST", "/users", (req, res) => {
  const userId = req.params.id;

  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      message: `POST /users route matched`,
      body: req.body,
    })
  );
});

const routeMatcher = (router, url, method) => {
  return router.reduce((matchingRoutes, route) => {
    const { urlPattern, method: routeMethod, handler } = route;

    if (urlPattern.test(url) && method === routeMethod) {
      const params = urlPattern.exec(url).pathname.groups;

      matchingRoutes.push({ handler, params });
    }

    return matchingRoutes;
  }, []);
};

const getRequestData = (req) => {
  return new Promise((resolve, reject) => {
    const body = [];

    req
      .on("error", (err) => {
        reject(err);
      })
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        resolve(JSON.parse(Buffer.concat(body).toString()));
      });
  });
};

const requestHandler = async (req, res) => {
  const { method, url } = req;
  const { address, port } = req.socket.server.address();
  const incomingUrl = `http://${address}:${port}${url}`;

  // Verify if there is any route that match the request url
  const matches = routeMatcher(router, incomingUrl, method);

  if (matches.length > 0) {
    for (const { handler, params } of matches) {
      req.params = params;

      // If there is a request body, this is processed
      if (req.headers["content-length"] > 0) {
        req.body = await getRequestData(req);
      }

      // Call each matching handler
      handler(req, res);
    }
  } else {
    // Handle unmatched route
    res.statusCode = 404;
    res.end();
  }
};

const HOST = process.env.HOST ?? "localhost";
const PORT = process.env.PORT ?? 3000;

const server = http.createServer(requestHandler);

server.listen(PORT, HOST, () => {
  const { address, port } = server.address();
  const serverUrl = `http://${address}:${port}/`;

  console.log("Server running at: %s", serverUrl);
});
