---
sidebar_position: 3
---

## Overview of State Management in the Application

Two main approaches have been defined for managing and distributing the application's state. By understanding these approaches, you can gain deeper insights into the structure of the pages and how they interact with the state management system.

### Approach 1:

State distribution for critical and frequently used data is handled through **Redux**. This approach was chosen due to the repetitive need for certain data throughout the application. Further details and examples of this method are provided in the following sections of the documentation.

### Approach 2:

In cases where the complexity of a page's details increases significantly, the need for centralized state management becomes more apparent. However, since the required data type is only relevant within specific pages or components, the standard **React Context** method is used instead of Redux. This approach ensures localized state management while maintaining simplicity and avoiding unnecessary global state overhead.

**Note:** Each approach, especially Redux, has been examined in greater depth in the subsequent sections.
