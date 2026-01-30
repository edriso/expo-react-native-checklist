# Do Meows

A simple, cat-themed task list app built with **Expo** and **React Native**.  
*~ your daily scratch list ~*

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

- **Add a task** — Type in the input box and tap **Add**. Your task appears in the list. A cat animation shows when you add one.
- **Mark as complete** — Tap the checkbox or the **Complete** button. The task gets a line through it. A celebration cat appears when you complete. Tap again to undo (another cat reaction).
- **Delete a task** — Tap **Delete** on a task to remove it from the list. A cat reaction shows when you delete.
- **See all tasks** — The list shows every task you added. Feedback uses cat GIFs (or short text if an image fails to load).

The app uses soft blue theme colors and supports light and dark mode.

---

## Libraries used

- **Expo** — Tooling and packages to build and run the app easily.
- **React Native** — To build the mobile UI (screens, buttons, list, etc.).
- **expo-image** — To show the cat feedback GIFs reliably on device.
- **nanoid** (non-secure) — To create unique IDs for each task so the list can track them correctly (React Native–friendly version).

Everything else (routing, tabs, etc.) comes from the default Expo setup. No extra UI libraries.

---

## Project structure (simple)

- **`app/(tabs)/index.tsx`** — Main screen: title, input, Add button, and task list with cat feedback overlay.
- **`app/(tabs)/_layout.tsx`** — Single “Tasks” tab with checklist icon.
- **`constants/theme.ts`** — Colors for light and dark mode (soft blue, card, delete, etc.).
- **`assets/images/`** — Cat feedback GIFs: `cat-yay.gif`, `cat-sus.gif`, `cat-watching.gif`, `cat-close.gif`.

---

*Made as a first React Native project.*
