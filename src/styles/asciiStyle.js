import { loadAsciiArt } from "../config/config.js";

export function asciiStyle(name, minutes, artName = "default") {
  return new Promise((resolve) => {
    console.log(`\n--- ${name} (${minutes} min) ---`);

    const asciiArt = loadAsciiArt(artName);
    const lines = asciiArt.split("\n");

    // Trim empty lines from start and end to keep clean
    let startIndex = 0;
    let endIndex = lines.length - 1;
    while (startIndex < lines.length && lines[startIndex].trim() === "")
      startIndex++;
    while (endIndex >= 0 && lines[endIndex].trim() === "") endIndex--;

    const cleanLines =
      startIndex <= endIndex ? lines.slice(startIndex, endIndex + 1) : [""];

    const totalLines = cleanLines.length;
    const totalMs = minutes * 60 * 1000;
    const delayPerLine = totalMs / totalLines;

    let currentLine = 0;

    const interval = setInterval(() => {
      if (currentLine < totalLines) {
        console.log(cleanLines[currentLine]);
        currentLine++;
      } else {
        clearInterval(interval);
        console.log("\n✓ Session complete! Well done.");
        resolve();
      }
    }, delayPerLine);

    const cleanup = () => {
      clearInterval(interval);
      console.log("\n\n⏸  Session paused.");
      process.exit(0);
    };

    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);
  });
}

export function previewAsciiArt(artName = "default") {
  const asciiArt = loadAsciiArt(artName);
  console.log(`\n--- Preview: ${artName} ---`);
  console.log(asciiArt);
  console.log("--- End Preview ---\n");
}
