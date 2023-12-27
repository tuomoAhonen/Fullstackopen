sequenceDiagram
	participant User
	participant Browser (Chrome) / Device
	participant Server
	participant Database

	User --> Browser: scrolls down on the HTML-document
	User --> Browser: clicks on the empty text input
	User --> Browser: types new note: "testi"
	User --> Browser: clicks save-button

	Browser --> Server: POST URL(https://studies.cs.helsinki.fi/exampleapp/new_note) + headers + data
	activate server
	Server --> Database: saves new data to database
	deactivate server

	
	Browser --> Server: new_note triggers/initiates GET URL(https://studies.cs.helsinki.fi/exampleapp/notes)
	activate server
	Server --> Browser: returns HTML-document
	deactivate server

	Browser --> Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
	activate server
	Server --> Browser: returns stylesheet main.css
	deactivate server

	Browser --> Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
	activate server
	Server --> Browser: returns script main.js
	deactivate server

	Browser --> Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
	activate server
	Server --> Browser: returns updated data.json
	deactivate server

	Browser: Executes callback-function to render notes

	