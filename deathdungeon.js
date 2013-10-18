var clc = require('cli-color')
var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.cyan;
var deathdungeon = clc.red;
var say = clc.green;

console.log(deathdungeon('deathdungeon:')+'opened:'+(process.env.PORT || 24000));

var fs = require('fs');
var uuid = require('node-uuid');

var names = ["Anderson","Rebbecca","Phung","Kacey","Janina","Evan","Nicholle","Adalberto","Renata","Josefine","Louella","Kimberli","Velma","Raisa","Lavette","Noel","Elenore","Teressa","Tawna","Essie","Alessandra","Bradley","Arianna","Corliss","Zetta","Jake","Rupert","Alissa","Doretta","Afton","Tesha","Earl","Christie","Ileen","Elena","Levi","Palmer","Keshia","Walker","Rosenda","Robby","Norbert","Elaine","Clifford","Sharron","Danial","Krista","Ranee","Annalisa","Janeen","Temika","Becky","Sharice","Lucina","Hettie","Carlota","Margo","Shela","Miguelina","Kittie","Ute","Lona","Rubie","Carmina","Berta","Mariko","Douglas","Hoa","Kristen","Demetra","Toi","Willard","Carole","Tonja","Rona","Mervin","Lanny","Megan","Terri","Diann","Yessenia","Donita","Tobias","Fae","Pennie","Shirlee","Cris","Franklyn","Natisha","Lulu","Benedict","Lieselotte","Hassan","Kieth","Allyn","Jillian","Laverne","Lakeesha","Vicky","Allena","Tona","Joan","Harley","Kandice","Lucienne","Sophie","Linnea","Alishia","Bobette","Mayola","Kathern","Thi","Emilie","Toby","Bertha","Orlando","Katia","Anneliese","Palma","Agnus","Katherine","Cleopatra","Elza","Pete","Judith","Nguyet","Roberto","Janella","Curtis","Vito","Krystyna","Herma","Fairy","Shanelle","Terrence","Lyndsay","Nathanael","Augustus","Samantha","Rosana","Erline","Jere","Rina","Tarah","Charise","Nancie","Delfina","Leatha","Tamala","Sook","Roxy","Zoraida","Juanita","Davina","Krystina","Lucile","Romeo","Kendra","Angeline","Vonnie","Florene","Jay","Tawanna","Sherman","Dennis","Natalia","Jeannette","Hortensia","Kirby","Evia","Lincoln","Alexia","Khalilah","Tonie","Terra","Alberta","Starr","Dexter","Josue","Monte","Patrina","Faviola","Almeta","Man","Seema","Ardath","Kyla","Florine","Keeley","Kylee","Onita","Sharonda","Nenita","Rema","Zulma","Lucila","Ewa","Piper","Corey","Clarence"];
var species = ["vampire","wolf","hybrid","human"];
var players = [];
var playerTokens = [];

function gotoJail(player) {
	player.jailTime = 60000;
	player.bail = player.jailTime;
	player.releaseTime = new Date().getMilliseconds() + player.jailTime;
	player.prisoner = true;
}

function searchAndJail() {
	return function () {
		for (var i in players) {
			if (players[i].murders > 5) {
				gotoJail(players[i]);
				console.log('deathdungeon:prisoner:'+players[i]);
			}
		}
	}
}

function searchAndFree() {
	return function () {
		for (var i in players) {
			if (players[i].releaseTime <= new Date().getMilliseconds()) {
				players[i].prisoner = false;
				console.log('deathdungeon:civilian:'+players[i].name);
			}
		}
	}
}

setInterval(searchAndJail(),30000);
setInterval(searchAndFree(),10000);

var mario = require('mario-mario');
mario.plumbing({
	port: process.env.PORT || 24000,
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
						r.setHeader('Content-Type','application/javascript');
						return r.send(d);
					}
				});
			}
		}
	},
	socket: {
		'player leaves' : function (q) {
			if (players[q.data.token]) {
				delete players[q.data.token];
				delete playerTokens[q.data.playername];
				var _players = [];
				for (var p in players) {
					_players.push(players[p]);
				}
				q.io.broadcast('players',{players:_players});
			}
		},
		'kill player' : function(q) {
			if (players[q.data.killer.token]) {
				var player = players[q.data.killer.token];
				if (player.prisoner) {
					return q.io.emit('you are in prison');
				}
				if (playerTokens[q.data.victim.player]) {
					var victimToken = playerTokens[q.data.victim.player];
					q.io.broadcast('player killed',{
						player: q.data.victim.player,
						color: players[victimToken].color
					});
					players[victimToken].color = '#ccc';
					player.murders++;
					console.log(deathdungeon('deathdungeon:murder:'+q.data.victim.player));
					var _players = [];
					for (var p in players) {
						_players.push(players[p]);
					}
					q.io.broadcast('players',{players:_players});
				}
			}
		},
		'player:new' : function(q) {

			//
			function player(player) {
				this.token = player.token||uuid.v4(),
				this.name = player.name||names[Math.floor(Math.random()*199)];
				this.mutation = player.playername||species[Math.floor(Math.random()*3)];
				this.color = player.color||'#'+Math.floor(Math.random()*16777215).toString(16);
				this.murders = player.murders||0;
				this.prisoner = player.prisoner||false;
				this.jailTime = player.jailTime||0;
				this.bail = player.bail||0;
				this.releaseTime = player.releaseTime||0;
			}

			//
			var player = new player({});

			//
			players[player.token] = player;

			//
			playerTokens[player.name] = player.token;

			//
			var _players = [];
			for (var p in players) {
				_players.push(players[p]);
			}
			//
			return q.io.emit('player:new',{player:player})
				+ q.io.broadcast('players',{players:_players});
		},
		'someone said something' : function(q) {
			console.log(deathdungeon('deathdungeon:')+say(q.data.token+':'+q.data.playername+': '+q.data.say));
			return q.io.broadcast('someone said something',{
				playername: q.data.playername,
				say: q.data.say,
				color: players[q.data.token].color
			});
		}
	}
});
