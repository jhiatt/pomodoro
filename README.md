# React Pomodoro App with Rails, MongoDB backend

## Getting Started
Download two repositories from GitHub and perform the following steps:
1. Pomodoro (this one):
- ensure you have the latest version of npm
- in the terminal run npm start
- open your browser page to 'http://localhost:3000/'
2. Mongo-Api
- ensure you have ruby 2.6.5 installed on your computer
- run 'bundle install' in the terminal
- ensure you [download and instal MongoDB](https://docs.mongodb.com/manual/installation/) if you don't already have it
- Any issues use [this tutorial for reference](https://docs.mongodb.com/mongoid/current/tutorials/getting-started-rails/#rails-api)
- enter the rails console with 'rails c' and create a user with 'User.create' (no attributes needed)
- start the server with rails s (exit rails console first or do this in a seperate terminal window)
- in your browser visit 'http://localhost:3001/users' and look for the $oid key.  Copy the value (should look like: "5e8d31ad6ea1e21e3c28a34a") and replace the user id in this put request in the task.js file: 'putData(`http://localhost:3001/users/5e8d31ad6ea1e21e3c28a34a`' 

With these steps you should be good to go.

## About this App
This app is built with the mindset that it should function 100% in React, relying on API calls only for continuity through refreshes or leaving and revisiting the app.  

Leaning primarily on React rather than the backend leads to a much faster more reliable app (in the imediate timeframe at least).  In fact, if you remove the API calls, this app functions exactly as expected as long as the page is open and not refreshed.

With the API calls added, previously added tasks and their statuses are remembered, and a timer that has been started but not finished will continue when the page loads.

This app is not currently hosted on the web.

### Backend
The backend of this app is housed in the mongo-api app in GitHub.  These apps were kept seperate to reflect best practices.  This app was built in Ruby on Rails using the Mongoid gem to connect to a MongoDB database.  This simplifies the app and skips active record to work more simply with the database.

This app was built using Rails create and using scaffold for the models with made the back end set up very quick. The only additional feature that needed to be added was the Rack-Cors gem with additional code in application.rb to deal with the cross origin issue in using seperate front end and back end apps.

### Components
The app has three components within App.js:
1. Timer
2. Task list
3. Task (nested within Task List)

Timer is kept seperate from the others for ease of future development.  If down the road, the user would benefit from hiding the other components when the timer is running, this is easier to do than if Timer was nested within Task List.

This does mean that a series of call backs were needed to bring state change data up to App.js and back down through various components, which took more time particularly in error checking.

## Other notes
Known issues: <br />
1. A user can attampt to start a new task while the timer is running but the task will not start, these buttons should be disabled in react when the timer is running.  Will require another callback.
2. Timer.js has too many variables this needs to be cleaned up
3. Currently you can create cards but you cannot delete them in the current UI.
4. I've set this up so that the timer is running when you leave the page.  I did not implement this logic for the break timer with the assumption that if you left the page you probably took a break.

I have left some comments in the code for additional work I may do in the future.

## Tools used to create this app

### Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Materialize 

The [Materialze](https://materializecss.com/buttons.html) framework was used to create css for this app.<br />

Note: In this case I coppied the entire materialze css file (un-minimized) into the application for ease of use and to save time.  In a production application I'd look further into react-materialize tools.

### API calls
fetch was used in the pomodoro app for API calls

## Other resources

### Stopwatch tutorials

[https://medium.com/@peterjd42/building-timers-in-react-stopwatch-and-countdown-bc06486560a2](https://medium.com/@peterjd42/building-timers-in-react-stopwatch-and-countdown-bc06486560a2) <br />

[https://medium.com/@marjuhirsh/a-beginners-account-of-building-a-pomodoro-clock-in-react-2d03f856b28a](https://medium.com/@marjuhirsh/a-beginners-account-of-building-a-pomodoro-clock-in-react-2d03f856b28a)

### React Documentation
https://reactjs.org/docs/lifting-state-up.html


### Ingest API tutorials

https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
https://blog.hellojs.org/fetching-api-data-with-react-js-460fe8bbf8f2
https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples
https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch

### Chat-Story-App
I used [chat-story-app](https://github.com/jhiatt/chat-story-api), an app I built as inspiration for the react structure, call backs and various other things.


## Run `yarn build` to prepare for production

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information