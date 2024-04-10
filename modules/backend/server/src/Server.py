import socket


class Server:
    def __init__(self, client_socket, debug_mode=False):
        self.socket = client_socket
        self.Request = {
            "Method": None,
            "URI": None,
            "Version": None,
            "Headers": {},
            "Body": None,
        }
        self.Response = {
            "StatusCode": None,
            "StatusLine": None,
            "Version": "HTTP/1.1",
            "Headers": {},
            "Body": None,
        }
        self.debugMode = debug_mode

    def parse_request(self, data):
        lines = data.split("\r\n")
        request_line = lines[0].split(" ")
        self.Request["Method"], self.Request["URI"], self.Request["Version"] = (
            request_line
        )

        headers = lines[1:-2]  # Skip the request line and the last line (body)
        for header in headers:
            key, value = header.split(": ")
            self.Request["Headers"][key] = value

        self.Request["Body"] = lines[-1]

        if self.debugMode:
            print("Request:\n", self.Request)

    def compose_response(self):
        self.Response["StatusCode"] = "200"
        self.Response["StatusLine"] = "OK"
        self.Response["Headers"]["Content-Type"] = "text/plain"
        self.Response["Body"] = "Hello, World!"

        response = (
            f"{self.Response['Version']} {self.Response['StatusCode']} {self.Response['StatusLine']}\r\n"
            + "".join(
                [
                    f"{key}: {value}\r\n"
                    for key, value in self.Response["Headers"].items()
                ]
            )
            + "\r\n"
            + self.Response["Body"]
        )

        if self.debugMode:
            print("Response:", response)

        return response

    def recv_request(self):
        request_data = b""
        while True:
            chunk = self.socket.recv(1024)
            request_data += chunk
            if len(chunk) < 1024:
                break  # Assume end of message if less than 1024 bytes received

        self.parse_request(request_data.decode("utf-8"))

    def send_response(self):
        response = self.compose_response()
        self.socket.sendall(response.encode("utf-8"))

    def log_request(self):
        # This method can be expanded as needed
        pass

    def run(self):
        state = "RECV"

        while True:
            if state == "RECV":
                self.request_data = self.recv_request()
                state = "PROCESS"

            elif state == "PROCESS":
                # Process the request here
                self.process_request()
                state = "SEND"

            elif state == "SEND":
                response = self.compose_response()
                self.client_socket.sendall(response.encode("utf-8"))
                state = "CLOSE"

            elif state == "CLOSE":
                self.client_socket.close()
                break
            else: # invalid state
                break


# Test main function
if __name__ == "__main__":

    test_request = """\
GET /user-account HTTP/1.1\r\n\
Host: www.vocabventure.com\r\n\
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)\r\n\
Content-Length: 27\r\n\
Content-Type: application/x-www-form-urlencoded\r\n\
Connection: keep-alive\r\n\
\r\n\
name=John&age=30&city=New+York\
"""

    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server = Server(server_socket, debug_mode=True)
    server.parse_request(test_request)
