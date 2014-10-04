#!/usr/bin/env node

"use strict";

var express = require('express');
var app = express();
var uuid = require('uuid');
var PUBNUB = require("pubnub");

var port = parseInt(process.argv[2], 10) || 9000;
var pubnub_config = require('./public/config/pubnub.json');
var server_id = uuid.v4();

var pubnub = PUBNUB({
    publish_key: pubnub_config.publish,
    subscribe_key: pubnub_config.subscribe
});

pubnub.subscribe({
    channel: pubnub_config.channel,
    ssl: true,
    uuid: server_id,
    message: function (data) {
        console.log(data);
    },
    connect: function() {
        console.log('connected');
    },
    presence: function (data) {
        console.log('presence', data);
    }
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

console.log(port);
app.use(express.static(__dirname + '/public'));

app.listen(port);