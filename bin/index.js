#!/usr/bin/env node
import {
  createSampleConfig,
  loadUserConfig,
  openConfigFile,
} from "../src/config/config.js";
import { startPomodoro } from "../src/timer.js";

createSampleConfig();

// ===== Parse CLI Args =====
const args = process.argv.slice(2);

if (args[0] === "config") {
  openConfigFile();

  process.exit(0);
}

if (args[0] === "start") {
  const userConfig = loadUserConfig();

  let workMinutes = args[1] ? parseInt(args[1], 10) : userConfig.workMinutes;
  let restMinutes = args[2] ? parseInt(args[2], 10) : userConfig.restMinutes;
  let cycleCount = args[3] ? parseInt(args[3], 10) : userConfig.cycleCount;

  const styleArg = args.find((a) => a.startsWith("--style="));
  const styleName = styleArg
    ? styleArg.split("=")[1]
    : userConfig.style || "breathing";

  const modeArg = args.find((a) => a.startsWith("--mode="));
  const mode = modeArg ? modeArg.split("=")[1] : userConfig.mode || "pulse";

  // ===== Start Pomodoro =====
  (async () => {
    for (let i = 0; i < cycleCount; i++) {
      console.log(
        `\nPomodoro Cycle ${
          i + 1
        } of ${cycleCount} — Work: ${workMinutes} min, Rest: ${restMinutes} min`
      );

      // Pass styleConfig with mode to work phase
      await startPomodoro(
        workMinutes,
        restMinutes,
        styleName,
        { mode },
        userConfig
      );
    }
    console.log("\n🎉 All cycles complete! Great job!");
  })();
} else {
  console.log(`
Usage:
  pomodoro config                Open the config file for editing
  pomodoro start [work] [rest] [cycles] [--mode=pulse|static]
                                Start pomodoro cycles with optional timings and mode

Examples:
  pomodoro start 25 5 4 --mode=pulse
  pomodoro config
  `);
  process.exit(0);
}
