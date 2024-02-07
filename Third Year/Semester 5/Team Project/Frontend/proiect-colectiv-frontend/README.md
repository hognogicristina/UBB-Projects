# MioriticMinds: Interactive Knowledge Testing Platform

## Overview

MioriticMinds is a web application that engages users in various knowledge-testing activities. It features multiple game
modes including text-based questions, visual challenges, and a competitive leaderboard system. This documentation
provides an overview of the application's structure, components, functionality, and installation process.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Components](#components)
3. [Functionality](#functionality)
4. [Technical Details](#technical-details)
5. [Getting Started](#getting-started)
6. [Mockup Server](#mockup-server)
7. [Technology Stack](#technology-stack)
8. [Conclusion](#conclusion)

## Project Structure

The project comprises various React components, interfaces, utility functions, and style sheets.

### Components

- **App.tsx**: Main component setting up the routes using React Router.
- **Header & HomeHeader**: Navigation bars for different pages.
- **GameModes**: Selection of game modes.
- **Leaderboard**: Display of leaderboards for various categories.
- **MyAccount & EditMyAccount**: User account information and editing features.
- **PracticeGame, OnlyText, OnlyPhotos, MixedMode**: Different game modes for users.
- **Register & Login**: User authentication components.
- **QuestionType**: Selection of question types for games.

### Interfaces

- **Jwt, IPerson, Question, Answer, IUser**: Data structures for application data.

### Utilities

- **Validators**: Input validation functions.
- **shuffleArray**: Array shuffling utility.

### Styles

CSS files for styling components, such as `Header.css`, `Home.css`, `GameModes.css`, `Leaderboard.css`, etc.

## Functionality

### User Authentication

Secure registration, login, and account management using JWT tokens.

### Game Modes

Various modes like Practice, Normal (Text, Photos, Mixed) for user engagement.

### Leaderboard

Leaderboards reflecting user rankings and scores in different game modes.

## Technical Details

### Routing

Efficient and responsive routing using `react-router-dom`.

### API Integration

Interaction with external APIs for data fetching and leaderboard updates.

### Error Handling

Form validation and error messaging for API interactions.

### Responsive Design

Adaptable and consistent user experience across different devices.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)

### Installing

1. Clone the repository:
    ```bash
   git clone git@github.com:edwardinio18/proiect-colectiv-frontend.git
   ```
2. Navigate to the project directory:
    ```bash
   cd proiect-colectiv-frontend
   ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```
5. Open http://localhost:5173 in your browser.

## Mockup Server

### Fake Data in `mockup.json`

To run a mockup server:

```bash
npm run mockup-server
```

## Technology Stack

- **React.js**: For building the user interface.
- **CSS**: For styling components.
- **React Router**: For navigation and routing.
- **JWT**: For secure authentication.
- **External APIs**: For data fetching and leaderboards.

## Conclusion

MioriticMinds provides a platform for users to challenge their knowledge in a fun and interactive environment. The
application's scalable architecture and use of modern web technologies ensure a robust and engaging user experience.