import { asciiArt } from "./ascii.js";

function runPhase(name, minutes) {
  return new Promise((resolve) => {
    console.log(`\n--- ${name} (${minutes} min) ---`);

    const lines = asciiArt.split("\n");
    const totalChars = lines.reduce((sum, line) => sum + line.length, 0);
    const totalMs = minutes * 60 * 1000;

    const delayPerChar = totalMs / totalChars;

    let currentLine = 0;
    let currentChar = 0;

    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        const line = lines[currentLine];
        process.stdout.write(line[currentChar] || " ");
        currentChar++;

        if (currentChar >= line.length) {
          process.stdout.write("\n");
          currentLine++;
          currentChar = 0;
        }
      } else {
        clearInterval(interval);
        resolve();
      }
    }, delayPerChar);
  });
}

export async function startPomodoro(workMinutes, restMinutes) {
  await runPhase("Work", workMinutes);
  await runPhase("Break", restMinutes);
}
