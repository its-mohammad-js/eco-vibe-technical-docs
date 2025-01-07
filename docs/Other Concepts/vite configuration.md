---
sidebar_position: 3
---

### Overview Vite Configuration & Absolute Routes

The configuration and absolute routes are clearly and systematically organized, enhancing both the structure and the overall architecture of the application.

**Note:** Additionally, when running the code locally, after each build, a comprehensive report on the application's **bundle size** is generated as an HTML file and can be accessed in the root directory of the project.

```js title="Vite Config"
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, // Open the visualization in the browser
      filename: "bundle-size.html", // Output file name
    }),
  ],

  base: "/EcoVibe/",

  resolve: {
    alias: {
      src: "/src",
      mainPages: "/src/pages/Main Pages/",
      customerAuthPages: "/src/pages/Auth Pages/Customers/",
      sellerAuthPages: "/src/pages/Auth Pages/Sellers/",
      customerPages: "/src/pages/Customer Pages/",
      sellerPages: "/src/pages/Seller Pages/",
      UI: "/src/common/UI elements/",
      appData: "/src/common/utils/constants/appData.js",
      helpers: "/src/common/utils/constants/helpers.js",
      hooks: "/src/common/hooks/",
      authActions: "/src/reducers/auth/authActions/",
    },
  },
});
```
