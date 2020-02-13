# React And FireStore

## To Do

- add error handling, via try/catch, to all firebase access
  - one case is when user login fails

## Commands

- `firebase login` - login to firebase
- `firebase init` - select hosting and function not firestore
- `firebase deploy --only functions` - don't deploy client app only functions

## History

The code in this repository is based on the following.

- [React, Redux & Firebase App Tutorial](https://www.youtube.com/watch?v=h9enkZBFCyA&list=PL4cUxeGkcC9iWstfXntcj8f-dFZ4UtlN3&index=2)
- [How to use Firebase Firestore with ReactJS. Firebase CRUD tutorial](https://www.youtube.com/watch?v=yyo_TcZCrS4&feature=youtu.be)
- [Firebase React Authentication Tutorial For Beginners - Private Route With Hooks](https://www.youtube.com/watch?v=unr4s3jd9qA)

## Auth FSM

| Header | Definition        | Enumeration                       |
| ------ | ----------------- | --------------------------------- |
| P      | Present State     |
| N      | Next State        |
| Auth   | Auth Complete     |
| U      | User              |
| M      | Menu Display      | I = Login Links, O = Logout Links |
| D      | Dashboard Display |
| R      | Redirect          |

| P   | N   | U    | Auth  | M   | D     | R     | Action |
| --- | --- | ---- | ----- | --- | ----- | ----- | ------ |
| S1  | S2  | null | false | I   | false | true  | login  |
| S2  | S3  | user | true  | O   | true  | false | logout |
| S3  | S4  | null | false | O   | true  | false | -      |
| S4  | S?  | null | true  | O   | true  | false | -      |
