var clc = require('cli-color')
var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.cyan;
var deathdungeon = clc.red;
var say = clc.green;

console.log(deathdungeon('deathdungeon:')+' dungeon is open');

var fs = require('fs');
var uuid = require('node-uuid');

var players = [];
var playerTokens = [];

var mario = require('mario-mario');
mario.plumbing({
	port: 24000,
	http: {
		get: {
			'/' : function (q,r) {
				return fs.readFile('./client.html',function(e,d){
					if (e) {
						console.log(deathdungeon('deathdungeon:')+error('error reading ./client.html'));
						r.setHeader('Content-Type','application/json');
						return r.send({error:'error reading ./client.html'});
					} else {
						console.log(deathdungeon('deathdungeon:')+warn('/client.html'));
						r.setHeader('Content-Type','text/html');
						return r.send(d);
					}
				});
			},
			'/client.js' : function(q,r) {
				return fs.readFile('./client.js',function(e,d){
					if (e) {
						console.log(deathdungeon('deathdungeon:')+error('error reading ./client.js'));
						r.setHeader('Content-Type','application/json');
						return r.send({error:'error reading ./client.js'});
					} else {
						console.log(deathdungeon('deathdungeon:')+warn('/client.js'));
						r.setHeader('Content-Type','text/js');
						return r.send(d);
					}
				});
			},
			'/dungeon-map-001.png' : function(q,r) {
				return fs.readFile('./dungeon-map-001.png',function(e,d){
					if (e) {
						console.log(deathdungeon('deathdungeon:')+error('error reading ./dungeon-map-001.png'));
						r.setHeader('Content-Type','application/json');
						return r.send({error:'error reading ./dungeon-map-001.png'});
					} else {
						console.log(deathdungeon('deathdungeon:')+warn('/dungeon-map-001.png'));
						r.setHeader('Content-Type','image/png');
						return r.send(d);
					}
				});
			},
			'/player-icon-white.png' : function(q,r) {
				return fs.readFile('./player-icon-white.png',function(e,d){
					if (e) {
						console.log(deathdungeon('deathdungeon:')+error('error reading ./player-icon-white.png'));
						r.setHeader('Content-Type','application/json');
						return r.send({error:'error reading ./player-icon-white.png'});
					} else {
						console.log(deathdungeon('deathdungeon:')+warn('/player-icon-white.png'));
						r.setHeader('Content-Type','image/png');
						return r.send(d);
					}
				});
			}
		}
	},
	socket: {
		'kill player' : function(q) {
			if (players[q.data.killer.token]) {
				if (playerTokens[q.data.victim.player]) {
					var victimToken = playerTokens[q.data.victim.player];
					q.io.broadcast('player killed',{
						player: q.data.victim.player,
						color: players[victimToken].color
					});
					players[victimToken].color = '#ccc';
					console.log(deathdungeon('deathdungeon:muder:'+q.data.victim.player));
				}
			}
		},
		'create player' : function(q) {
			var token = null;
			if (!q.data.token) {
				token = uuid.v4();
			} else {
				token = q.data.token;
			}
			var player = null;
			if (!q.data.player) {
				player = uuid.v1();
			} else {
				player = q.data.player;
			}
			players[token] = {
				username: player,
				color: q.data.color
			};
			playerTokens[player] = token;
			console.log(deathdungeon('deathdungeon:')+'welcome:'+notice(token+':'+player));
			return q.io.emit('here are your credentials',{
				token: token,
				username: player,
				color: q.data.color
			}) + q.io.broadcast('here is a new player',{
				username: player,
				color: q.data.color
			});
		},
		'someone said something' : function(q) {
			console.log(deathdungeon('deathdungeon:')+say(q.data.token+':'+q.data.username+': '+q.data.say));
			return q.io.broadcast('someone said something',{
				username: q.data.username,
				say: q.data.say,
				color: players[q.data.token].color
			});
		}
	}
});