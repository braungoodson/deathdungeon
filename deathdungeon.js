var clc = require('cli-color')
var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;

console.log(error('Error!'));
console.log(warn('Warning'));
console.log(notice('Notice'));

var fs = require('fs');

var mario = require('mario-mario');
mario.plumbing({
	port: 24000,
	http: {
		get: {
			'/' : function (q,r) {
				return fs.readFile('./client.html',function(e,d){
					if (e) {
						console.log("deathdungeon:"+error('error reading ./client.html'));
						r.setHeader('Content-Type','application/json');
						return r.send({error:'error reading ./client.html'});
					} else {
						console.log("deathdungeon:"+warn('/'));
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
						console.log(error('deathdungeon: error reading ./client.js'));
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
		'broadcast:chat:update' : function(q) {
			console.log(notice(q.data));
			return q.io.broadcast('broadcast:chat:update',q.data);
		}
	}
});