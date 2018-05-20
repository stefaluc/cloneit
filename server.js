const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mockData = require('./mock-data');

const app = express();
const port = process.env.PORT || 8080;
let topicId = 40;

// parse http request body
app.use(bodyParser.json());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.route('/api/topics')
  // GET all topics
  .get((req, res) => {
    // keep topics sorted by upvotes
    mockData.topics.sort((a, b) => b.upvotes - a.upvotes);
    // send in-memory data
    res.send({ topics: mockData.topics });
  })
  // POST a new topic
  .post((req, res) => {
    topicId += 1;
    mockData.topics = [
      ...mockData.topics,
      {
        id: topicId,
        title: req.body.title,
        upvotes: 0,
        comments: [],
      },
    ];
    // keep topics sorted by upvotes
    mockData.topics.sort((a, b) => b.upvotes - a.upvotes);
    // send updated topic list to client
    res.send({ topics: mockData.topics });
  })
  // DELETE all topics
  .delete((req, res) => {
    mockData.topics = [];
    res.json({ topics: mockData.topics });
  });

app.route('/api/topics/:id')
  // PATCH a topic with upvotes
  .patch((req, res) => {
    // modify upvotes of topic /:id specifically
    mockData.topics = mockData.topics.map((topic) => {
      if (topic.id == req.params.id) {
        topic.upvotes += req.body.upvotes;
      }
      return topic;
    });
    res.json({ topics: mockData.topics });
  });

// serve create-react-app bundle in prod
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
