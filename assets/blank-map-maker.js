#!/usr/bin/env node

var fs = require('fs');

var map = [];

var tile_id = process.argv[2] || -1;

for (var x = 0; x < 100; x++) {
    map[x] = [];
    for (var y = 0; y < 100; y++) {
        map[x][y] = tile_id;
    }
}

var output = '';
for (var i = 0; i < 100; i++) {
    output += map[i].toString();
    output += "\n";
}

fs.writeFileSync('./blank.csv', output);