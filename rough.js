const express = require("express");
const { exec } = require("child_process");

const app = express();
const PORT = 3000;

// Predefined Git commands
const commands = {
  status: "git status",
  add: "git add .",
  commit: 'git commit -m "Web Commit"',
  pull: "git pull origin main",
  push: "git push origin main"
};

// Function to execute a Git command
function runGitCommand(command, callback) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      callback({ error: error.message });
    } else if (stderr) {
      callback({ error: stderr });
    } else {
      callback({ message: stdout });
    }
  });
}

// API endpoint to handle Git commands
app.get("/git-command", (req, res) => {
  const action = req.query.action;

  if (!commands[action]) {
    return res.status(400).json({ error: "Invalid command action" });
  }

  runGitCommand(commands[action], (result) => {
    res.json(result);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
