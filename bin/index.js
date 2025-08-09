#!/usr/bin/env node
import { defaultConfig } from "../src/config.js";
import { startPomodoro } from "../src/timer.js";

// ===== Parse CLI Args =====
// 1st arg = work minutes, 2nd arg = rest minutes 3rd arg = cycle count
const args = process.argv.slice(2);
let workMinutes = args[0] ? parseInt(args[0], 10) : defaultConfig.workMinutes;
let restMinutes = args[1] ? parseInt(args[1], 10) : defaultConfig.restMinutes;
let cycleCount = args[2] ? parseInt(args[2], 10) : defaultConfig.cycleCount;

// ===== Start Pomodoro =====
(async () => {
  for (let i = 0; i < cycleCount; i++) {
    console.log(`Starting Pomodoro: Cycle ${i + 1} of ${cycleCount}`);
    await startPomodoro(workMinutes, restMinutes);
  }

  console.log("\nAll Pomodoro cycles complete! 🎉");
})();
