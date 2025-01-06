---
sidebar_position: 3
---

### Get products data

The process of fetching and filtering product data is handled by a single **[Action](https://github.com/its-mohammad-js/EcoVibe/blob/main/src/reducers/products/productsSlice.js)**, and most parts of the app use this state. Due to limitations in using database queries on the Firebase server, the product filtering process is done on the **[client-side](https://github.com/its-mohammad-js/EcoVibe/blob/main/src/common/utils/filterPorducts.js)** device. Although this might not be the ideal approach, it still works effectively and provides good performance.

### Filter & sort state

As previously mentioned, Redux is used for filtering and sorting data on the explore-products page. The main reason for this is that it is closely integrated with the action that fetches and filters products. Naturally, this approach was easier and more accessible, and it also reduced complexity on the **explore-products** page. The slice related to the data and filter state is an object containing properties for filtering and sorting. These properties are updated statically, and with every update, an optimized request is sent to the server.

```jsx title="get products on filter changes"
function fetchProducts() {
  dispatch(getFilteredProducts({ filtersData }));
}

const debouncedFetchProducts = useCallback(
  debounce(() => fetchProducts(), 800),
  [fetchProducts]
);

// get filtered products on each filter change
useEffect(() => {
  fetchProducts();
  // debouncedFetchProducts(filters);
  return () => debouncedFetchProducts.cancel();
}, [filters]);
```
