var token = null;
var username = null;
var color = null;
var s = io.connect();

//
s.on('here are your credentials',function(d){
	token = d.token;
	username = d.username;
	color = d.color;
});

//
s.on('someone said something',function(d){
	console.log("someone said something"+d.username+': '+d.say);
	var e = document.getElementById('said');
	e.innerHTML += "<span style='color:"+d.color+"'>"+d.username+'</span>: '+d.say+"<br/>";
	e.scrollTop = e.scrollHeight;
});

//
s.on('here is a new player',function(d){
	console.log('here is a new player');
	var e = document.getElementById('said');
	e.innerHTML += "> Welcome <span style='color:"+d.color+"'>"+d.username+"</span>.<br/>";
	e.scrollTop = e.scrollHeight;
});

//
s.on('player killed',function(d){
	var e = document.getElementById('said');
	e.innerHTML += "Player <span style='color:"+d.color+";'>"+d.player+"</span> has been murdered.<br/>";
	e.scrollTop = e.scrollHeight;
});

//
function speak() {
	var input = document.getElementById('say');
	var say = input.value;
	console.log('someone said something'+say);
	s.emit('someone said something',{
		token: token,
		username: username,
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
					player: username,
					token: token,
					color: color
				},
				victim: {
					player: victim
				}
			});
			break;
		//
		case 'username' : 
			s.emit('create player',{
				player: input.value.substring(input.value.indexOf(' ')+1,input.value.length),
				token: token,
				color: '#'+Math.floor(Math.random()*16777215).toString(16)
			}); 
			break;
		//
		default: 
			console.log(username,color,action.value); 
			break;
	}
}

//
s.emit('create player',{
	color: '#'+Math.floor(Math.random()*16777215).toString(16)
});

//
var canvas = document.getElementById('dungeon-map');
canvas.height = 400;
canvas.width = 600;
var context = canvas.getContext('2d');

var png = new Image();
png.src = 'dungeon-map-001.png';
png.onload = function () {
	context.drawImage(png,-300,-300);
}

//
var players = [
	new player('braun','player-icon-white.png')
];
var numPngsDownloaded = 0;

//
function player(pname,png) {
	this.x = 0;
	this.y = 0;
	this.pname = pname;
	this.png = new Image();
	this.png.src = png;
	this.png.onload = function () {
		numPngsDownloaded++;
	}
}
player.prototype.draw = function () {
	context.beginPath();
	context.lineWidth = this.lineWidth;
	context.strokeStyle = this.stroke;
	context.fillStyle = this.color;
	context.arc(this.x,this.y,this.r,0,2*Math.PI);
	context.closePath();
	context.stroke();
}

function drawPlayers() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(png,-350,-300);
	for (var player in players) {
		var p = players[player];
		context.drawImage(p.png,p.x,p.y);
	}
}

var t = setTimeout(function(){
	if (numPngsDownloaded == players.length) {
		return drawPlayers() + clearTimeout(t);
	}
},10);