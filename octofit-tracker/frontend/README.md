# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Environment variables

This app calls the Octofit Tracker API at:

```
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

`VITE_CODESPACE_NAME` must be defined for this to resolve correctly. In a GitHub Codespace,
copy `.env.example` to `.env.local` and set it to the value of the `CODESPACE_NAME` environment
variable:

```bash
echo "VITE_CODESPACE_NAME=$CODESPACE_NAME" > octofit-tracker/frontend/.env.local
```

If `VITE_CODESPACE_NAME` is unset, the app falls back to `http://localhost:8000/api` instead of
requesting `https://undefined-8000...`.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
