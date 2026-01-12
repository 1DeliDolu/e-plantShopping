# e-plantShopping

Paradise Nursery — a small React + Redux shopping cart demo for houseplants.

Repository: e-plantShopping

Deployed: https://1DeliDolu.github.io/e-plantShopping

## Overview

This repository contains `e-plantShopping`, a demo React app (Vite) that showcases a small e-commerce flow for houseplants using Redux for cart state management.

## Prerequisites

- Node.js (v16+) and npm
- Git

## Install locally

1. Clone the repository:

```bash
git clone https://github.com/1DeliDolu/e-plantShopping.git
cd e-plantShopping
```

2. Install dependencies:

```bash
npm install
```

## Run in development

Start the dev server and open the URL shown (default Vite port 5173/5174):

```bash
npm run dev
```

## Build for production

```bash
npm run build
```

Built files will be in the `dist/` directory.

## Deploy to GitHub Pages

This project includes `gh-pages` deployment scripts. To publish:

1. Ensure `package.json` contains the `predeploy` and `deploy` scripts (already present).
2. Set `vite.config.js` `base` to `"/e-plantShopping"` (already configured).
3. Run:

```bash
npm run deploy
```

The site is published at: `https://<your-github-username>.github.io/e-plantShopping` (example: https://1DeliDolu.github.io/e-plantShopping).

## Project files required for grading

Provide the public GitHub URLs for the following files when submitting:

- `README.md`: https://github.com/1DeliDolu/e-plantShopping/blob/main/README.md
- `src/AboutUs.jsx`: https://github.com/1DeliDolu/e-plantShopping/blob/main/src/AboutUs.jsx
- `src/App.css`: https://github.com/1DeliDolu/e-plantShopping/blob/main/src/App.css
- `src/App.jsx`: https://github.com/1DeliDolu/e-plantShopping/blob/main/src/App.jsx
- `src/CartSlice.jsx`: https://github.com/1DeliDolu/e-plantShopping/blob/main/src/CartSlice.jsx
- `src/ProductList.jsx`: https://github.com/1DeliDolu/e-plantShopping/blob/main/src/ProductList.jsx
- `src/CartItem.jsx`: https://github.com/1DeliDolu/e-plantShopping/blob/main/src/CartItem.jsx

## Notes

- Make sure to commit and push all changes before submitting the GitHub file URLs.
- Verify the deployed URL is publicly accessible before submitting the peer-graded assignment.