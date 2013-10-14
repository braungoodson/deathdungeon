var clc = require('cli-color')
var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.cyan;
var deathdungeon = clc.red;
var say = clc.green;

console.log(deathdungeon('deathdungeon:')+' dungeon is open');

var fs = require('fs');

var players = [];

var mario = require('mario-mario');
var plumbing = require('deathdungeon-plumbing');
mario.plumbing(plumbing);