---
sidebar_position: 2
---

### Overview

To ensure the integrity of the database structure and the default content of the application, expiration dates are set for data created by regular users. These expired data entries are periodically cleaned up using GitHub Actions and JavaScript functions. The cleanup operations include:

<ul>
 **[<li>Remove Canceled Orders</li>](https://github.com/its-mohammad-js/EcoVibe/blob/main/.github/workflows/RemoveCanceledOrders.yml)**
  **[<li>Remove Expired Orders</li>](https://github.com/its-mohammad-js/EcoVibe/blob/main/.github/workflows/RemoveExpiredOrders.yml)**
  **[<li>Remove Expired Chat Rooms</li>](https://github.com/its-mohammad-js/EcoVibe/blob/main/.github/workflows/RemoveExpiredChatRooms.yml)**
  **[<li>Remove Expired Comments</li>](https://github.com/its-mohammad-js/EcoVibe/blob/main/.github/workflows/RemoveExpiredComments.yml)**
  **[<li>Remove Expired Products</li>](https://github.com/its-mohammad-js/EcoVibe/blob/main/.github/workflows/RemoveExpiredProducts.yml)**
  **[<li>Remove Expired Slide Reviews</li>](https://github.com/its-mohammad-js/EcoVibe/blob/main/.github/workflows/RemoveExpiredSlideReviews.yml)**
 **[<li>Remove Expired Stories</li>](https://github.com/its-mohammad-js/EcoVibe/blob/main/.github/workflows/removeExpiredStories.yml)**
  **[<li>Remove Inactive Users</li>](https://github.com/its-mohammad-js/EcoVibe/blob/main/.github/workflows/RemoveInactiveUsers.yml)**
</ul>

**Note:** All functions related to removing expired data are available in the path `src/common/utils/expired` and have names that exactly match the corresponding GitHub Actions.

**Note:** All JavaScript files related to actions utilize the **Firebase** library, except for the action to remove inactive users, which uses the **Firebase Admin** library.
