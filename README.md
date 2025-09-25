# AJ Portfolio — React + Vite + Tailwind

A production-ready portfolio starter using **React 18**, **Vite**, **Tailwind**, **Framer Motion**, and **lucide-react** icons.

## Quick Start (VS Code)

1) Open a terminal in this folder, then install dependencies:
```bash
npm install
```

2) Start the dev server:
```bash
npm run dev
```
Open the printed local URL in your browser.

3) Edit content:
- `src/projects.js` — your projects (title/description/tech/links)
- Social/email links in `src/App.jsx` (search for `yourhandle` and `ajnichols@example.com`)
- Add your résumé as `public/AJ_Nichols_Resume.pdf` (optional)

4) Build for production:
```bash
npm run build
npm run preview
```

## Deploy (GitHub Pages)
- Easiest: drag the `dist/` folder to Netlify or Vercel.
- Or set up GitHub Pages with a static deploy action.

## Notes
- Uses auto dark mode via `prefers-color-scheme`.
- Clean, accessible components with subtle motion.
trigger build
