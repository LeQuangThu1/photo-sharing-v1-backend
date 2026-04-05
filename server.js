/**
 * Express server for Photo Sharing App - Backend.
 * Serves model data as JSON API.
 */
const express = require("express");
const cors = require("cors");
const models = require("./modelData.cjs");

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all origins (needed for CodeSandbox)
app.use(cors());

app.get("/test/info", function (request, response) {
  response.json(models.schemaInfo());
});

app.get("/user/list", function (request, response) {
  response.json(models.userListModel());
});

app.get("/user/:id", function (request, response) {
  const id = request.params.id;
  const user = models.userModel(id);
  if (!user) {
    response.status(400).json({ message: "User not found" });
    return;
  }
  response.json(user);
});

app.get("/photosOfUser/:id", function (request, response) {
  const id = request.params.id;
  const photos = models.photoOfUserModel(id);
  response.json(photos);
});

app.listen(port, function () {
  console.log("Backend server listening on http://localhost:" + port);
});
