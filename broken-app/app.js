const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const base_url = 'https://api.github.com/users'

app.post('/', async function (req, res, next) {
  try {
    let results = [];
    for (dev of req.body.developers) {
      let resp = await axios.get(`${base_url}/${dev}`)
      results.push({
        "name": resp.data.name, "bio": resp.data.bio
      })
    }
    return res.send(results);
  } catch (err) {
    next(err);
  }
});

app.listen(3000);
