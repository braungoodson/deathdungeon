function Player(player) {
	this.token = player.token;
	this.name = player.name;
	this.color = player.color;
	this.murders = player.murders;
	this.prisoner = player.prisoner;
	this.jailTime = player.jailTime;
	this.bail = player.bail;
	this.releaseTime = player.releaseTime;
}

Player.prototype.save = function () {
	if (window.localStorage) {
		window.localStorage.setItem('player:'+this.name,this);
	} else {
		//
	}
}

var player = new Player(window.localStorage.getItem('deathDungeonPlayer'));
var players = [];
//var p = null;
var s = io.connect();

//
s.on('player:new',function(r){
	player = new Player(r.player);
	player.save(player);
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
s.on('players',function(r){
	var players = r.players;
	var e = document.getElementById('players');
	e.innerHTML = "";
	for (var p in players) {
		e.innerHTML += "<span style='color:"+players[p].color+";'>"+players[p].name+" ("+players[p].mutation+")</span><br/>";
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
			player.name = input.value.substring(input.value.indexOf(' ')+1,input.value.length);
			player.color = '#'+Math.floor(Math.random()*16777215).toString(16);
			player.renew = true;
			s.emit('player',player); 
			break;
		//
		default: 
			console.log(playername,color,action.value); 
			break;
	}
}

//
console.log('player:new:'+JSON.stringify(player));
s.emit('player:new',player);

/*//
window.onunload = function () {
	s.emit('player:leaves',player);
}*/