"use strict";(self.webpackChunkeco_vibe_document=self.webpackChunkeco_vibe_document||[]).push([[4734],{8853:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>l,contentTitle:()=>n,default:()=>c,frontMatter:()=>o,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"Seller Features/Seller Dashboard","title":"Seller Dashboard","description":"Become a seller","source":"@site/docs/Seller Features/Seller Dashboard.md","sourceDirName":"Seller Features","slug":"/Seller Features/Seller Dashboard","permalink":"/eco-vibe-technical-docs/docs/Seller Features/Seller Dashboard","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/Seller Features/Seller Dashboard.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1},"sidebar":"tutorialSidebar","previous":{"title":"Seller Features","permalink":"/eco-vibe-technical-docs/docs/category/seller-features"},"next":{"title":"Seller Profile","permalink":"/eco-vibe-technical-docs/docs/Seller Features/Seller Profile"}}');var a=t(4848),i=t(8453);const o={sidebar_position:1},n=void 0,l={},d=[{value:"Become a seller",id:"become-a-seller",level:2},{value:"sign-up as a seller &amp; seller solutions page",id:"sign-up-as-a-seller--seller-solutions-page",level:3},{value:"Dashobrad Overview",id:"dashobrad-overview",level:2},{value:"tabs Explaination",id:"tabs-explaination",level:3},{value:"Analytics Tab:",id:"analytics-tab",level:4},{value:"Products Manage Tab:",id:"products-manage-tab",level:4},{value:"Orders Manage Tab:",id:"orders-manage-tab",level:4},{value:"CRUD Products",id:"crud-products",level:3},{value:"Remove Expired Products",id:"remove-expired-products",level:4},{value:"Add Story",id:"add-story",level:3},{value:"Stories Comments",id:"stories-comments",level:4},{value:"Remove Expired Stories",id:"remove-expired-stories",level:4},{value:"Stories Modal",id:"stories-modal",level:4}];function h(e){const s={a:"a",h2:"h2",h3:"h3",h4:"h4",p:"p",strong:"strong",...(0,i.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s.h2,{id:"become-a-seller",children:"Become a seller"}),"\n",(0,a.jsx)(s.p,{children:"Users of any type can become sellers at any stage of the authentication process and take advantage of the seller features. In the following section, the entire process and all features related to sellers, as well as the seller's user experience and the interaction between the application and the server, will be thoroughly examined."}),"\n",(0,a.jsx)(s.h3,{id:"sign-up-as-a-seller--seller-solutions-page",children:"sign-up as a seller & seller solutions page"}),"\n",(0,a.jsxs)(s.p,{children:["As mentioned earlier, the authentication and registration process for becoming a seller is handled through specific routes. The introduction to seller features and the first step in becoming a seller usually begins with visiting the ",(0,a.jsx)(s.strong,{children:(0,a.jsx)(s.a,{href:"https://github.com/its-mohammad-js/EcoVibe/blob/main/src/pages/Seller%20Pages/Seller%20Solutions/sellerSolutionsPage.jsx",children:"Sellers Solutions page"})}),". This page, with its visually appealing design, guides users through the authentication steps and introduces the available features. Depending on the user's authentication status, the registration process starts either from the first step (sign-up) or from the second step (providing business information). After completing the process, the user is directly transferred to the dashboard, where they can add their first product."]}),"\n",(0,a.jsx)(s.h2,{id:"dashobrad-overview",children:"Dashobrad Overview"}),"\n",(0,a.jsxs)(s.p,{children:["The most important element of information management for sellers is the ",(0,a.jsx)(s.strong,{children:(0,a.jsx)(s.a,{href:"https://github.com/its-mohammad-js/EcoVibe/blob/main/src/pages/Seller%20Pages/Dashboard/SellerDashboardPage.jsx",children:"dashboard"})}),", which is ",(0,a.jsx)(s.strong,{children:"simple"})," yet ",(0,a.jsx)(s.strong,{children:"highly detailed"}),". The dashboard includes various tabs, each designed and developed with a specific purpose in mind. For a better user experience, the ",(0,a.jsx)(s.strong,{children:(0,a.jsx)(s.a,{href:"https://github.com/its-mohammad-js/EcoVibe/blob/main/src/pages/Seller%20Pages/Dashboard/modals/QuickAccessMenu.jsx",children:"side menu"})})," menu button is dynamically repositionable, providing a clean and attractive layout along with a smooth user experience."]}),"\n",(0,a.jsx)(s.p,{children:"In the following, the main components of the dashboard are explained. It\u2019s important to note that the data used within the dashboard is globally managed via React Context, which is the approach used for state management."}),"\n",(0,a.jsx)(s.h3,{id:"tabs-explaination",children:"tabs Explaination"}),"\n",(0,a.jsx)(s.p,{children:"In each tab, users have access to various features and important information, making it easier to manage sales and orders. These features are designed to provide a streamlined experience, allowing sellers to efficiently handle their operations and monitor the status of their business."}),"\n",(0,a.jsx)(s.h4,{id:"analytics-tab",children:"Analytics Tab:"}),"\n",(0,a.jsxs)("ul",{children:[(0,a.jsx)("li",{children:"Main statistics for purchases"}),(0,a.jsx)("li",{children:"Ratings and comments related to the seller's products"}),(0,a.jsx)("li",{children:"Locations and recent stories posted by the seller"})]}),"\n",(0,a.jsx)(s.h4,{id:"products-manage-tab",children:"Products Manage Tab:"}),"\n",(0,a.jsx)("ul",{children:(0,a.jsx)("li",{children:"Manage, delete, and edit products"})}),"\n",(0,a.jsx)(s.h4,{id:"orders-manage-tab",children:"Orders Manage Tab:"}),"\n",(0,a.jsxs)("ul",{children:[(0,a.jsx)("li",{children:"List of all orders"}),(0,a.jsx)("li",{children:"Details of each order"}),(0,a.jsx)("li",{children:"Ability to update the delivery status of each order"})]}),"\n",(0,a.jsx)(s.h3,{id:"crud-products",children:"CRUD Products"}),"\n",(0,a.jsxs)(s.p,{children:["Adding and editing products is accessible through the ",(0,a.jsx)(s.strong,{children:(0,a.jsx)(s.a,{href:"https://github.com/its-mohammad-js/EcoVibe/blob/main/src/pages/Seller%20Pages/Dashboard/modals/Add%20Product%20Modal/AddEditProductForm.jsx",children:"add/edit products modal"})}),", both in the product details section and via the sidebar menu in the dashboard. Despite its simple appearance, this modal fully handles the operations related to adding or editing products. It interacts with both the database and the storage to ensure that both product information and product images are fully manageable. The modal facilitates the add or edit process in three main steps."]}),"\n",(0,a.jsxs)("ul",{children:[(0,a.jsxs)("li",{children:[(0,a.jsx)(s.strong,{children:"Step 1:"})," Entering basic product information such as category, price, product name, and product description."]}),(0,a.jsxs)("li",{children:[(0,a.jsx)(s.strong,{children:"Step 2:"})," Entering available product options such as color, size, and other characteristics."]}),(0,a.jsxs)("li",{children:[(0,a.jsx)(s.strong,{children:"Final Step:"})," Uploading product images."]})]}),"\n",(0,a.jsxs)(s.p,{children:[(0,a.jsx)(s.strong,{children:"Note:"})," All three stages of this process update a main form, which is managed using react-hook-form. Finally, the form data is saved as the product information."]}),"\n",(0,a.jsx)(s.h4,{id:"remove-expired-products",children:"Remove Expired Products"}),"\n",(0,a.jsxs)(s.p,{children:["Products created by users expire every ",(0,a.jsx)(s.strong,{children:"12 hours"})," and are automatically deleted from both the storage and the database using the GitHub action ",(0,a.jsx)(s.strong,{children:(0,a.jsx)(s.a,{href:"https://github.com/its-mohammad-js/EcoVibe/blob/main/.github/workflows/RemoveExpiredProducts.yml",children:"remove expired products"})}),". The main reason for the short lifespan of products added by users is the nature of the program, as all users can add products without any restrictions. To prevent the product content on the site from becoming cluttered, this time window has been set."]}),"\n",(0,a.jsx)(s.h3,{id:"add-story",children:"Add Story"}),"\n",(0,a.jsxs)(s.p,{children:["Adding products and personalizing them is not the stopping point of eco vibe. All sellers can create daily visual content through stories, helping to personalize their brand and interact with customers. Sellers can upload and post their desired stories from the dashboard, homepage, and their seller profile. This is made possible through the ",(0,a.jsx)(s.strong,{children:(0,a.jsx)(s.a,{href:"https://github.com/its-mohammad-js/EcoVibe/blob/main/src/common/UI%20elements/AddStoryModal/AddStoryModal.jsx",children:"Add Story Modal"})}),"."]}),"\n",(0,a.jsx)(s.h4,{id:"stories-comments",children:"Stories Comments"}),"\n",(0,a.jsxs)(s.p,{children:["For maximum interaction between sellers and customers, liking and commenting on stories has been implemented. Since the story data is stored in the real-time database, these interactions happen in real-time, enhancing the user experience. Additionally, it's important to note that expired comments on the sellers' stories are deleted every 6 days to help maintain the integrity of the platform's content. ",(0,a.jsx)(s.strong,{children:"It is also worth noting that likes and story views are recorded for guest users as well."})]}),"\n",(0,a.jsx)(s.h4,{id:"remove-expired-stories",children:"Remove Expired Stories"}),"\n",(0,a.jsxs)(s.p,{children:["User-generated stories, along with their visual content, expire after 18 hours and are removed from both the database and storage to maintain the original structure and content of the site. This is done through the ",(0,a.jsx)(s.strong,{children:(0,a.jsx)(s.a,{href:"https://github.com/its-mohammad-js/EcoVibe/blob/main/.github/workflows/removeExpiredStories.yml",children:"remove expired stories"})})," GitHub action."]}),"\n",(0,a.jsx)(s.h4,{id:"stories-modal",children:"Stories Modal"}),"\n",(0,a.jsxs)(s.p,{children:["The view and UI of stories make up a significant part of the application. The logic of nested lists and the overall appearance of the component have been repeated in several parts of the app. For this reason, the ",(0,a.jsx)(s.strong,{children:(0,a.jsx)(s.a,{href:"https://github.com/its-mohammad-js/EcoVibe/tree/main/src/common/UI%20elements/StoriesList",children:"stories modal"})})," component was designed and developed. By drawing inspiration from Instagram\u2019s visual design, the aim was to provide users with the best possible user experience."]})]})}function c(e={}){const{wrapper:s}={...(0,i.R)(),...e.components};return s?(0,a.jsx)(s,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}},8453:(e,s,t)=>{t.d(s,{R:()=>o,x:()=>n});var r=t(6540);const a={},i=r.createContext(a);function o(e){const s=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function n(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),r.createElement(i.Provider,{value:s},e.children)}}}]);