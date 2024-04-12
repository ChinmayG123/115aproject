import socket
import threading
import signal
from Server import Server

# Global variable declaration
server_socket = None
termination = False

def signal_handler(signum, frame):
    global termination
    print("Signal received, shutting down server.")
    termination = True
    if server_socket:
        server_socket.close()

def worker(client_socket, address):
    server = Server(client_socket, True)
    server.run()
    client_socket.close()

if __name__ == "__main__":
    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)
    signal.signal(signal.SIGQUIT, signal_handler)
    signal.signal(signal.SIGTSTP, signal_handler)

    HOST = ""
    PORT = 8080

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server_socket:
        server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        server_socket.bind((HOST, PORT))
        server_socket.listen()
        print(f"Server listening on {HOST}:{PORT}")

        while not termination:
            try:
                client_socket, address = server_socket.accept()
                print(f"Accepted connection from {address}")
                client_thread = threading.Thread(target=worker, args=(client_socket, address))
                client_thread.start()
            except OSError:
                break  # Break from the loop if server_socket is closed by signal handler

    print("Server has been shut down.")
