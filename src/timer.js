import { breathingBar } from "./styles/breathingBar.js";

const styles = {
  breathing: breathingBar,
};

async function runPhase(name, minutes, styleName) {
  console.log(`\n--- ${name} (${minutes} min) ---`);
  const styleFunc = styles[styleName] || styles.breathing;
  await styleFunc(minutes);
}

export async function startPomodoro(workMinutes, restMinutes, styleName) {
  await runPhase("Work", workMinutes, styleName);
  await runPhase("Break", restMinutes, styleName);
}
