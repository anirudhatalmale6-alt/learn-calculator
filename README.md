# Learn Calculator 🧮

A simple, clean web calculator built to be **used and read**. It does basic
arithmetic (add, subtract, multiply, divide) and the source code is filled with
friendly, concept-focused comments so a curious beginner can see exactly how
HTML, CSS, and JavaScript work together.

## Try it

Just open `index.html` in any web browser — that's it. No installation, no
build tools, no internet connection required.

## Files

| File         | What it does                                                        |
|--------------|---------------------------------------------------------------------|
| `index.html` | The **structure** — the display and all the buttons.                |
| `style.css`  | The **look** — colors, spacing, rounded buttons, gentle animations. |
| `script.js`  | The **behaviour** — what happens when you click or type.            |

Read them in that order (HTML → CSS → JS) for the clearest picture of how a
web page is built up layer by layer.

## How to use it

- Click the number and operator buttons, then press **=** for the answer.
- **AC** clears everything; **DEL** deletes the last character.
- You can also use your **keyboard**: number keys, `+ - * /`, `Enter` for `=`,
  `Backspace` to delete, and `Esc` to clear.

## Concepts you'll spot in the code

- **HTML:** semantic tags (`<main>`), `data-*` attributes to label buttons.
- **CSS:** variables (`:root`), Flexbox for centering, CSS Grid for the keypad,
  transitions for smooth presses, and a media query for small screens.
- **JavaScript:** `querySelector`, functions, a `switch` statement, `parseFloat`,
  simple state variables, and **event delegation** (one listener for all buttons).

Have fun poking at the values — change a color in `style.css` or a number and
refresh the page to see what happens. That's the best way to learn! ✨
