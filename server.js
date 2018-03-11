const express = require('express');
const bodyParser = require('body-parser');
const mockData = require('./mock-data');

const app = express();
const port = process.env.PORT || 5000;
let topicId = 40;

app.use(bodyParser.json());

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
        topicId,
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
  // delete all topics
  .delete((req, res) => {
    mockData.topics = [];
    res.sendStatus(204);
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
    res.sendStatus(204);
  });

app.listen(port, () => console.log(`Listening on port ${port}`));
