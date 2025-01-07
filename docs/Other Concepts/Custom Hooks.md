---
sidebar_position: 1
---

### Overview

One of the easiest and most efficient ways to globalize repetitive logic is by creating custom hooks. Due to the relative complexity of the project, varying device behaviors, and diverse requirements, the number of custom hooks developed for this project is somewhat higher than usual. These hooks allow us to manage specific, repetitive logic in a centralized way and share it effectively across different parts of the application, eliminating the need for duplicated or complex code. As a result, using custom hooks significantly improves code quality, ease of maintenance, and provides greater flexibility. The custom hooks that have not been explained so far will now be reviewed.

### useDisableScroll

The custom hook in question, as its name suggests, is responsible for disabling the **`window`** scroll at specific moments. This hook is purposefully designed to halt scrolling in certain scenarios, ensuring that only specific interactions are active for the user. This feature is especially useful when there is a need for precise control over the page behavior and its interactions.

Two main conditions cause the scroll to be disabled:

<ul>
<li>The maximum **screen width** passed to the component.</li>
<li>A **custom condition** passed to the component.</li>
</ul>

```jsx title="useDisableScroll"
const useDisableScroll = (minWidth = 480, condition) => {
  // detect size screen
  const screenSize = useMediaQuery({ maxWidth: minWidth });

  // hidden window scroll-bar on mount
  useEffect(() => {
    const checkScreen = Number.isInteger(minWidth) ? screenSize : minWidth;

    document.body.style.overflow =
      !checkScreen || condition ? "auto" : "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [condition, screenSize]);
};
```

### useGetOptions

A key part of the application's information, which includes all the products associated with it, are the supported options stored in the database. To globalize the server requests for the supported options, **[this custom hook](https://github.com/its-mohammad-js/EcoVibe/blob/main/src/common/hooks/useGetOptions.jsx)** is implemented. The main logic of the hook is that it stores the received options in the browser's local memory, and if no previous data is found, it sends a request to the server.

### useMediaQuery

Determining the maximum expected screen width is often crucial for logical operations and the way components are rendered.

```jsx title="useMediaQuery"
const useMediaQuery = ({ maxWidth }) => {
  // width check state
  const [widthCheck, setWidthCheck] = useState(null);
  // check max width on app mount & resize events
  useEffect(() => {
    setWidthCheck(window.innerWidth <= maxWidth);

    function handleResize(e) {
      setWidthCheck(window.innerWidth <= maxWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [maxWidth, window.innerWidth, window.innerHeight]);
  // return results
  return widthCheck || window.innerWidth <= maxWidth;
};
```

### useOutsideCall

The functionality, which is an important and commonly used feature in most React applications, is employed to handle click events outside a specified area and execute a callback. The only additional part in this logic is `defaultState`, which, if its value is truthy, prevents the callback from being executed.

```jsx title="useOutSideClick"
const useOutSideClick = (elRef, callBack, defaultState) => {
  useEffect(() => {
    if (defaultState) {
      return;
    }

    const handleOutside = (e) => {
      if (elRef.current && !elRef.current.contains(e.target)) {
        callBack();
      }
    };

    document.addEventListener("click", handleOutside);

    return () => {
      removeEventListener("click", handleOutside);
    };
  }, [elRef, defaultState]);

  return elRef;
};
```

### useRemoveSlide

A large number of components in the app interact with stories, which makes the two main actions—removing a story and deleting a slide from highlights—become a **[central function](https://github.com/its-mohammad-js/EcoVibe/blob/main/src/common/hooks/useRemoveSlide.jsx)**. This hook provides two main functions, `onRemoveHighlight` and `onDeleteSlide`, as outputs, handling the entire process for both operations.

### useResizeListener

Web applications, due to the varying execution environments, may exhibit different behaviors at different times. One such example is the misalignment of component heights with the browser or various app states. This occurs, for instance, when a user interacts with an on-screen keyboard **(on mobile devices)** or when the bottom bar in Chrome is visible. In many cases, these unpredictable behaviors necessitate the configuration of the app. Despite the visual similarities with `useMediaQuery`, this hook produces a different output: it returns the main height of the area currently visible to the user.

```jsx title="useResizeListener"
useResizeListener() {
  const [appHeight, setHeight] = useState(null);

  useEffect(() => {
    const getHeight = () => setHeight(window.visualViewport.height);

    window.addEventListener("resize", getHeight);
    getHeight();

    return () => {
      window.removeEventListener("resize", getHeight);
    };
  }, []);

  return { appHeight };
}
```

### useTouchScroll

Horizontal touch scrolling is almost unavailable in most browsers for larger screen sizes. This custom hook enables this user interaction with containers on larger screen sizes. The architecture and overall structure of this hook are as follows:

```jsx title="useHorizontalTouchScroll"
useHorizontalTouchScroll(elClass, renderTime, elRef) {
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [container, setContainer] = useState(null);

  // set container
  useEffect(() => {
    // note : when a ref attribute is not applicable, we can reference an element by its class name.
    const containerRef = document.querySelector(elClass);

    setContainer(elRef?.current ? elRef?.current : containerRef);
  }, [elClass, renderTime, elRef]);

  // set event listener's to container
  useEffect(() => {
    if (!container) {
      return;
    }

    // on mouse down event
    const setWalk = (e) => {
      setIsDown(true);
      container.classList.add("active");
      setStartX(e.pageX - container.offsetLeft);
      setScrollLeft(container.scrollLeft);
    };
    container.addEventListener("mousedown", setWalk);
    // on mouse leave/up event
    const removeWalk = () => {
      setIsDown(false);
      container.classList.remove("active");
    };
    container.addEventListener("mouseleave", removeWalk);
    container.addEventListener("mouseup", removeWalk);
    // scroll event (on mouse move)
    const walkScroll = (e) => {
      if (!isDown || ![...container.classList].includes("active")) return;
      else {
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1; //scroll-fast
        container.scrollLeft = scrollLeft - walk;
      }
    };
    container.addEventListener("mousemove", walkScroll);
    // remove all events on component unmount
    return () => {
      container.removeEventListener("mousedown", setWalk);
      container.removeEventListener("mouseleave", removeWalk);
      container.removeEventListener("mouseup", removeWalk);
      container.removeEventListener("mousemove", walkScroll);
    };
  }, [container, isDown, startX, scrollLeft]);

  return container;
}
```
