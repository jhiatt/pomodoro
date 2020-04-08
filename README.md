## Getting Started
In the rails console, create a user and copy the user id into the relevant api calls

## Steps taken to create this app
1. Created sample card to hold tasks
2. Created a card/form to add new tasks
3. 

## Other notes
Known issues: <br />
1. A user can attampt to start a new task while the timer is running but the task will not start
2. Timer.js has too many variables this needs to be cleaned up

## Tools used to create this app

### Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Materialize 

The [Materialze](https://materializecss.com/buttons.html) framework was used to create css for this app.<br />

Note: In this case I coppied the entire materialze css file (un-minimized) into the application for ease of use and to save time.  In a production application I'd look further into react-materialize tools.

## Other resources

### Stopwatch tutorials

[https://medium.com/@peterjd42/building-timers-in-react-stopwatch-and-countdown-bc06486560a2](https://medium.com/@peterjd42/building-timers-in-react-stopwatch-and-countdown-bc06486560a2) <br />

[https://medium.com/@marjuhirsh/a-beginners-account-of-building-a-pomodoro-clock-in-react-2d03f856b28a](https://medium.com/@marjuhirsh/a-beginners-account-of-building-a-pomodoro-clock-in-react-2d03f856b28a)

### React Documentation
https://reactjs.org/docs/lifting-state-up.html

## Launch App locally

Run 'npm start' from terminal. <br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Ingest API tutorials

https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
https://blog.hellojs.org/fetching-api-data-with-react-js-460fe8bbf8f2
https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples
https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch



## Run `yarn build` to prepare for production

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information