---
sidebar_position: 2
---

### Main File Structure

In this slice, due to the higher complexity, actions and reducers are stored in a separate actions file and are then defined within the main slice. Each action file corresponds to a single functionality and a separate reducer. Additionally, frequently used helper functions are stored in the authHelpers.js file for better reusability and organization.

#### Default State Explanation

```js title="default user data state"
// default state
export const defaultUserData = {
  // customer data
  personalInformation: {},
  cartData: [],
  interests: [],
  wishlist: [],
  customer_step: "first-step",
  // seller data
  businessInformation: {},
  stories: [],
  seller_step: "first-step",
  // others
  userType: "",
  userId: null,
  // auth status code : (204 = not checked) / (401 = Unauthorized) / (200 = authorized)
  auth_status: 204,
};
```

The personal data for each user type, as well as data related to the purchasing process, are easily understandable and are represented by the following properties:

<ul>
<li>**auth_code:**
Represents the authentication status code for the user. This indicates the current state of the user's authentication process</li>
<li>
**userType:**
Defines the user’s type. It can have one of three values:

**seller: The user is a seller.**

**customer: The user is a customer.**

**both: The user has both seller and customer roles.**

</li>

<li>
**seller & customer step:**
Indicates the current step in the registration or onboarding process for both sellers and customers. This includes stages like entering personal details, business information, or completing other required forms.
</li>

</ul>

### Auth Helpers

The following functions have been **repeatedly** used throughout the various stages of the user authentication process. Each function serves a specific role and is briefly explained below:

#### Method Switcher

This function acts as a switch between **Firebase authentication methods**. It allows the user to choose different authentication methods during both the sign-up and sign-in stages. Thanks to Firebase's unified authentication methods, and to avoid redundant code, this function has been defined and used to handle these scenarios efficiently. By using this approach, we can streamline the authentication process and minimize repetition in the code.

#### Create User Cell

This function is responsible for registering new user data in the database and is used even during the sign-in process. This means that even if a user logs in using social media accounts and doesn't have an existing account, the function will register the user’s information in the database and create a new account for them. The main task of this function is to store the user data in the database.

#### Set & Get User Id

To facilitate the communication between the user database and the client, a **unique ID is stored in the cookies**. Both of these functions are responsible for storing and retrieving this ID. It's worth noting that a unique ID is also stored for **guest users**, allowing certain actions, such as viewing stories, to be recorded. Additionally, this property is stored with a defined **expiration date**.

#### Update user last activity

Each time the user visits the app, a request is sent to the database to fetch the user's data. During this process, the user's **last visit** is also updated, and this function specifically handles that task.

### Get & Update User Data

It's crucial that the **interaction** between the user and the **database** follows a general, stable approach, so that making future changes to parts of the application becomes easier and simpler, while avoiding complex errors and bugs. For this reason, two important and core functions related to user data, responsible for **[Get](https://github.com/its-mohammad-js/EcoVibe/blob/main/src/reducers/auth/authActions/getUserData.js)** and **[Update](https://github.com/its-mohammad-js/EcoVibe/blob/main/src/reducers/auth/authActions/updateUserData.js)** user information, have been defined as separate actions and configured throughout the application.

##### Get User Data

The process of fetching user data from the server involves making a request to the server, and depending on whether the request is successful or not, the key user properties are updated in the main reducer. In general, the following scenarios occur:

<ul>
<li>The user is authenticated and successfully receives the data.</li>
<li>The guest user enters the site, and a unique ID is stored for them (without overwriting).</li>
<li>The user is authenticated, but the operation was unsuccessful, so their access is restricted. The app stays in an error state until the user's information is successfully retrieved.</li>
</ul>

##### Update Data

Despite its simple appearance, this action helps prevent complexity and code repetition on a large scale. Each time it is triggered anywhere in the app, it **updates a specific property** as needed and synchronizes the app with that update.

### Sign-in & Sign-up

In general, all user types use a single main action for signing in, as explained earlier. If a new user logs in through social media accounts, a new account is created for them. However, the registration process for users is managed and handled in two separate parts.

#### Customer sign-up

The registration process and routes for customers include initial registration and the submission of personal information such as address, name, and preferences. This process is configured as follows:

```jsx title="Customer sign-up route"
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
</Route>
```

#### Seller sign-up

The process of creating an account or becoming a seller user is also managed through the following routes. After the initial authentication, the user is directly redirected to the seller's dashboard.

```jsx title="Seller sign-up route"
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
```

**Note:** The central action for registration and synchronizing the app is the same for both user types.
