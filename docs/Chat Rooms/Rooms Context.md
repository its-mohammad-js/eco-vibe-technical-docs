---
sidebar_position: 1
---

### Overview

Despite all the communication channels that have been provided for sellers and customers so far, nothing beats **real-time** interaction and chatting. This feature enables direct, real-time chat between sellers and customers, allowing both parties to communicate privately and securely with one another.

This space is designed with a visually appealing and simple interface to optimize the user experience for both types of users (sellers and customers). Through this feature, users can share content and feedback, ask questions, and receive quick responses. This real-time interaction allows sellers to easily address customer issues or requests and maintain direct, effective communication with them.

### Rooms Context

Overall, all information related to user chat rooms is globally accessible through a React **context**, making it easier to access all the details of the chat rooms. This approach simplifies state management, reduces complexity, and makes data management much easier. By using this method, it ensures that the flow of information within the chat rooms is seamless and that any updates or changes to the chat data are efficiently handled across the application. That's why the main _chat page_ is rendered within a _context_ that is responsible for storing and managing the core data of the _chat rooms_. **[This context](https://github.com/its-mohammad-js/EcoVibe/blob/main/src/pages/Main%20Pages/Chat/components/RoomsContext.jsx)** ensures that the relevant information is easily accessible and synchronized across the app, allowing for smooth interactions and state management within the chat system.

### UseChatRooms

The task of receiving and customizing the data related to chat rooms is handled by the **useChatRooms** custom hook. This hook separates the server-side requests from the main component, keeping the architecture and structure of the application clean and well-organized. By isolating the data-fetching logic, it ensures that the main components remain simple and focused on their core responsibilities.

**In general, the body of this hook is divided into three main parts:**

#### Get Chat Rooms

Using this hook, the client’s connection to the server is checked, and the user’s authentication status is verified. After both processes are completed, a request is sent to fetch the chat room data. Due to the use of a real-time database, the gap between the loading completion and receiving the room data is so minimal that there is no need for a separate loading indicator.

```jsx title="Get Rooms on app mount"
// get all chat rooms on app mount
useEffect(() => {
  if (auth_status === 200) {
    // declare data base
    goOnline(db);
    // ref to connection path
    const connectedRef = ref(db, ".info/connected");
    // update connection state & get rooms
    onValue(connectedRef, (snap) => {
      if (snap.val() === true && !loading) {
        // get rooms
        getRooms();
      } else {
        // set loading
        setRooms({
          rooms: [],
          status: "loading...",
        });
      }
    });
  } else if (auth_status === 401) {
    // for un-authorized users
    toast("Create an account to join the chat!");
    navigate("/EcoVibe/Customers/sign-up");
  }
  // disconnect from data base on component on mount
  return () => {
    goOffline(db);
    setRooms({ rooms: [], status: null });
  };
}, [userId]);
```

After that, the function sends a request to fetch the chat room data, retrieves all the chat rooms related to the user, and customizes their data according to the program's requirements.

```jsx title="get rooms function"
// get chat rooms data
function getRooms() {
  // ref to related room to current user
  const roomsRef = query(
    ref(db, "rooms"),
    orderByChild(`${userId}/userId`),
    equalTo(userId)
  );

  onValue(roomsRef, (snapshot) => {
    // return 404 state if there wasn't any room
    if (!snapshot.exists()) {
      setRooms({
        rooms: [],
        status: "No Conversations Yet...",
      });
      return;
    }
    // turn all room object to a list
    const allRooms = Object.entries(snapshot.val()).map(([k, val]) => ({
      ...val,
      roomId: k,
    }));

    const filteredRooms = allRooms
      // filter rooms only visible for current user
      .filter(({ members }) => members.includes(userId))
      // update each room data & customize it
      .map((room) => {
        // declare receiver id
        const receiverId =
          room?.members?.find((id) => id !== userId) ||
          Object.keys(room).find(
            (key) => ![userId, "roomId", "messageList", "members"].includes(key)
          );
        // declare owner last seen
        const ownerLastSeen = room[userId]?.last_seen;
        // return customized room object if there was any last seen before (it was used before)
        if (ownerLastSeen || room?.messageList?.length > 0)
          return {
            roomId: room.roomId,
            messageList: room.messageList || null,
            members: room.members,
            // separate owner data from receiver data
            owner: room[userId],
            receiver: {
              ...room[receiverId],
              receiverId,
            },
          };
      });
    // update rooms state
    setRooms({
      rooms: filteredRooms.filter((room) => room),
      status: filteredRooms.length ? null : "No Conversations Yet...",
    });
  });
}
```

#### Update Last Seen Of User

This effect is specifically designed for situations where the browser or client device unexpectedly closes the selected room, ensuring that the user's last visit in that room is updated correctly.

```jsx title="update last seen"
// set last seen on disconnect
useEffect(() => {
  if (selectedRoom && userId) {
    onDisconnect(
      ref(db, `rooms/${selectedRoom.roomId}/${userId}/last_seen`)
    ).set({
      date: serverTimestamp(),
      offline: true,
    });
  }
}, [selectedRoom, userId]);
```

### Remove Expired Rooms

Chat rooms that have been inactive for both parties for seven days are considered expired and are deleted from the database. This process is carried out by the GitHub Action called **[remove expired chat rooms](https://github.com/its-mohammad-js/EcoVibe/blob/main/.github/workflows/RemoveExpiredChatRooms.yml)**.
