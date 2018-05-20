# cloneit
cloneit is a rudimentary remake of Reddit that allows for viewing, adding, and voting on topics. The front page of the client displays the top 20 topics with the highest votes, and paginates the proceeding topics. To access the project, head to [https://cloneit1.herokuapp.com/](https://cloneit1.herokuapp.com/), or follow the local installation instructions below. This project was part of a coding challenge for the company Carousell.
## Local installation
Run the following commands to get the project running on your local machine
1. `git clone https://github.com/stefaluc/cloneit` (clone the repo to your directory)
2. `cd cloneit && npm install` (install server dependencies)
3. `cd client && npm install` (install client dependencies)
4. `cd .. && npm run dev` (run start script to start server and client)
## Technology
cloneit utilizes a Node.js server to serve a backend API as well as store an in-memory data structure of topics for the application. The React.js front-end communicates with this API to update and receive these in-memory topics and change its UI accordingly.
## API
- `GET /api/topics`
- `POST /api/topics`
- `DELETE /api/topics`
- `GET /api/topics/:id`
- `PATCH /api/topics/:id`
## In-memory Data Structure
```javascript
let topics: [
  {
    id: 1,
    title: 'title for topic 1',
    upvotes: 1423,
    comments: ['comment1', 'comment2'],
  },
  {
    id: 2,
    title: 'title for topic 2',
    upvotes: 5212,
    comments: ['comment1', 'comment2'],
  },
  ...
];
```
## Testing
To run api tests, execute `npm test`. For client tests, change to the client directory and run `npm test`. Client tests should be expanded on as complexity of application grows.
## Code Assumptions
The front-end portion of this application was bootstrapped together with `create-react-app`. The files under `./client/public` as well as `./client/src/registerServiceWorker.js` are boilerplate from this. Every other file has been written by myself.
