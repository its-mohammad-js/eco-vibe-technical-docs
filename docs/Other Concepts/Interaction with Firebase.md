---
sidebar_position: 4
---

### Firestore & Authentication

Interaction with Firestore: Stability and Real-Time Data Handling

As previously mentioned, after authentication and registration, both types of users maintain constant interaction with the database. The primary reason for choosing Firestore over a real-time database lies in its superior service stability, particularly for initial requests and user data updates.Additionally, data related to product comments and user orders are both stored and synchronized using Firestore.

### Real-time db , Stories & Chat page

Additionally, data related to product comments and user orders are both stored and synchronized using Firestore.In the previous chapters, a detailed explanation was provided regarding how different components of the application interact with the database. In general, data interactions in the application make use of two main databases for storing and synchronizing data: Firestore and Real-time Database.

### Requests

Finally, for interacting with both types of databases and the authentication section, the Firebase library is used directly. Efforts have been made to keep these requests modular, well-organized, and manageable without unnecessary complexity. The main reason for not separating the core database requests and not using an approach of creating service files was that the Firebase library itself offers a good structure and minimizes repetition in the request logic.
