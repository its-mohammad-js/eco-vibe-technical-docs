"use strict";(self.webpackChunkeco_vibe_document=self.webpackChunkeco_vibe_document||[]).push([[8736],{220:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>a,default:()=>p,frontMatter:()=>i,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"App & Routes/Grouped Routes","title":"Grouped Routes","description":"Route Naming Syntax","source":"@site/docs/App & Routes/Grouped Routes.md","sourceDirName":"App & Routes","slug":"/App & Routes/Grouped Routes","permalink":"/eco-vibe-technical-docs/docs/App & Routes/Grouped Routes","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/App & Routes/Grouped Routes.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1},"sidebar":"tutorialSidebar","previous":{"title":"App And Routes","permalink":"/eco-vibe-technical-docs/docs/category/app-and-routes"},"next":{"title":"Lazy Loading & Protected Route","permalink":"/eco-vibe-technical-docs/docs/App & Routes/Lazy Loading & Protected Route"}}');var o=n(4848),r=n(8453);const i={sidebar_position:1},a=void 0,u={},l=[{value:"Route Naming Syntax",id:"route-naming-syntax",level:3},{value:"General Rule for Route Grouping",id:"general-rule-for-route-grouping",level:3},{value:"Example (Main Routes)",id:"example-main-routes",level:3}];function c(e){const t={code:"code",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h3,{id:"route-naming-syntax",children:"Route Naming Syntax"}),"\n",(0,o.jsxs)(t.p,{children:["The project is deployed on ",(0,o.jsx)(t.strong,{children:"GitHub Pages"}),", with the base URL set to ",(0,o.jsx)("code",{children:"/EcoVibe/"}),'.\nFor example, a route for a page like "Shop" would be defined as:']}),"\n",(0,o.jsx)("li",{children:"/EcoVibe/Shop"}),"\n",(0,o.jsx)(t.h3,{id:"general-rule-for-route-grouping",children:"General Rule for Route Grouping"}),"\n",(0,o.jsxs)(t.p,{children:["As previously mentioned, route grouping has been done with a focus on optimizing the user experience. ",(0,o.jsx)(t.strong,{children:"The goal is to make the structure as intuitive and straightforward as possible"}),", minimizing unnecessary complexity. The primary route groups are as follows:"]}),"\n",(0,o.jsxs)("ul",{children:[(0,o.jsxs)("li",{children:[(0,o.jsx)("strong",{children:"Main Pages:"})," Pages that are accessible to all users, regardless of user type."]}),(0,o.jsxs)("li",{children:[(0,o.jsx)("strong",{children:"Auth Routes:"})," Pages related to user authentication, including login, signup, and submit personal/business information."]}),(0,o.jsxs)("li",{children:[(0,o.jsx)("strong",{children:"Customer Routes:"})," Pages dedicated to the customer journey, including the shopping process and customer profile management."]}),(0,o.jsxs)("li",{children:[(0,o.jsx)("strong",{children:"Seller Routes:"})," Pages for managing and viewing the seller's profile, products, and sales-related information."]})]}),"\n",(0,o.jsx)(t.h3,{id:"example-main-routes",children:"Example (Main Routes)"}),"\n",(0,o.jsx)(t.p,{children:"From a syntactical perspective, each group consists of an array of main routes that are loaded using the lazy loading method:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-jsx",metastring:'title="Main Routes"',children:'const MainRoutes = [\n  // main pages\n  <Route key="home" path="/EcoVibe/" element={<HomePage />} />, // home page\n  <Route key="shop" path="/EcoVibe/Shop" element={<ShopPage />} />, // shop page\n  <Route\n    key="explore-products"\n    path="/EcoVibe/Explore-Products/:filters?"\n    element={<ExploreProducts />}\n  />, // explore products page\n  <Route\n    key="product-detail"\n    path="/EcoVibe/Products/:productId?"\n    element={<ProductDetailsPage />}\n  />, // product details page\n  <Route key="chat-room" path="/EcoVibe/Messages/" element={<ChatPage />} />, // chat room page\n];\n'})}),"\n",(0,o.jsx)(t.p,{children:"Some of the routes (in the authentication section) consist of multiple nested steps:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-jsx",metastring:'title="Auth Routes"',children:'const AuthRoutes = [\n  // customer authetication steps\n  <Route\n    key="customers-auth"\n    path="/EcoVibe/Customers/"\n    element={<CustomerAuthPage />}\n  >\n    {/* step 01: customers-signup */}\n    <Route path="sign-up" element={<SignUpCustomer />} />\n    {/* step 02: personal information */}\n    <Route path="personal-details" element={<PersonalDetailsForm />} />\n    {/* step 03: customer interests */}\n    <Route path="user-intersets" element={<UserInterestsForm />} />\n  </Route>,\n  // sellers authetication steps\n  <Route\n    key="sellers-auth"\n    path="/EcoVibe/Sellers/"\n    element={<SellerAuthPage />}\n  >\n    {/* step 01: sellers signup */}\n    <Route path="sign-up" element={<SignUpSeller />} />\n    {/* step 02: business information */}\n    <Route path="business-details" element={<BusinessInfoForm />} />\n  </Route>,\n  // sign-in page for both type user\'s\n  <Route key="sign-in" path="/EcoVibe/sign-in" element={<SignInPage />} />,\n];\n'})})]})}function p(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>a});var s=n(6540);const o={},r=s.createContext(o);function i(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);