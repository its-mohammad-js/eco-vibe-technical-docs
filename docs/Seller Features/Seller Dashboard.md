---
sidebar_position: 1
---

## Become a seller

Users of any type can become sellers at any stage of the authentication process and take advantage of the seller features. In the following section, the entire process and all features related to sellers, as well as the seller's user experience and the interaction between the application and the server, will be thoroughly examined.

### sign-up as a seller & seller solutions page

As mentioned earlier, the authentication and registration process for becoming a seller is handled through specific routes. The introduction to seller features and the first step in becoming a seller usually begins with visiting the **[Sellers Solutions page](https://github.com/its-mohammad-js/EcoVibe/blob/main/src/pages/Seller%20Pages/Seller%20Solutions/sellerSolutionsPage.jsx)**. This page, with its visually appealing design, guides users through the authentication steps and introduces the available features. Depending on the user's authentication status, the registration process starts either from the first step (sign-up) or from the second step (providing business information). After completing the process, the user is directly transferred to the dashboard, where they can add their first product.

## Dashobrad Overview

The most important element of information management for sellers is the **[dashboard](https://github.com/its-mohammad-js/EcoVibe/blob/main/src/pages/Seller%20Pages/Dashboard/SellerDashboardPage.jsx)**, which is **simple** yet **highly detailed**. The dashboard includes various tabs, each designed and developed with a specific purpose in mind. For a better user experience, the **[side menu](https://github.com/its-mohammad-js/EcoVibe/blob/main/src/pages/Seller%20Pages/Dashboard/modals/QuickAccessMenu.jsx)** menu button is dynamically repositionable, providing a clean and attractive layout along with a smooth user experience.

In the following, the main components of the dashboard are explained. It’s important to note that the data used within the dashboard is globally managed via React Context, which is the approach used for state management.

### tabs Explaination

In each tab, users have access to various features and important information, making it easier to manage sales and orders. These features are designed to provide a streamlined experience, allowing sellers to efficiently handle their operations and monitor the status of their business.

#### Analytics Tab:

<ul>
<li>Main statistics for purchases</li>
<li>Ratings and comments related to the seller's products</li>
<li>Locations and recent stories posted by the seller</li>
</ul>

#### Products Manage Tab:

<ul>
 <li>Manage, delete, and edit products</li>
</ul>

#### Orders Manage Tab:

<ul>
<li>List of all orders</li>
<li>Details of each order</li>
<li>Ability to update the delivery status of each order</li>
</ul>

### CRUD Products

Adding and editing products is accessible through the **[add/edit products modal](https://github.com/its-mohammad-js/EcoVibe/blob/main/src/pages/Seller%20Pages/Dashboard/modals/Add%20Product%20Modal/AddEditProductForm.jsx)**, both in the product details section and via the sidebar menu in the dashboard. Despite its simple appearance, this modal fully handles the operations related to adding or editing products. It interacts with both the database and the storage to ensure that both product information and product images are fully manageable. The modal facilitates the add or edit process in three main steps.

<ul>
<li>**Step 1:** Entering basic product information such as category, price, product name, and product description.</li>
<li>**Step 2:** Entering available product options such as color, size, and other characteristics.</li>
<li>**Final Step:** Uploading product images.</li>
</ul>

**Note:** All three stages of this process update a main form, which is managed using react-hook-form. Finally, the form data is saved as the product information.

#### Remove Expired Products

Products created by users expire every **12 hours** and are automatically deleted from both the storage and the database using the GitHub action **[remove expired products](https://github.com/its-mohammad-js/EcoVibe/blob/main/.github/workflows/RemoveExpiredProducts.yml)**. The main reason for the short lifespan of products added by users is the nature of the program, as all users can add products without any restrictions. To prevent the product content on the site from becoming cluttered, this time window has been set.

### Add Story

Adding products and personalizing them is not the stopping point of eco vibe. All sellers can create daily visual content through stories, helping to personalize their brand and interact with customers. Sellers can upload and post their desired stories from the dashboard, homepage, and their seller profile. This is made possible through the **[Add Story Modal](https://github.com/its-mohammad-js/EcoVibe/blob/main/src/common/UI%20elements/AddStoryModal/AddStoryModal.jsx)**.

#### Stories Comments

For maximum interaction between sellers and customers, liking and commenting on stories has been implemented. Since the story data is stored in the real-time database, these interactions happen in real-time, enhancing the user experience. Additionally, it's important to note that expired comments on the sellers' stories are deleted every 6 days to help maintain the integrity of the platform's content. **It is also worth noting that likes and story views are recorded for guest users as well.**

#### Remove Expired Stories

User-generated stories, along with their visual content, expire after 18 hours and are removed from both the database and storage to maintain the original structure and content of the site. This is done through the **[remove expired stories](https://github.com/its-mohammad-js/EcoVibe/blob/main/.github/workflows/removeExpiredStories.yml)** GitHub action.

#### Stories Modal

The view and UI of stories make up a significant part of the application. The logic of nested lists and the overall appearance of the component have been repeated in several parts of the app. For this reason, the **[stories modal](https://github.com/its-mohammad-js/EcoVibe/tree/main/src/common/UI%20elements/StoriesList)** component was designed and developed. By drawing inspiration from Instagram’s visual design, the aim was to provide users with the best possible user experience.
