---
sidebar_position: 3
---

### Comment & Replies

The **[product information page](https://github.com/its-mohammad-js/EcoVibe/blob/main/src/pages/Main%20Pages/Product%20Detail/ProductDetailsPage.jsx)** includes a product review component that allows users to submit their reviews. Authenticated users can leave feedback and rate the products, as well as respond to other users' comments. This feature enables interactive communication between users regarding the products. These actions are directly **monitorable** through the seller dashboard, allowing all sellers to track them. The goal is to ensure the best and highest level of interaction between the customer and the seller.

### Clean Comments & Replies (github action)

Additionally, all expired comments and replies are automatically deleted from the database every **15 days** through the **[remove expired comments action](https://github.com/its-mohammad-js/EcoVibe/blob/main/.github/workflows/RemoveExpiredComments.yml)**, which is a GitHub action designed to handle this cleanup process.
