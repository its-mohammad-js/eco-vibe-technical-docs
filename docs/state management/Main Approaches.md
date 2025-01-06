---
sidebar_position: 1
---

## Redux for Global State Management

As previously mentioned, two main approaches have been considered for managing the application's state, with the most significant one being the use of centralized Redux state. In fact, the Redux-related data forms the core and foundation of the application, so understanding how it works and the underlying structure is crucial.

Generally, the structure of the Redux files is kept simple and modular until it grows in size. For smaller datasets, such as product data, reducers and actions are stored within a single slice. However, for more important and complex sections, like authentication and user data, the structure is split into more detailed parts to prevent the slices from becoming too large and complex. This ensures that each section remains manageable and maintainable as the application scales.

According to the general rule and typical Redux practice, each slice is defined in the store as a central piece of data in the following way:

```js title="store"
const store = configureStore({
  reducer: {
    products: productsSlice,
    filters: filtersSlice,
    userData: userSlice,
  },
});
```

The simpler sections, which involve product filtering and main product data, have a straightforward file structure where the core logic resides directly within the slices. These slices typically include the initial state, reducers, and actions for managing product-related data and filter settings.

## React Context for Component-Specific State

Sometimes, as the number of details in a specific page increases, it becomes necessary to create a **centralized state** to avoid **props drilling** and reduce the complexity of managing state across multiple layers of components, For this reason, React Context has been used instead of Redux for two main reasons:

<ul>
<li>
**Data is Scoped to a Specific Section**: The data in question is only needed within a specific part of the application. There is no requirement to access this data across different pages or components. Since React Context allows you to share state within a specific tree of components, it is an ideal choice in cases where the data is localized to a section and does not need to be globally available.
</li>
<li>
**Avoiding Overcomplication for Simpler Data**: For simpler pieces of data, it is not advisable to use a complex solution like Redux. Using Redux for small or straightforward data management can introduce unnecessary complexity, as Redux is typically more suited for handling larger, more complex state across the entire application. React Context provides a simpler, more lightweight approach for state management in such cases.
</li>
</ul>

**Note:** The only place where React Context was used instead of Redux for a more localized state is the "explore-products" page. The reason for this approach will be explained further below.

### The Main Structure of Using React Context:

One of the key principles for maintaining a clean and expressive software architecture is to adopt general methods that help avoid unnecessary complexity. Out of the many possible ways to achieve a goal, determining and establishing a sustainable approach is the best decision.

For this reason, the general approach to using React Context is as follows: The target page or component is rendered inside a parent component, and the context data is made accessible through a simple custom hook that uses the Context Provider.

```jsx title="context example"
// declare context
const MainProvider = createContext();

function Context({ children }) {
  // local state and functionalities
  const [state, setState] = useState();

  // return children in provider
  return (
    <RoomsProvider.Provider value={{ state, setState }}>
      {children}
    </RoomsProvider.Provider>
  );
}

// access to provider data
export const useProvder = () => {
  return useContext(MainProvider);
};
```
