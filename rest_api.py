import json
from http.server import BaseHTTPRequestHandler, HTTPServer
import string

class SimpleRESTAPI(BaseHTTPRequestHandler):
    
    def process_input(self, input_data):
        # Extract numbers, alphabets, and the highest lowercase alphabet
        numbers = [int(char) for char in input_data if char.isdigit()]
        alphabets = [char for char in input_data if char.isalpha()]
        lowercase_alphabets = [char for char in input_data if char.islower()]
        highest_lowercase = max(lowercase_alphabets, default="") if lowercase_alphabets else ""

        return numbers, alphabets, highest_lowercase
    
    def do_POST(self):
        # Handle POST requests
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))
        
        user_id = data.get("user_id", "")
        college_email = data.get("college_email", "")
        college_roll_number = data.get("college_roll_number", "")
        input_data = data.get("input_data", "")

        numbers, alphabets, highest_lowercase = self.process_input(input_data)

        response = {
            "status": "success",
            "user_id": user_id,
            "college_email": college_email,
            "college_roll_number": college_roll_number,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase": highest_lowercase
        }

        # Send response
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response).encode('utf-8'))
    
    def do_GET(self):
        # Handle GET requests
        if self.path == '/operation_code':
            response = {
                "operation_code": "OPERATION_123"
            }
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode('utf-8'))
        else:
            # If the endpoint is not recognized
            self.send_response(404)
            self.end_headers()

def run(server_class=HTTPServer, handler_class=SimpleRESTAPI, port=8080):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting server on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()
