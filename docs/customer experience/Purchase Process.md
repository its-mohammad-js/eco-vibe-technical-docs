---
sidebar_position: 2
---

### Overview

The key element of the user experience for customers is the **purchase process**. In this app, efforts have been made to design both the UI architecture and the client-server interaction in a way that ensures optimal performance. By understanding the order placement method and the data structure, you will gain a better insight into the app. In the following sections, the complete process of purchasing, order placement, and the removal of outdated orders is explained in detail.

### Wishlist

The first section accessible to all authenticated users is the **Wishlist**. As is common, a list of favorite products is stored in the user's wishlist property and can be accessed and managed on the wishlist page. Every time a user adds a product from their wishlist to the shopping cart, that product is removed from the wishlist.

#### Default Order

Depending on the user's **selected options**, the quantity of **orders** for a product can **vary**. However, when a user places an order, whether from the wishlist or other pages like the product explore page, the product is added to the cart with default options. This is handled by a function that updates the user's shopping cart with the product order using the default options.

```js title="Default Order"
// add product to cart
function addToCart({ Options, Name, Thumbnail, id, Price, Category }) {
  // get default options of product
  let defaultOptions = [];
  Options.forEach(({ title, options }) => {
    if (options.length > 1) defaultOptions.push({ title, option: options[0] });
  });
  // order product with default options
  const defaultOrder = {
    orderId: generateId(id),
    orderDate: Date.now(),
    productId: id,
    Category,
    Name,
    Thumbnail,
    Price,
    quantity: 1,
    selectedOption: defaultOptions,
  };
  // update cart data with new order
  dispatch(
    updateUserData({ data: [...cartData, defaultOrder], field: "cartData" })
  );
}
```

**Note:** Due to the variability in order conditions, the logic for placing an order with default product options is not defined globally. Instead, it is defined in different conditions, but the main structure follows the function outlined above.

### Primary Orders (Cart)

The order placement process is highly dependent on the **type of product order**. On the **[product details page](https://github.com/its-mohammad-js/EcoVibe/blob/main/src/pages/Main%20Pages/Product%20Detail/ProductDetailsPage.jsx)**, a component called **[Order Box](https://github.com/its-mohammad-js/EcoVibe/tree/main/src/pages/Main%20Pages/Product%20Detail/components/Order%20Box)** is defined, which is responsible for placing product orders and updating the user's shopping cart with products having various options. To better understand this process, it’s useful to take a look at the overall structure of an example order model object.

```js title="Order Object Modal"
{
    createdAt: timeStamp,
    orders: {
        "mWtCSkEAvVe5M8uQA5yLQWx9bDm2": {
            "delivery_status": 100,
            "items": ["list of items"]
        },
    },
    totalPrice: "493.39",
    customerId: "mail",
    orderId: "string",
    shippingMethod: {
        title: "FedEx Delivery"
    },
    sellers: [
        "xTEewnD5JIROizBBCyCrpN7cysm2",
        "DEZeusIbtogG9uzaej5Eqk3QWf12",
        "mWtCSkEAvVe5M8uQA5yLQWx9bDm2"
    ],
    paymentInfo: {
        "address": "test@gmail.com",
        "post_Code": "2324",
        "Country": "iran",
        "City": "tehran",
        "email": "testseller06@gmail.com",
        "phone_Number": "1234567872123",
        "full_Name": "Natalia  Ivanova"
    }
}
```

Parts of the object, such as createdAt or totalPrice, don’t require further explanation. The core of each order object consists of a list of seller IDs **(sellers)** for each order and an object representing the individual order items **(orders)**. A user may place an order for **different products**, with **various options**, different quantities, and from **multiple sellers** within a single order. This creates the necessity for the products in each order to be organized in a specific way. In this structure, each property in the orders object is an individual object, with the seller’s ID as the property key. Each seller-related object within orders contains a list of different **products with various specifications** and a **delivery status**.

```js
orders: {
    "seller id": {
    "delivery_status": 100,
    "items": ["list of items"]
    },
},
```

By reviewing the main structure of the order data, we can gain a better understanding of how the **order box** works in separating and distinguishing between orders, and how it registers product orders separately.

### Checkout & Payment Info

After updating the shopping cart with the desired order, the user is redirected to the **[Checkout Page](https://github.com/its-mohammad-js/EcoVibe/blob/main/src/pages/Customer%20Pages/Checkout/CheckoutPage.jsx)**, where they can access the ordered products, enter their purchase information, and finalize their order. Once the order is placed, the user's shopping cart is **reset**, and the order is saved **separately in the database**, distinct from the user's data. However, it can always be accessed and retrieved using the **customerId** property. The user's orders influence various parts of the program, including seller profiles and chat rooms.

### Orders Management

As previously mentioned, both user types have the ability to review, manage, and track their orders. However, one of the key components of each order is the **delivery_status** property, which indicates the status of the order's delivery. After placing an order, the customer has the ability to cancel the order if its status is still <code>pending</code>. These features are accessible to all customers through the Orders page.

### Routes Names Syntax

All routes related to the purchase process and order management are available under the "bag" section.

**Example**: /bag/cart

### Clean Expired Orders (github action)

For higher database integrity and cleaner data structure, expired orders are automatically deleted from the database at regular intervals. Specifically, canceled orders are removed every 7 days, while all expired orders are removed every month. This process is handled by two GitHub actions: remove **[canceled orders action](https://github.com/its-mohammad-js/EcoVibe/blob/main/.github/workflows/RemoveCanceledOrders.yml)** and **[remove expired orders action](https://github.com/its-mohammad-js/EcoVibe/blob/main/.github/workflows/RemoveExpiredOrders.yml)**.

Note: The expiration of an order is determined based on its **creation date**.
