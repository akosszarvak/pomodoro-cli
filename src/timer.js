import { asciiStyle } from "./styles/asciiStyle.js";

import { breathingBar } from "./styles/breathingBar.js";

const styles = {
  ascii: asciiStyle,
  breathing: breathingBar,
};

async function runPhase(name, minutes, styleName, styleConfig = {}) {
  console.log(`\n--- ${name} (${minutes} min) ---`);
  const styleFunc = styles[styleName] || styles.breathing;
  await styleFunc(minutes, styleConfig);
}

export async function startPomodoro(
  workMinutes,
  restMinutes,
  styleName,
  styleConfig = {}
) {
  await runPhase("Work", workMinutes, styleName, styleConfig);
  await runPhase("Break", restMinutes, styleName, styleConfig);
}
