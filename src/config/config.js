import { spawn } from "child_process";

import fs from "fs";
import path from "path";
import os from "os";

const configDir = path.join(os.homedir(), ".pomodoro");
const configFile = path.join(configDir, "config.json");

export function createSampleConfig() {
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  if (!fs.existsSync(configFile)) {
    const sampleConfig = {
      mode: "pulse",
      steps: 30,
      barLength: 40,
      palette: {
        complete: [102, 153, 153], // muted teal
        anticipation: [179, 204, 204], // pale teal
        current: [204, 153, 102], // warm sand
      },
    };

    fs.writeFileSync(configFile, JSON.stringify(sampleConfig, null, 2));
    console.log(`\n Created sample config at ${configFile}`);
    console.log("Feel free to edit this file to customize your pomodoro.\n");
  }
}

export function loadUserConfig() {
  try {
    if (fs.existsSync(configFile)) {
      const raw = fs.readFileSync(configFile, "utf-8");
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Error reading config file, falling back to defaults:", e);
  }
  return {};
}

export function openConfigFile() {
  if (!fs.existsSync(configFile)) {
    console.error("Config file does not exist:", configFile);
    return;
  }

  console.log();

  const platform = os.platform();

  if (platform === "win32") {
    // On Windows, just show the path - user can copy/paste or navigate to it
    console.log("\nConfig file location:");
    console.log(`  ${configFile}`);
    console.log("\nCopy this path and open it in your preferred editor.");
    console.log('Or run: notepad "' + configFile + '"');
  } else if (platform === "darwin") {
    command = "open";
    args = [configFile];
  } else {
    // On Unix-like systems, try to open with default editor or vi
    const editor = process.env.EDITOR || "vi";
    console.log(`Opening config in ${editor}...`);

    const child = spawn(editor, [configFile], {
      stdio: "inherit", // makes editor interactive in the terminal
    });

    child.on("exit", (code) => {
      if (code === 0) {
        console.log("Finished editing config.");
      } else {
        console.log(`Editor exited with code ${code}`);
      }
    });

    child.on("error", (error) => {
      console.error(`Failed to open editor: ${error.message}`);
      console.log(`Config file location: ${configFile}`);
    });
  }
}

export function showConfigPath() {
  console.log(`Config file: ${configFile}`);
  console.log(`Config directory: ${configDir}`);
}
