var clc = require('cli-color')
var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.cyan;
var deathdungeon = clc.red;
var say = clc.green;

console.log(deathdungeon('deathdungeon:')+' dungeon is open');

var fs = require('fs');

var clients = [];

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
			}
		}
	},
	socket: {
		'unicast:user:create' : function(q) {
			var token = Math.random().toString(36).substring(7);
			var username = Math.random().toString(36).substring(7);
			clients.push({token:token,username:username});
			console.log(deathdungeon('deathdungeon:')+'welcome:'+notice(token+':'+username));
			return q.io.emit('unicast:user:update',{token:token,username:username})
				+ q.io.broadcast('broadcast:chat:update',{username:'server',say:'Welcome '+username+'.'});
		},
		'broadcast:chat:update' : function(q) {
			console.log(deathdungeon('deathdungeon:')+say(q.data.token+':'+q.data.username+': '+q.data.say));
			return q.io.broadcast('broadcast:chat:update',{username:q.data.username,say:q.data.say});
		}
	}
});