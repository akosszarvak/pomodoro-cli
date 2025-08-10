import chalk from "chalk";

export function dimColor(r, g, b, factor = 0.5) {
  return chalk.rgb(
    Math.floor(r * factor),
    Math.floor(g * factor),
    Math.floor(b * factor)
  );
}
