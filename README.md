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
- [ ] move data manipulation from QuestionaireFacade to service
- [ ] validation
- [ ] cross browser UI/UX consistency 
- [ ] notification system
- [ ] localStorage/indexedDB service to temporary store user form responses that comply with product/service contract terms

## Problems
- QuestionaireFacade has become "god" object, need to refactor with SRP in mind (why need Facade when there's service? Plus let angular deal with most problems with garbage collection, we just need to unsubscribe on destroy)
- missing proper validation on text input (ie. censor some words, use autosuggestions to assist user input)
- need UX research to assist navigation experience (ie. might need to add next/back button on progress banner component)
- need notification for form input & submission feedback
- need to make folder structure flatter
- Since asking users to fill-in a questionaire is such an expensive operation, we should find a way to minimize the loss of data in the case of a disruption (ie. disconnected network) but in the same time prevent malicious actors from intercepting the data. So if we save responses to localStorage or indexedDB, we have to ensure we minimize malicious actors acting on the resource.

## Pitfall
Thought deadline was in 3 days, original intent was to demonstrate a simple front-end with angular in 3 days, traded off speed with code readability and maintainability. Should interface & wireframe before implementation. Initially, didn't have modular design in mind to open for extension and for loosely coupled feature modules. (ie. make routing its own module)

## Alternative implementation
An easier way to implement this would be use store (NgRx) to manage the form responses and get form questions from services. The project was not initially expected to expand much further as deadline was 3 days. 

## Checklist
Checklist before production.
- [ ] check for OWASP top 10 web security risks
- [ ] normalize data from API & test integration with API
- [ ] sanitize form data before general API layer sanitize data
- [ ] include deployment script
- [ ] include front-end doc in runbook 
- [ ] check integration with authorization and authentication (existing or new auth module)
- [ ] expire, obfuscate & encode sensitive user information
- [ ] check if user information handling comply with sales contract of product & services (user stories/specification)
- [ ] prepare images & instructions for end user manual content 
- [ ] QA