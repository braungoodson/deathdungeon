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
	e.innerHTML += "Welcome <span style='color:"+d.color+"'>"+d.username+"</span>.<br/>";
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




