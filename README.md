# Pomodoro CLI

A minimalist Node.js Pomodoro timer with breathing animations.

## Features

- Work/rest cycles with customizable durations
- Breathing bar animation with theme support
- Configurable via `config.json`

## Upcoming features

- ASCII art banners
- Task tracking

## Install

```bash
npm install -g your-package-name
```

## Usage

```bash
pomodoro start 25 5 4
```

(work: 25 min, rest: 5 min, repeat 4 times)

```
 pomodoro config                Open the config file for editing
  pomodoro start [work] [rest] [cycles] [--mode=pulse|static]
                                Start pomodoro cycles with optional timings and mode

Examples:
  pomodoro start 25 5 4 --mode=pulse
  pomodoro config
```

## Config

Edit config.json to change palette and default values

```json

    mode: "pulse", // "pulse" | "static"
    steps: 30,
    barLength: 40,
    palette: {
      complete: [139, 166, 142],
      anticipation: [200, 214, 202],
      current: [210, 180, 145],
    }

```

## License

MIT © 2025 Ákos Szarvák
