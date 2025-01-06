---
sidebar_position: 2
---

### Summary

To avoid unnecessary complexity and improve code readability, the **navbar is divided into multiple sections** that are rendered under different conditions. Despite the initial appearance, the structure of the application is developed in a way that makes each section easily understandable. Therefore, a deep explanation has been avoided, and instead, the overall structure has been outlined.

### Desktop navbar

The navbar for larger screen sizes (desktop) is divided into two main sections due to its different appearance across various routes:

<ul>
  <li><strong>Main Navbar:</strong> The primary navbar, rendered most frequently across different sections.</li>
  <li><strong>Mega Menu (Home Page):</strong> A submenu that provides quick access to product types, collections, and various categories, making navigation easier.</li>
</ul>

Another interesting part of the desktop navbar is the **Navbar Frame**, where both main sections are rendered as children within this component:

```jsx title="jsx of navbar frame"
<div
  ref={navbarRef}
  className={`${
    stickyRoutes.includes(location.pathname) &&
    "fixed opacity-0 z-50 bg-gray-50 [&>div]:border-b-0 w-full"
  } flex flex-col transition-all mx-auto 2xl:max-w-screen-2xl`}
>
  {/* header links (only display on home page) */}
  <div
    className={`${
      location.pathname === "/EcoVibe/" ? "flex" : "hidden"
    } w-full border-b border-gray-200 items-center justify-between px-8 py-2`}
  >
    {/* header links */}
    <div className="flex items-center gap-x-5">
      {mainRoutesInfo.map(({ title, path }, index) => (
        <Link
          key={index}
          to={path}
          className="text-gray-600 line-clamp-1 hover:text-primary-500 transition-all duration-300"
        >
          {title}
        </Link>
      ))}
    </div>
  </div>
  {/* main navbar */}
  <MainNavbar />
  {/* sub menu (only dispaly on home page) */}
  <SubMenu />
</div>
```

By now, you’ve likely noticed the behavior of the sticky (controlled) navbar on certain routes. Thanks to this effect, the functionality is achieved. Despite utilizing the DOM, it still works seamlessly and remains customizable.

```jsx title="use sticky control"
// change navbar posiotion on window scroll
useEffect(() => {
  // destructure navbar from ref
  const navbarEl = navbarRef?.current;

  // reset navbar style & remove handle scroll event in other routes
  if (!stickyRoutes.includes(location.pathname)) {
    navbarEl.style.opacity = 1;
    navbarEl.style.transform = "none";
    navbarEl.style.position = "relative";
    window.removeEventListener("scroll", handleScroll);
    return;
  }

  // change navbar position functionality
  function handleScroll() {
    // define window scroll
    const scrollY = window.scrollY;
    // hidden scroll bar
    if (scrollY <= 100) {
      navbarEl.style.position = "fixed";
      navbarEl.style.opacity = 0;
      navbarEl.style.transform = "translateY(-50%)";
    }
    // diplay on user scroll
    else {
      navbarEl.style.opacity = 1;
      navbarEl.style.position = "fixed";
      navbarEl.style.transform = "translateY(0)";
    }
    // hidden after hero section
    if (scrollY >= 700) {
      navbarEl.style.opacity = 0;
    }
  }

  // set handle scroll to navbar (only in allowed routes)
  window.addEventListener("scroll", handleScroll);
  // call handle scroll to change navbar position on mount
  handleScroll();

  // reset events on um-mount
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [location.pathname]);
```

### Mobile Navbar

The mobile menu offers a simpler design while providing the **same access** to users, but in a **different UI layout** and appearance. Naturally, this component is also composed of a main navbar and a side menu

### Search modal

The search modal, which provides access to all products and main sellers on the site, is always available and accessible from any route. The primary purpose of this component is to offer easy access to products or sellers, regardless of the user's location within the application.

**Quick Search Modal**: **[Code](https://github.com/its-mohammad-js/EcoVibe/tree/main/src/layout/Navbar/modals/Search%20Modal)**

The main parent component is the **Quick Search Modal**, where the details of products and sellers are rendered.

### quick access menu

One of the most notable and important features of the application is the Quick Access Menu, which provides easy and precise access to information for both user types. It is designed to be useful for both sellers and customers.

**Quick access menu**: **[Code](https://github.com/its-mohammad-js/EcoVibe/tree/main/src/layout/Navbar/modals/Quick%20Access%20Menu)**

Up to this point, the necessary concepts for understanding the overall layout have been explained. Despite the clear architecture of the application, after reading this document, you should have a better grasp of the project structure. It is worth mentioning that the class commonly used for large containers, and repeated throughout the application, is a Tailwind CSS class :

<code><strong>mx-auto 2xl:max-w-screen-2xl</strong></code>
