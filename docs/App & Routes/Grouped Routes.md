---
sidebar_position: 1
---

### Route Naming Syntax

The project is deployed on **GitHub Pages**, with the base URL set to <code>/EcoVibe/</code>.
For example, a route for a page like "Shop" would be defined as:

<li>/EcoVibe/Shop</li>

### General Rule for Route Grouping

As previously mentioned, route grouping has been done with a focus on optimizing the user experience. **The goal is to make the structure as intuitive and straightforward as possible**, minimizing unnecessary complexity. The primary route groups are as follows:

<ul>
  <li><strong>Main Pages:</strong> Pages that are accessible to all users, regardless of user type.</li>
  <li><strong>Auth Routes:</strong> Pages related to user authentication, including login, signup, and submit personal/business information.</li>
  <li><strong>Customer Routes:</strong> Pages dedicated to the customer journey, including the shopping process and customer profile management.</li>
  <li><strong>Seller Routes:</strong> Pages for managing and viewing the seller's profile, products, and sales-related information.</li>
</ul>

### Example (Main Routes)

From a syntactical perspective, each group consists of an array of main routes that are loaded using the lazy loading method:

```jsx title="Main Routes"
const MainRoutes = [
  // main pages
  <Route key="home" path="/EcoVibe/" element={<HomePage />} />, // home page
  <Route key="shop" path="/EcoVibe/Shop" element={<ShopPage />} />, // shop page
  <Route
    key="explore-products"
    path="/EcoVibe/Explore-Products/:filters?"
    element={<ExploreProducts />}
  />, // explore products page
  <Route
    key="product-detail"
    path="/EcoVibe/Products/:productId?"
    element={<ProductDetailsPage />}
  />, // product details page
  <Route key="chat-room" path="/EcoVibe/Messages/" element={<ChatPage />} />, // chat room page
];
```

Some of the routes (in the authentication section) consist of multiple nested steps:

```jsx title="Auth Routes"
const AuthRoutes = [
  // customer authetication steps
  <Route
    key="customers-auth"
    path="/EcoVibe/Customers/"
    element={<CustomerAuthPage />}
  >
    {/* step 01: customers-signup */}
    <Route path="sign-up" element={<SignUpCustomer />} />
    {/* step 02: personal information */}
    <Route path="personal-details" element={<PersonalDetailsForm />} />
    {/* step 03: customer interests */}
    <Route path="user-intersets" element={<UserInterestsForm />} />
  </Route>,
  // sellers authetication steps
  <Route
    key="sellers-auth"
    path="/EcoVibe/Sellers/"
    element={<SellerAuthPage />}
  >
    {/* step 01: sellers signup */}
    <Route path="sign-up" element={<SignUpSeller />} />
    {/* step 02: business information */}
    <Route path="business-details" element={<BusinessInfoForm />} />
  </Route>,
  // sign-in page for both type user's
  <Route key="sign-in" path="/EcoVibe/sign-in" element={<SignInPage />} />,
];
```
