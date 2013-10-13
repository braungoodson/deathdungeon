var token = null;
var username = 'server';
var s = io.connect();
s.on('unicast:user:update',function(d){
	token = d.token;
	username = d.username;
});
s.on('broadcast:chat:update',function(d){
	console.log("broadcast:chat:update:"+d);
	var e = document.getElementById('said');
	e.innerHTML += d+"<br/>";
	e.scrollTop = e.scrollHeight;
});
function speak() {
	var input = document.getElementById('say');
	var say = input.value;
	console.log('broadcast:chat:update:say:'+say);
	s.emit('broadcast:chat:update',{token:token,username:username,say:say});
}
s.emit('broadcast:chat:update',{token:token,username:username,say:'new client'});
s.emit('unicast:user:create');