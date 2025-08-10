import chalk from "chalk";
import { dimColor } from "../utils.js";

export async function breathingBar(minutes, userConfig = {}) {
  const config = {
    mode: "pulse", // "pulse" | "static"
    pulseDuration: 4000,
    anticipationSteps: 2,
    steps: 30,
    barLength: 40,
    palette: {
      complete: [102, 153, 153], // muted teal
      anticipation: [179, 204, 204], // pale teal
      current: [204, 153, 102], // warm sand
    },
    ...userConfig,
  };

  return new Promise((resolve) => {
    const totalMs = minutes * 60 * 1000;
    let progress = 0;
    let lastStep = -1;
    let startTime = Date.now();

    const chars = ["░", "▒", "▓"];

    // Hide cursor
    process.stdout.write("\x1B[?25l");

    const drawBar = () => {
      let bar = "";
      const now = Date.now();
      const elapsed = now - startTime;
      const stepDuration = totalMs / config.steps;

      const exactStep = elapsed / stepDuration;
      const currentStep = Math.min(Math.floor(exactStep), config.steps);

      if (currentStep > lastStep) {
        progress = currentStep;
        lastStep = currentStep;
      }

      const stepFraction = exactStep - currentStep; // 0..1 fractional part
      const pulseIntensity =
        config.mode === "pulse" ? Math.sin(stepFraction * Math.PI) : 1;

      const filledLength = Math.floor(
        (progress / config.steps) * config.barLength
      );

      for (let i = 0; i < config.barLength; i++) {
        if (i < filledLength) {
          bar += chalk.rgb(...config.palette.complete)("█");
        } else if (i === filledLength) {
          const col = chalk.rgb(
            Math.floor(
              config.palette.current[0] * (0.5 + 0.5 * pulseIntensity)
            ),
            Math.floor(
              config.palette.current[1] * (0.5 + 0.5 * pulseIntensity)
            ),
            Math.floor(config.palette.current[2] * (0.5 + 0.5 * pulseIntensity))
          );
          bar += col(chars[2]);
        } else if (i <= filledLength + config.anticipationSteps) {
          bar += dimColor(
            config.palette.anticipation[0],
            config.palette.anticipation[1],
            config.palette.anticipation[2],
            0.8
          )(chars[1]);
        } else {
          bar += chalk.dim("░");
        }
      }
      const percentage = Math.floor((progress / config.steps) * 100);
      process.stdout.write(`\r[${bar}] ${percentage}%`);

      if (progress >= config.steps) {
        process.stdout.write("\x1B[?25h\n"); // show cursor
        clearInterval(animationInterval);
        setTimeout(() => {
          console.log(chalk.green("✓ Session complete! Take a deep breath."));
          resolve();
        }, 1000); // a small delay
      }
    };

    const animationInterval = setInterval(drawBar, 16);
    process.on("SIGINT", () => {
      clearInterval(stepInterval);
      clearInterval(animationInterval);
      process.stdout.write("\x1B[?25h\n");
      process.exit(0);
    });
  });
}
