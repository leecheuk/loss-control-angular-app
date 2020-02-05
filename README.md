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