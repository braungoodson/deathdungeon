

/*

var token = null;
var playername = null;
var color = null;
var s = io.connect();

//
s.on('here are your credentials',function(d){
	token = d.token;
	playername = d.playername;
	color = d.color;
});

//
s.on('someone said something',function(d){
	console.log("someone said something"+d.playername+': '+d.say);
	var e = document.getElementById('said');
	e.innerHTML += "<span style='color:"+d.color+"'>"+d.playername+'</span>: '+d.say+"<br/>";
	e.scrollTop = e.scrollHeight;
});

//
s.on('here is a new player',function(d){
	console.log('here is a new player');
	var e = document.getElementById('said');
	e.innerHTML += "> Welcome <span style='color:"+d.color+"'>"+d.playername+"</span>.<br/>";
	e.scrollTop = e.scrollHeight;
});

//
s.on('player killed',function(d){
	var e = document.getElementById('said');
	e.innerHTML += "> Player <span style='color:"+d.color+";'>"+d.player+"</span> has been murdered.<br/>";
	e.scrollTop = e.scrollHeight;
});

//
s.on('players',function(d){
	var e = document.getElementById('players');
	e.innerHTML = "";
	for (var p in d.players) {
		e.innerHTML += "<span style='color:"+d.players[p].color+";'>"+d.players[p].playername+"</span><br/>";
	}
});

//
s.on('player already exists',function(d){
	var e = document.getElementById('said');
	e.innerHTML += "> Player already exists.<br/>";
	e.scrollTop = e.scrollHeight;
});

//
function speak() {
	var input = document.getElementById('say');
	var say = input.value;
	console.log('someone said something'+say);
	s.emit('someone said something',{
		token: token,
		playername: playername,
		say: say,
		color: color
	});
}

function happen() {
	var input = document.getElementById('say');
	var action = input.value.substring(0,input.value.indexOf(' '));
	switch (action) {
		case 'kill' : 
			var victim = input.value.substring(input.value.indexOf(' ')+1,input.value.length);
			s.emit('kill player',{
				killer: {
					player: playername,
					token: token,
					color: color
				},
				victim: {
					player: victim
				}
			});
			break;
		//
		case 'playername' : 
			s.emit('create player',{
				playername: playername,
				player: input.value.substring(input.value.indexOf(' ')+1,input.value.length),
				token: token,
				color: '#'+Math.floor(Math.random()*16777215).toString(16),
				renew: true
			}); 
			break;
		//
		default: 
			console.log(playername,color,action.value); 
			break;
	}
}

//
s.emit('create player',{
	playername: playername,
	color: '#'+Math.floor(Math.random()*16777215).toString(16)
});

window.onunload = function () {
	s.emit('player leaves',{playername:playername,token:token});
}



*/

function chat(player,body) {
	this.player = player;
	this._body = body;
}

function player(name,type,color) {
	this.name = name;
	this.type = type;
	this.color = color;
}

var deathdungeon = angular.module('deathdungeon',[]);
var d = deathdungeon;
d.config(function($routeProvider){
	$routeProvider
		.when('/deathdungeon',{
			controller: 'deathdungeon',
			templateUrl: 'deathdungeon.html'
		})
		.otherwise({redirectTo:'/deathdungeon'});
});
d.controller('deathdungeon',function($scope){
	$scope.players = [new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),new player('name','type','#88FF88'),];
	$scope.chats = [
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),

new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),

new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),

new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),

new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),

new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),

new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),

new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),

new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
new chat($scope.players[0],'I am alive!'),
];
});















