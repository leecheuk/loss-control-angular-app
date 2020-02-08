# Loss Control App
An angular app for users to fill in a loss control questionaire. 

## Live demo
Live demo is at [loss-control-app.netlify.com](https://loss-control-app.netlify.com/)

## User specifications
- answer questionaire
- review questionaire
- submit questionaire

## Usage
```
ng serve --o
```

## Todo
- [x] refactor question to service
- [x] add store for state management (NgRx)
- [x] refactor questionaire component

## Problems
- QuestionaireFacade has become "god" object, need to refactor with SRP in mind
- missing proper validation on text input (ie. censor some words, use autosuggestions to assist user input)
- need UX research to assist navigation experience (ie. might need to add next/back button on progress banner component)
- need notification for form input & submission feedback
- need to make folder structure flatter
- Since asking users to fill-in a questionaire is such an expensive operation, we should find a way to minimize the loss of data in the case of a disruption (ie. disconnected network) but in the same time prevent malicious actors from intercepting the data. So if we save responses to localStorage or indexedDB, we have to ensure we minimize malicious actors acting on the resource.

## Alternative implementation
An easier way to implement this would be use store (NgRx) to manage the form responses and get form questions from services. The project was not initially expected to expand much further as deadline was 3 days. 