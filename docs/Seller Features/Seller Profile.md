---
sidebar_position: 2
---

### First Looking

The personal brand icon and credibility of the seller are showcased on the seller profile page, which displays all the seller's information and visual content. Naturally, the visual structure of the seller's profile is inspired by and influenced by Instagram's profile design, aiming to provide an interface that users are familiar with and find easy to use. Exactly following the familiar and common Instagram layout, the profile header displays general information such as business details and stories, as well as important user statistics like the number of products.

### Content Types

The visual content designed for sellers primarily showcases their products. Secondly, it displays comments related to the seller’s products. Lastly, for visitors who have placed orders with the seller, the relevant order history is shown. This method of displaying seller information makes Eco Vibe unique, offering a new experience in the buying and selling platform. The ability for users to consistently personalize their generated content elevates this experience to the next level.

### Owner Access

The level of access and choices for a visitor varies depending on whether they are the profile owner or not. For example, other visitors and customers can send messages to the seller, but the seller themselves can directly access the details of their products through the dashboard. The criterion for determining ownership is the matching of the user ID in the URL params with the visitor's user ID.

### Add / Remove Highlight

Profile customization doesn't stop there. Sellers can choose highlights from their stories and showcase them to other visitors. Thanks to the real-time interaction between the server for story data and the client, this process is very smooth and seamless. Users don't experience long loading times, making the experience much more fluid and enjoyable.

The process of adding or removing a story from highlights is done by updating the <code>highlightRef</code> property in the story data. This update ensures that the story is either marked as a highlight or removed from the highlights, allowing for seamless management of the seller's content.

Additionally, the component responsible for adding highlights is the **[Add Highlight Modal](https://github.com/its-mohammad-js/EcoVibe/blob/main/src/pages/Seller%20Pages/Profile/components/Modals/AddHighlightModal.jsx)**, which has been developed specifically for this purpose. This modal allows sellers to easily select and add their stories to the highlights section.

### Edit Business Info

Users can update their business-related profile information through the seller's profile. This feature allows sellers to modify and refresh details such as their business name and other relevant information directly from their profile page.
