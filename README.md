# Code Experiment React Playground

This app is the frontend that goes with the fastapi backend located [here](https://github.com/code-experiment/code_experiment_fastapi_playground). You will need that code running in order to use this app.

The goal of this app was to learn React with Typescript with a focus on testing. We started out doing it at the meetup and later it ended up being streamed on Daniel's twitch channel. The app is currently still being worked on.

## Where to start

Clone this repo, install the dependencies, and run `npm start`. Don't forget you need to have the fastapi backend running.

## Auth

I tried following an example by Kent C Dodds with using an authenticated app and unauthenticated app. You can read about it at his blog post [here](https://kentcdodds.com/blog/authentication-in-react-applications)

This has been great but I'm still running into some testing issues because of context.

## Testing

You can run the tests with `yarn test` or `npm test`.

## GitHub Workflow Actions

This app is setup with a GitHub Workflow Action that will run all of these tests on merge requests. I also have the repo setup to not allow pushes to master.
