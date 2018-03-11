const express = require('express');
const mockData = require('./mock-data');

const app = express();
const port = process.env.PORT || 5000;
let topicId = 40;

app.route('/api/topics')
  // get all topics
  .get((req, res) => {
    res.send({ topics: mockData.topics });
  })
  // add a new topic
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
    res.send({ topics: mockData.topics });
  })
  // delete all topics
  .delete((req, res) => {
    mockData.topics = [];
    res.sendStatus(204);
  });

app.listen(port, () => console.log(`Listening on port ${port}`));
