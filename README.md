# INFINITY Fitness — Demo Website

Open `index.html` in any browser. No build step or server needed.

```
index.html              Customer site + admin portal markup
style.css               All styling. Theme colours are CSS variables at the top of :root
app.js                  All behaviour (login, admin views, leads, BMI, modals)
gym-*.jpg               Background photos
program-*.jpg           Program card photos
```

Everything lives in one flat folder, so the relative links work locally and on GitHub Pages.

## Admin demo login
Username: `infinityadmin`   Password: `Infinity@2026`

## Deploy with GitHub Pages
1. Create a new repository on GitHub and upload everything inside this folder (so `index.html` is at the repo root).
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
4. After a minute the site is live at `https://<your-username>.github.io/<repo-name>/`.

## Changing the theme
Edit the variables at the top of `style.css`:
`--bg`, `--bg2`, `--surface` (neutrals) · `--ink` (charcoal bands) · `--accent` (copper).

## Changing images
Swap the image files (keep the same names) or edit the `--img-*` variables in `style.css`.
