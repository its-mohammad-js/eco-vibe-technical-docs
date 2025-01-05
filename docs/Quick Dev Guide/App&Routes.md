---
sidebar_position: 2
---

# App component structure

To maintain a clean and organized structure within the application, the numerous pages and routes have been **grouped** logically and imported into separate components. This **grouping aligns with the UX design**, ensuring a modular and maintainable routing architecture.

This approach defines the core structure of the application, consisting of grouped routes organized as child components within the main layout

```jsx title="App.jsx"
<AppLayout>
  <Toaster />
  <Routes>
    {/* main pages */}
    {MainRoutes}
    {/* auth routes */}
    {AuthRoutes}
    {/* customer routes */}
    {CustomerRoutes}
    {/* seller pages */}
    {SellerRoutes}
    {/* 404 page */}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
</AppLayout>
```

It also includes requests to Firebase for retrieving user information and synchronizing the application with the current user's data using Redux.

```jsx title="App.jsx"
const dispatch = useDispatch();

useEffect(() => {
  // get user data
  dispatch(getUserData());
}, []);
```

**Note:** You can customize and adjust the synchronization of the application with user data by gaining a better understanding of the database structure. However, in production and final deployment, **avoid defining global states directly within the <code>App.jsx</code> component**. This helps prevent unnecessary re-renders and ensures better performance.
