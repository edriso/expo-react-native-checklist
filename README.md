# Little Things Todo

A simple task list app built with **Expo** and **React Native**.

---

## How to set up and run the app

1. **Clone the repo** (or download the project).

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the app**
   ```bash
   npx expo start
   ```

4. **Open the app**
   - On your **phone**: scan the QR code with the Expo Go app.
   - On **iOS simulator**: press `i` in the terminal.
   - On **Android emulator**: press `a` in the terminal.

You need **Node.js** installed. If you use a phone, install **Expo Go** from the App Store or Play Store.

---

## What the app does (features)

- **Add a task** — Type in the input box and tap **Add**. Your task appears in the list.
- **Mark as complete** — Tap the checkbox or the **Complete** button. The task gets a line through it. Tap again to undo.
- **Delete a task** — Tap **Delete** on a task to remove it from the list.
- **See all tasks** — The list shows every task you added. You get a short message when you complete or delete something.

The app uses light and dark theme colors (soft blue style).

---

## Libraries used

- **Expo** — Tooling and packages to build and run the app easily.
- **React Native** — To build the mobile UI (screens, buttons, list, etc.).
- **nanoid** — A small library to create unique IDs for each task so the list can track them correctly.

Everything else (routing, tabs, etc.) comes from the default Expo setup. No extra UI libraries.

---

## Project structure (simple)

- **`app/(tabs)/index.tsx`** — Main screen: input, Add button, and task list.
- **`constants/theme.ts`** — Colors for light and dark mode.

---

*Made as a first React Native project.*
