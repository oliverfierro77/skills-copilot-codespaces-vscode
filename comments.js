// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Store all comments
const commentsByPostId = {};

// Route to get all comments related to a post
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Route to create a comment related to a post
app.post('/posts/:id/comments', async (req, res) => {
  const commentId = require('crypto')
    .randomBytes(4)
    .toString('hex');

  const { content } = req.body;

  // Get the comments related to the post
  const comments = commentsByPostId[req.params.id] || [];

  // Push the new comment
  comments.push({ id: commentId, content, status: 'pending' });

  // Store the comments related to the post
  commentsByPostId[req.params.id] = comments;

  // Emit the event
  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: 'pending',
    },
  });

  res.status(201).send(comments);
});

// Route to receive events
app.post('/events', async (req, res) => {
  console.log('Event received:', req.body.type);

  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    // Get the comments related to the post
    const comments = commentsByPostId[data.postId];

    // Find the comment with the corresponding id
    const comment = comments.find((comment) => {
      return comment.id === data.id;
    });

    // Update the status
    comment.status = data.status;

    // Emit the event
    await axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data: {
        id: data.id,
        postId: data.postId,
        status: data.status,
        content: data.content,
      },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});