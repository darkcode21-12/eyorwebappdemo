from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse
import os
import xml.etree.ElementTree as ET
import uuid

class SimpleHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/":
            with open("index.html", "rb") as f:
                self.send_response(200)
                self.send_header("Content-type", "text/html")
                self.end_headers()
                self.wfile.write(f.read())

    def do_POST(self):
        if self.path == "/save_student":
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = urllib.parse.parse_qs(post_data.decode())

            name = data['name'][0]
            email = data['email'][0]
            grade = data.get('grade', [''])[0]

            student_id = str(uuid.uuid4())[:8]

            # Save as XML
            student = ET.Element("student")
            ET.SubElement(student, "id").text = student_id
            ET.SubElement(student, "name").text = name
            ET.SubElement(student, "email").text = email
            ET.SubElement(student, "grade").text = grade

            tree = ET.ElementTree(student)
            with open(f"students/{student_id}.xml", "wb") as f:
                tree.write(f)

            self.send_response(200)
            self.end_headers()
            self.wfile.write(f"Student Registered! ID: {student_id}".encode())

# Create directory if not exists
if not os.path.exists("students"):
    os.makedirs("students")

# Run the server
server = HTTPServer(("127.0.0.1", 5500), SimpleHandler)
print("Server running on http://localhost:8080")
server.serve_forever()
