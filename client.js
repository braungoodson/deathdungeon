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
	var action = input.value;
	switch (action.substring(0,action.indexOf(' '))) {
		case 'username' : 
			s.emit('create player',{
				username: action.substring(action.indexOf(' ')+1,action.length),
				color: '#'+Math.floor(Math.random()*16777215).toString(16)
			}); 
			break;

		default: 
			console.log(username,color,action.value); 
			break;
	}
}

//
s.emit('create player',{
	username: Math.random().toString(36).substring(7),
	color: '#'+Math.floor(Math.random()*16777215).toString(16)
});




