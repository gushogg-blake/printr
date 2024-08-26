export default function(url, handlers) {
	let socket;
	
	let retryTimer;
	
	function disconnectHandler() {
		if (handlers.disconnected) {
			handlers.disconnected();
		}
		
		if (!retryTimer) {
			retryTimer = setTimeout(function() {
				retryTimer = null;
				
				createSocket();
			}, 1000);
		}
	}
	
	function messageHandler(message) {
		handlers.message(JSON.parse(message.data));
	}
	
	function connectHandler() {
		if (handlers.connected) {
			handlers.connected();
		}
	}
	
	function closeSocket() {
		socket.removeEventListener("open", connectHandler);
		socket.removeEventListener("message", messageHandler);
		socket.removeEventListener("error", disconnectHandler);
		socket.removeEventListener("close", disconnectHandler);
		socket.close();
	}
	
	function createSocket() {
		if (socket) {
			closeSocket();
		}
		
		socket = new WebSocket(url);
		
		socket.addEventListener("open", connectHandler);
		socket.addEventListener("message", messageHandler);
		socket.addEventListener("error", disconnectHandler);
		socket.addEventListener("close", disconnectHandler);
	}
	
	function heartbeat() {
		try {
			socket.send("test");
		} catch (e) {
			createSocket();
		}
	}
	
	createSocket();
	
	let heartbeatInterval = setInterval(heartbeat, 3000);
	
	return function() {
		clearInterval(heartbeatInterval);
		closeSocket();
	}
}
