---
sidebar_position: 2
---

### Chat List

The first section of the chat page that the user interacts with is the **chat list**. It is developed in a modular and simple way, and in terms of appearance, it displays all the available rooms for the user while maintaining details and using a context menu. The details and features of this component will be addressed section by section below.

#### Delete Chat Rooms Rule

The chat room menu context has its most important feature in the ability to delete chat rooms. Here, this action is being examined. In the object of each room, there is a property called **members**, which simply and directly determines which users the chat room is visible to. When a one-sided chat room is deleted, the first change is that this array becomes a list with only one element.

```jsx title="members list of room object"
{
 members: ["userId"],
}
```

In the second stage, if the last remaining user in the chat room also deletes the room, it will be completely removed from the database and no longer accessible. However, in the first case, the deletion is **one-sided** for users, meaning the other user (the counterpart) still has access to the room and the **previous chats**.

**Note**: It is worth mentioning that after a one-sided deletion, if either of the users sends a new message, causing the chat room to become visible to both parties again, the previous chats that were deleted by the first user will no longer be accessible to them.

#### Contacts & Create New Chat Room

For both types of users (customers and sellers), the contact list is available. In the first step, all sellers are accessible to message customers. In the second step, sellers can access their customers and create new chat rooms. To create a new chat room in any other part of the application, **[useCreateChatRoom](https://github.com/its-mohammad-js/EcoVibe/blob/main/src/common/hooks/useCreateChatRoom.jsx)** is used, which is a custom hook that makes the functionality of creating a new chat room accessible across the entire application. The main structure of this hook is that it first checks whether a chat room between the user and the recipient exists. If it doesn't exist, a new chat room is created. Ultimately, in both cases, a **callback** is executed, which has a different behavior depending on the context in which the hook is called.

#### Search Contacts & Messages in Chat List

In the chat list, there is a search feature for both contacts and messages, which makes it easier for users to access all chat rooms. This feature is implemented in the **[chatList](https://github.com/its-mohammad-js/EcoVibe/blob/main/src/pages/Main%20Pages/Chat/components/Chat%20List/ChatList.jsx)** component and, despite its simplicity, works seamlessly alongside the core functionality of the component, which is to display all chat rooms. Due to the real-time nature of chat updates, this feature also operates in real-time, providing the best possible user experience for a web-based chat platform.

### Room Layout

The core aspect of chat rooms is the layout and how the different components of the chat room are arranged together, which is configured and managed by the **[RoomLayout](https://github.com/its-mohammad-js/EcoVibe/blob/main/src/pages/Main%20Pages/Chat/components/Chat%20Room/RoomLayout/RoomLayout.jsx)** component. Each chat room is rendered with a specific layout and related features within this component. This structure ensures that the different elements of the chat room are organized and positioned efficiently, providing a smooth and well-organized chat experience for users.

The overall structure of RoomLayout is designed to position the different components of the chat room together. In this component, all features and settings related to the chat room are executed and rendered. Additionally, the main room size is automatically adjusted when the screen size changes, ensuring that the chat room is always fully accessible and optimized for the user.

```jsx title="room Layout"
<div
  style={{
    height: appHeight,
  }}
  className={`${
    selectedRoom ? "col-span-9 col-start-4 flex" : "hidden"
  } lg:! flex flex-col lg:w-3/4 !w-full h-full bg-slate-200 items-center justify-center relative`}
>
  {/* user info nav */}
  <div ref={navRef} className="w-full">
    <Navbar {...{ deleteRoom, setShowAlert }} />
  </div>
  {/* messages list */}
  <MessageList />
  {/* send message input */}
  <MessageInput />
  {/* Draggable element to return to the chat list.  */}
  {/* This element is only visible on mobile devices and when the virtual keyboard is active. */}
  <DraggableEl />
</div>
```

#### Draggable Element

The idea of creating a **draggable element** actually stemmed from an **unavoidable browser behavior**. In most browsers on mobile devices, when the user's keyboard appears, the keyboard is treated as part of the main screen. While the page height adjusts in this situation, a scrollable empty space remains right under the keyboard. This empty space can disrupt the user experience, especially when interacting with elements on the page, which led to the need for creating a draggable element to improve the management of the page's space.

![Example Gif](/img/Draggable-element-test.gif)

As you can observe, the empty space that appears beneath the keyboard has been turned into a sliding element. Now, the user can scroll past it, which allows them to move out of the current chat screen if they **scroll too far**. User interaction and page scrolling are handled through touch event controls, managed by the custom hook below. It has been developed in a way that provides the best possible user experience without adding unnecessary complexity to the code.

```jsx title="useTouchHandlers custom hook"
export function useTouchHandlers(selectedRoom, setSelectedRoom, setEl, navRef) {
  useEffect(() => {
    // handle touch actions
    const handleTouch = (e, type) => {
      // declare touch event
      const touch = type === "move" ? e.touches[0] : e.changedTouches[0];
      // declare delta y
      const deltaY = touch.screenY - touch.pageY;
      // adjust rotate & opacity of element on touch moves (scrolls)
      if (type === "move" && deltaY < 87) {
        const opacity = (touch.pageY - touch.screenY) / 50 + 1.5;
        const rotate = Math.min(Math.max(opacity * 85, 0), 180);
        // update element style
        setEl({
          opacity: opacity / 3,
          rotate,
        });
      }
      // finally decide on touch (scroll) end
      if (type === "end") {
        // close the chat room if user scrolls down completely
        if (deltaY < -20) {
          setSelectedRoom(null);
        }
        // scroll up if user hasn't enough scroll
        else if (deltaY < 87) {
          navRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
          setEl({ rotate: 0, opacity: 0 });
        }
      }
    };
    // declare & add event listeners
    const onTouchMove = (e) => handleTouch(e, "move");
    const onTouchEnd = (e) => handleTouch(e, "end");

    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    // remove events on un-mount
    return () => {
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [selectedRoom, setSelectedRoom, setEl, navRef]);
}
```

#### Selected Message Usage & Scrolling

Throughout various stages of user interaction with the application, the user may want to target a specific message, reply to it, or edit it. The central state that tracks the targeted message is crucial for managing and synchronizing all chat components, ensuring a seamless and consistent user experience.

```jsx title="selected message state"
const [selectedMessage, setSelectedMessage] = useState(null); // selected message state
```

```jsx title="access to selected message"
const { selectedMessage } = useRoomsData();
```

When the user selects a message through the search functionality, the messages list must automatically scroll to that specific message.

```jsx title="scroll to selected message"
// scroll to selected message
useEffect(() => {
  if (selectedMessage) {
    const selectedMessageEl = document.getElementById(
      `${selectedMessage.uiid}`
    );

    selectedMessageEl.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }
}, [selectedMessage]);
```

**Note:** The reason for referencing the selected message through the DOM is that it wasn't possible to define a local reference for it and pass it down to all components.

#### Navbar Search Messages

One of the most important features of the chat room is the **[notification bar](https://github.com/its-mohammad-js/EcoVibe/blob/main/src/pages/Main%20Pages/Chat/components/Chat%20Room/RoomLayout/Navbar/Navbar.jsx)**, which displays various information, including user details and their last visit. The first feature of the notification bar is the in-chat search, which allows the user to search in real-time through all the messages exchanged in the chat room. When a user performs a search within the messages, the layout of the chat room adjusts, allowing the user to see their search results and scroll through the messages accordingly.

#### Messages Layout

Given the diversity of message types, a **[general layout](https://github.com/its-mohammad-js/EcoVibe/blob/main/src/pages/Main%20Pages/Chat/components/Chat%20Room/Messages%20List/MessageLayout.jsx)** for the messages is designed, determining the placement, timestamp, and overall styling of the messages according to the sender. This layout plays a crucial role in constructing the message list. Moreover, the message context menu, offering options to reply, edit, or delete messages, is seamlessly incorporated into this component.

##### Messages Types

Overall, the primary types of messages that can be sent and rendered include text messages, order or purchase messages, product-related messages, and location-based messages. The UI switches between different message types based on the <code>type</code> property.

```js title="message type switcher"
{
  message.type === "text" ? (
    <p className="text-start w-full break-words max-w-96">{message.content}</p>
  ) : message.type === "order" ? (
    <OrderTypeMessage message={message} />
  ) : message.type === "location" ? (
    <LocationTypeMessage message={message} />
  ) : (
    <ProductTypeMessage message={message} />
  );
}
```

#### Send / Edit & Reply To Message

Users can send and edit messages in real-time through the **[messageInput.jsx](https://github.com/its-mohammad-js/EcoVibe/blob/main/src/pages/Main%20Pages/Chat/components/Chat%20Room/RoomLayout/MessageInput/MessageInput.jsx)** component, which provides easy access to these actions. In addition, users have the ability to reply to both their own and their recipient's messages, and can send various types of messages.

### Last Seen Logic

To enhance user experience, owners can monitor the last visit of their recipient in the chat room or chat list. However, the core logic for tracking the last visit is not entirely managed by the server. As previously mentioned, the last visit is updated in several parts of the code, with the most critical update occurring in the message list or chat room, where the user's last visit is refreshed in real-time.

```jsx title="update last seen"
// set last seen
useEffect(() => {
  if (!lastRoom) {
    return;
  }
  // db ref
  const db = getDatabase();
  const roomsRef = ref(db, `rooms/${lastRoom.roomId}/${userId}/last_seen`);
  // set user status online
  if (selectedRoom) {
    set(roomsRef, {
      date: serverTimestamp(),
    });

    const interval = setInterval(() => {
      set(roomsRef, {
        date: serverTimestamp(),
      });
    }, 45000); // Adjust interval as needed

    return () => {
      update(roomsRef, {
        date: serverTimestamp(),
        offline: true,
      });
      clearInterval(interval);
    };
  }
  // set user status offline
  return () => {
    update(roomsRef, {
      date: serverTimestamp(),
      offline: true,
    });
  };
}, [lastRoom]);
```

Moreover, in the recipient's status bar, the logic for determining the last visit of the user is processed in real-time. Even if, for any reason, the last visit is not recorded correctly, the recipient will quickly be alerted when the user goes offline.

```jsx title="display last seen"
// update last seen
useEffect(() => {
  if (!last_seen) {
    return;
  }
  // ref to current time offset
  const db = getDatabase();
  const serverTimeRef = ref(db, ".info/serverTimeOffset");
  // ref to interval
  let intervalId;
  // get server time and update last-seen ref
  const fetchServerTime = () => {
    onValue(
      serverTimeRef,
      (snapshot) => {
        // Get the current server time
        const serverTime = Date.now() + snapshot.val();
        // Step B-1 & B-2: Calculate the difference between lastSeen.date and serverTime
        const timeDifference = serverTime - last_seen?.date;
        const timeDifferenceInSeconds = Math.floor(timeDifference / 1000);
        // Update the lastStatus based on the difference
        lastStatus.current =
          timeDifferenceInSeconds >= 30 || last_seen?.offline
            ? `last seen at ${calculateLastseen(last_seen?.date)}`
            : "online";
      },
      { onlyOnce: true } // Make sure this reads only once for each fetch
    );
  };

  // Start an interval to fetch server time repeatedly
  fetchServerTime(); // Fetch immediately
  intervalId = setInterval(fetchServerTime, 15000); // Check every 30 seconds

  // Cleanup interval and Firebase listener on component unmount
  return () => {
    clearInterval(intervalId);
  };
}, [last_seen]);
```

### User Info Tab

Every chat room allows for the review of user information and their most recent interactions. The nature of these interactions depends on the type of user. If the user type is <code>both</code>, their interactions will be shown both as a customer (including their purchases and product feedback) and as a seller (including their core seller information).

```jsx title="user info parent"
const [infoTab, setInfo] = useState(null);

useEffect(() => {
  setInfo(receiver?.userType === "customer" ? "customer" : "seller");
}, [receiver?.userType]);

return (
  <div>
    <div
      className={`${
        receiver.userType === "both" ? "block" : "hidden"
      } w-full flex py-2 items-center justify-between`}
    >
      <button
        onClick={() => setInfo("seller")}
        className={`${
          infoTab === "seller" && "text-gray-950"
        } px-4 hover:text-gray-700 rounded-md w-1/2`}
      >
        Seller Info
      </button>
      <button
        onClick={() => setInfo("customer")}
        className={`${
          infoTab === "customer" && "text-gray-950"
        } px-4 text-gray-500 lg:hover:text-gray-700 rounded-md w-1/2`}
      >
        Customer Info
      </button>
    </div>
    {/* user information */}
    {infoTab === "customer" ? <CustomerInfo /> : <SellerInfo />}
  </div>
);
```
