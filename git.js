const { exec } = require("child_process");

// Function to execute a shell command and return the output
function runCommand(command, description) {
  console.log(`\n${description}:\n`);
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
      } else if (stderr) {
        console.error(`Stderr: ${stderr}`);
        resolve(stderr);
      } else {
        console.log(`Output: ${stdout}`);
        resolve(stdout);
      }
    });
  });
}

// Git operations
async function gitOperations() {
  try {
    // 1. Check the current branch
    await runCommand("git branch", "Checking current branch");

    // 2. Add all changes
    await runCommand("git add .", "Staging changes");

    // 3. Commit changes
    await runCommand(
      'git commit -m "Commit from JavaScript script"',
      "Committing changes"
    );

    // 4. Pull latest changes from remote
    await runCommand("git pull origin main --rebase", "Pulling latest changes");

    // 5. Push changes to remote
    await runCommand("git push origin main", "Pushing changes to remote");

    console.log("\nGit operations completed successfully!");
  } catch (error) {
    console.error("\nGit operations failed. Please resolve the issues and try again.");
  }
}

// Run the script
gitOperations();
