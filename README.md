# TodoASP - React Native

This is a React Native project that is a clone of the popular to-do list app Todoist. The app allows users to create, edit, and delete tasks, as well as mark them as complete or incomplete.


## Goals

This project is meant for studying and practicing mobile development. It will be improved in small steps.

## Milestones

-   [x] Base Inbox page [ Apr 4, 2023 ]

    -   [x] Create task, with name, due date, description, and priority values
    -   [x] View & Edit tasks
    -   [x] Check tasks completed and uncompleted
    -   [x] Be able to toggle between seeing completed tasks and not seeing
    -   [x] Delete task
    -   [x] At this point, all data should be persisted locally with AsyncStorage


-   [x] Today page [ Apr 24, 2023 ]

    -   [x] Add routing the the application, make sure it supports Inbox and Today pages
    -   [x] Today page should show only overdue tasks and tasks due today. Separated between sections
    
    
<div align="center">
<video src="https://user-images.githubusercontent.com/38574361/234885730-47baf1b6-192f-458b-8a20-da2bab18f497.mp4" />
</div>


-   [ ] Improve the date picker

-   [ ] Add a dark theme

-   [ ] To be determined

## Getting Started

To get started with the project, clone this repository to your local machine:

```bash
git clone https://github.com/Neuhaus93/TodoASP.git
```

Then, navigate to the project directory and install the necessary dependencies:

```bash
cd TodoASP
npm install
```

Finally, start the project with:

```bash
npm run start
```

This will start the development server and open the Expo client in your browser. You can then use the Expo client to run the app on your iOS or Android device, or in a simulator.

## Features

The Todoist clone has the following features:

-   Create new tasks with a title and description
-   Edit existing tasks
-   Delete tasks
-   Mark tasks as complete or incomplete
-   View completed tasks separately

## Technologies Used

The project was built with:

-   React Native
-   Expo
-   Expo router
-   React Native Animated

## Contributing

Contributions to the project are welcome. To contribute, fork the repository and create a new branch for your changes:

```bash
git checkout -b my-new-feature
```

Then, make your changes and commit them with a descriptive message:

```bash
git commit -m "Add some feature"
```

Finally, push your changes to your fork and create a pull request.

## License

This project is licensed under the MIT License.
