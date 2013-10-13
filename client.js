var s = io.connect();
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
	s.emit('broadcast:chat:update',say);
}
s.emit('broadcast:chat:update',"new client");