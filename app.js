"use strict";

const express = require('express');
const app = express();
const path = require('path');
const fetch = require('isomorphic-fetch');
require('es6-promise').polyfill();

app.use(express.static(path.join(__dirname, 'public')));

const url_prefix = 'https://api.twitch.tv/kraken/';

const options = {
      headers:{'Client-ID': '29wzlb5l6xa9y0bczcuwz9qyvkl491'},
    };

app.get('/profile-picture', function(req, res) {
  try {
    // Retrieves profile picture from client request query
    var url = url_prefix + 'users/' + req.query.userName + '?';
    console.log('Fetching '+ url);
    
    fetch(url, options)
      .then(function(response) {
        if (response.status != 200) {
            res.status(response.status).json({'message': 'Bad response from Dark Sky server'});
            console.log((response.status).json({'message': 'Bad response from Dark Sky server'}));
        }
        return response.json();
      })
      .then(function(payload) {
          res.status(200).json(payload);
      });
  } catch(err) {
    console.log("Errors occurs requesting Dark Sky API", err);
    res.status(500).json({'message': 'Errors occurs requesting Dark Sky API', 'details' : err});
  }
});

app.get('/user-details', function(req, res) {
  try {
    // Retrieves profile picture from client request query
    var url = url_prefix + 'channels/' + req.query.userName + '?';
    console.log('Fetching '+ url);
    
    fetch(url, options)
      .then(function(response) {
        if (response.status != 200) {
            res.status(response.status).json({'message': 'Bad response from Dark Sky server'});
            console.log((response.status).json({'message': 'Bad response from Dark Sky server'}));
        }
        return response.json();
      })
      .then(function(payload) {
          res.status(200).json(payload);
      });
  } catch(err) {
    console.log("Errors occurs requesting Dark Sky API", err);
    res.status(500).json({'message': 'Errors occurs requesting Dark Sky API', 'details' : err});
  }
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("App listening on port " + process.env.PORT);
});