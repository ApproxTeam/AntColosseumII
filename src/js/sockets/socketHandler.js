export function initSocket(url, onMessage, onOpen, onClose, onError)
{
    var webSocket = new WebSocket(url);
    webSocket.onmessage = onMessage;
    webSocket.onopen = onOpen;
    webSocket.onclose = onClose;
    webSocket.onerror = onError;
    return webSocket;
 }

export function doSend(socket, message)
{
	socket.send(message);
}
