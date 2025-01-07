---
sidebar_position: 3
---

### Overview

The general structure of the component for **[story lists](https://github.com/its-mohammad-js/EcoVibe/tree/main/src/common/UI%20elements/StoriesList)** might appear a bit complex initially, as the same central component is used in **various parts** of the application. The main goal was to minimize the visual complexity of the code and avoid repeating identical logic. However, once the story data structure and the interaction of the **[StoryListModal.jsx](https://github.com/its-mohammad-js/EcoVibe/blob/main/src/common/UI%20elements/StoriesList/StoryListModal.jsx)** component are properly understood, this complexity can be easily resolved. Thanks to the modular design and architecture of the component, it becomes much easier to grasp.

### Lists Logic

The core structure of the Story Modal is designed to manage and display nested lists. The modal needs to showcase a list of available stories from sellers, where each list contains the seller's slides and stories. Additionally, it must handle user interactions with each slide effectively.

The main structure of each slide is processed and displayed following this algorithm:

<ul>
<li>All slides are organized based on the seller’s ID.</li>
<li>Each seller has a list of their own slides, which are displayed accordingly.</li>
</ul>

The task of fetching data related to stories is managed by a central hook named **[useGetStories](https://github.com/its-mohammad-js/EcoVibe/blob/main/src/common/hooks/useGetStories.jsx)**. This hook is responsible for retrieving, sorting, and organizing the slides.

#### The sorting and categorization of the slides.

The core functionality of the <code>useGetStories</code> hook is divided into two main tasks:

<ul>
<li>Fetching the slide data in real-time.</li>
<li>Sorting and grouping the slides by the seller's ID and the visitor's viewing activity.</li>
</ul>

The main function responsible for sorting the lists and slides, as well as grouping the lists, is as follows:

```jsx title="group & sort slides"
const groupAndSort = (stories) => {
  // Group slides by their authors into story (list) arrays
  const grouped = groupBy(stories, "authorId");

  // Add `isSeen` property to each slide and extract author details
  Object.keys(grouped).forEach((authorId) => {
    grouped[authorId] = grouped[authorId].map((slide) => ({
      ...slide,
      isSeen: slide.seenBy?.includes(userId),
    }));
  });

  // Sort authors with a custom sort function
  const sortedAuthors = orderBy(
    Object.keys(grouped),
    [
      (author) => author === userId, // User ID comes first
      (author) =>
        grouped[author].every(
          (slide) => slide.isSeen || slide.authorId === ownerId
        ), // Authors with unseen slides come first
    ],
    ["desc", "asc"] // Ensure userId is prioritized, then unseen slides
  );

  // decide to update sort order (don't allowed on modal is open)
  orderListRef.current = isModalOpen ? orderListRef.current : sortedAuthors;

  // Map sorted authors with their details
  return orderListRef.current.map((authorId, listIndex) => {
    const slides = grouped[authorId];

    return {
      authorId,
      first_name: slides[0]?.author?.first_name,
      last_name: slides[0]?.author?.last_name,
      profile_pic: slides[0]?.authorProfilePic,
      slides,
      isSeen: slides.every(({ isSeen }) => isSeen),
      listIndex,
    };
  });
};
```

As indicated by the function structure, a reference is used to determine whether a sorting operation should be executed, or if the previously sorted data can be reused (this applies only to list sorting).

Given the real-time nature of user interactions, the visit tracking (sorting the lists) should only take place when the user is not actively viewing the stories. When the story modal is closed, the other story lists are updated based on the user's slide views.

### Logic for Displaying Lists and Slides

Whenever the <code>StoryListModal</code> is rendered, certain key props need to be passed to it according to the specific conditions. The most important of these are the data of the lists and the index of the current list.

depending on the context of rendering the modal (for a single person or for all stories), the type of component mounting differs.

**Signle User**

```jsx title="story modal for signle seller"
<StoryListModal
  {...{
    currentListIndex: isStoriesShow,
    setList: setStorieModal,
    storiesList: [storiesList[0]],
  }}
/>
```

**All Stories List**

```jsx title="story modal for all stories"
<StoryListModal {...{ currentListIndex, setList, storiesList }} />
```

The rendering of the slide lists is based on the <code>currentListIndex</code>. Lists that are not current are displayed only as an option. Additionally, to apply pagination and prevent excessive rendering of lists, the <code>getPaginatedLists</code> function is used, so only lists close to the user’s view range are displayed.

The JSX body of the **StoryListModal** component is responsible for conditionally rendering the lists. This component dynamically loads and displays the lists based on different indices and render conditions. As a result, only the necessary lists close to the user's view range are rendered, preventing unnecessary and excessive rendering.

```jsx title="story list modal jsx"
{
  getPaginatedLists().map(({ slides: list, listIndex }) => {
    if (list)
      return (
        <div key={listIndex}>
          {/* slides of selected list */}
          {list.map((story, slideindex) =>
            currentListIndex === listIndex ? (
              currentSlideIndex === slideindex && (
                // current slide (provider renders just once when slideIndex is equal to currentSlideIndex)
                <SlideContext.Provider
                  value={{
                    changeStoryHandler: changeStory,
                    listIndex,
                    currentListIndex,
                    list,
                    currentSlideIndex,
                    slideindex,
                    story,
                  }}
                >
                  <SlideFrame key={slideindex} />
                </SlideContext.Provider>
              )
            ) : (
              // next || prev slides
              <div key={slideindex}>next || prev list</div>
            )
          )}
        </div>
      );
  });
}
```

### User interaction with the modal and handling touch events

Naturally, the way users interact with and browse lists requires handling two different experiences for mobile and desktop. The `StoryModalList` structure is designed in such a way that functions related to handling touch actions and the logic for interacting with lists are offloaded to a custom hook called **useStoryList(https://github.com/its-mohammad-js/EcoVibe/blob/main/src/common/UI%20elements/StoriesList/hooks/useStoryList.jsx)**. This hook is specifically responsible for managing and responding to user interactions with the lists, ensuring a smooth and optimized user experience on both mobile and desktop platforms.

Using this hook not only separates complex logic from the components but also enables developers to manage various functionalities across different environments (mobile or desktop) with minimal changes and complexity.

Each slide comes with various features, such as providing feedback on the slide, accessing the context menu, and managing the slide for the owners. However, the most important logic in displaying each slide individually is related to **timing**, which is handled by the **[useTimer](https://github.com/its-mohammad-js/EcoVibe/blob/main/src/common/UI%20elements/StoriesList/hooks/useTimer.jsx)** hook. This hook is responsible for managing the timing of each slide and displaying them dynamically.

The timing logic works in such a way that each slide is shown for a specific duration, after which it transitions to the next slide. This timing is precisely controlled by the `useTimer` hook to provide a seamless and fully synchronized experience for the user.

#### Content Switcher

One of the recurring logics throughout the application was the conditional rendering of visual content, such as videos or images, which was mostly repeated in features related to stories. To control and avoid code repetition, a **[central component](https://github.com/its-mohammad-js/EcoVibe/blob/main/src/common/UI%20elements/ContentSwitcher/ContentSwitcher.jsx)** was created for this purpose, which can be synchronized with both the Story Modal and other sections of the application. This component effectively eliminates redundant code and enables centralized management and rendering of visual content across various parts of the app.
