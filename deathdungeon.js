var clc = require('cli-color')
var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.cyan;
var deathdungeon = clc.black.bgWhite;
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
						console.log(deathdungeon('deathdungeon:')+warn('/'));
						r.setHeader('Content-Type','text/html');
						return r.send(d);
					}
				});
			},
			'/echo' : function (q,r) {
				return r.send({
					echo : 'GET /echo'
				});
			},
			'/client.js' : function(q,r) {
				return fs.readFile('./client.js',function(e,d){
					if (e) {
						console.log(deathdungeon('deathdungeon:')+error('error reading ./client.js'));
						r.setHeader('Content-Type','application/json');
						return r.send({error:'error reading ./client.js'});
					} else {
						r.setHeader('Content-Type','text/js');
						return r.send(d);
					}
				});
			}
			},
			post: {
				'/echo' : function (q,r) {
					return r.send({
					echo : 'POST /echo'
				});
			}
		}
	},
	socket: {
		'unicast:echo' : function (q) {
			return q.io.emit('unicast:echo','unicast:echo');
		},
		'broadcast:echo' : function (q) {
			return q.io.broadcast('broadcast:echo','broadcast:echo');
		},
		'unicast:user:create' : function(q) {
			var token = Math.random().toString(36).substring(7);
			var username = Math.random().toString(36).substring(7);
			clients.push({token:token,username:username});
			console.log(deathdungeon('deathdungeon:')+notice(token+':'+username));
			return q.io.emit('unicast:user:update',{token:token,username:username});
		},
		'broadcast:chat:update' : function(q) {
			console.log(deathdungeon('deathdungeon:')+say(q.data.token+':'+q.data.username+': '+q.data.say));
			return q.io.broadcast('broadcast:chat:update',q.data.username+': '+q.data.say);
		}
	}
});