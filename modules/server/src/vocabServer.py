import socket
import threading
import signal
import Server

# Declare server_socket as a global variable
server_socket = None

def signal_handler(signum, frame):
    print('Signal received, shutting down server.')
    if server_socket:
        server_socket.close()

def start_server(host, port):
    global server_socket
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind((host, port))
    server_socket.listen()
    print(f"Server listening on {host}:{port}")

    while True:
        client_socket, address = server_socket.accept()
        print(f"Accepted connection from {address}")
        client_thread = threading.Thread(target=Server, args=(client_socket, address))
        client_thread.start()

if __name__ == "__main__":
    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)
    signal.signal(signal.SIGQUIT, signal_handler)
    signal.signal(signal.SIGTSTP, signal_handler)
    
    HOST = ''
    PORT = 8082
    start_server(HOST, PORT)
