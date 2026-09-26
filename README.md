# Aashritha's Portfolio

A personal portfolio website built with HTML5, CSS3, and vanilla JavaScript — featuring a responsive sidebar navigation, dark/light theme toggle, a working contact form, Google sign-in for gated content, and a small canvas-based Dino game for fun.

**Live site:** [aashritha.netlify.app](https://aashritha.netlify.app)

## Features

- **About / Hero section** — intro with avatar and a typewriter-style animated tagline
- **Blog** — preview cards linking out to full posts, with a "View More" link once the list grows past a few entries
- **Projects** — showcase cards, including a project gated behind Google login
- **Skills** — a responsive grid of tech/tools
- **Contact form** — client-side validated, submits via the Web3Forms API with live success/error feedback
- **Socials** — quick links (email, GitHub, LinkedIn)
- **Dark / light mode** — toggle button in the nav, choice persisted in `localStorage`
- **Dino game** — a small canvas-based jump game tucked at the bottom of the page
- **Fully responsive** — the sidebar collapses into a bottom pill on smaller screens so it never overlaps page content

## Tech Stack

| Layer | Tools |
|---|---|
| Structure | Semantic HTML5 |
| Styling | CSS3 (Flexbox, Grid, custom properties, media queries) |
| Component styling | Bootstrap 5 (form validation classes only) |
| Interactivity | Vanilla JavaScript (ES modules) |
| Auth | Firebase Authentication (Google sign-in) |
| Form backend | Web3Forms |
| Hosting | Netlify |

## Project Structure

```
├── index.html          # Main page markup
├── style.css            # All styling, layout, and responsive rules
├── script.js             # Typing animation, nav, theme toggle, dino game,
│                          # contact form, and Firebase login logic
├── all-blogs.html        # Full blog listing (linked from "View More")
├── all-projects.html     # Full projects listing (linked from "View More")
└── Kitten.gif             # Hero avatar image
```

## Getting Started

Since this is a static site with no build step, you can run it directly:

1. Clone the repo:
   ```bash
   git clone https://github.com/Aashritha014/Portfolio.git
   cd Portfolio
   ```
2. Open `index.html` in a browser, or serve it locally (recommended, since `script.js` uses ES module imports):
   ```bash
   npx serve .
   ```

## Configuration

Two features rely on external services and need their own credentials to work:

- **Contact form (Web3Forms):** replace the `access_key` hidden input value in `index.html` with your own [Web3Forms](https://web3forms.com) key.
- **Google login (Firebase):** update the `firebaseConfig` object in `script.js` with your own Firebase project's config, and make sure your deployed domain is added to Firebase's **Authorized domains** list (otherwise you'll see an `auth/unauthorized-domain` error).

## Responsive Breakpoints

| Width | Behavior |
|---|---|
| `> 1200px` | Sidebar nav sits vertically on the right |
| `≤ 1200px` | Sidebar collapses into a horizontal pill at the bottom of the screen |
| `≤ 768px` | Hero content stacks vertically, avatar shrinks |
| `≤ 600px` | Section padding tightens |
| `≤ 480px` | Project grid drops to a single column |
| `≤ 380px` | Nav pill and links shrink further for small phones |



## License

Personal project — feel free to reference the code, but please don't republish it as your own portfolio.
