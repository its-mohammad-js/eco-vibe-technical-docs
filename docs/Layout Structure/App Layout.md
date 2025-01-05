---
sidebar_position: 1
---

## Layout Overview

The main responsibilities of the **App Layout** component are summarized in two key tasks:

<ul>
  <li><strong>Conditional Rendering of Components Based on URL Path</strong></li>
  <li><strong>Adjusting the Overall Layout Size to Prevent Structural Issues Across Different Browsers</strong></li>
</ul>

For determining the rendering of the navbar, the page size is used as the criteria. In other cases, layout components are not rendered on certain routes. This is achieved using a simple state and effect. To adjust the page size for different screen sizes, a custom hook is employed.

```jsx title="App Layout"
function AppLayout({ children }) {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [allowed, setAllowed] = useState(true); // allow display navbar & footer state
  const location = useLocation(); // location hook
  const { appHeight } = useResizeListener();

  // update allowing state on routes change
  useEffect(() => {
    const pathName = location.pathname
      .split("/")
      .map((name) => name.toLocaleLowerCase());

    setAllowed(!pathName.includes("seller") && !pathName.includes("messages"));
  }, [location]);

  return (
    <div
      style={{
        height: appHeight,
      }}
    >
      {allowed && (
        <div className="relative">
          {isMobile ? <MobileNavbar /> : <DesktopNavbar />}
        </div>
      )}
      {children}
      {allowed && <Footer />}
    </div>
  );
}
```
