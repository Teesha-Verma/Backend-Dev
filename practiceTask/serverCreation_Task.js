// Task 2: The "Secure Admin Entrance" (Auth Simulation)
// Real-World Use Case: Every website has a login. Before Express, developers had to check
// credentials manually.
// ● The Scenario: Create a route /admin.
// ● The Logic:
// 1. The user must provide a user and pass in the URL:
// localhost:8000/admin?user=admin&pass=1234.
// 2. Success: If credentials match, read an admin_dashboard.html file using
// fs.readFile and send it to the browser.
// 3. Failure: If credentials are wrong, send a 401 Unauthorized status code and a
// message "Access Denied."

const http = require("http");
const url = require("url");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === "/admin" || parsedUrl.pathname === "/admin/") {
    const { user, pass } = parsedUrl.query;

    if (user === "admin" && pass === "1234") {
      fs.readFile("admin_dashboard.html", "utf8", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Server Error");
          return;
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
    } else {
      res.writeHead(401, { "Content-Type": "text/plain" });
      res.end("Access Denied");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route Not Found");
  }
});

server.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});