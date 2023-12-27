sequenceDiagram
	participant User
	participant Browser / Device
	participant Server
	participant Database

	User --> Browser: scrolls down on the HTML-document
	User --> Browser: clicks on the empty text input
	User --> Browser: types new note: "testi"
	User --> Browser: clicks save-button

	Browser --> Server: request callback POST URL(https://studies.cs.helsinki.fi/exampleapp/new_note_spa) + headers + data
	activate server
	Server --> Browser: returns message "note created" with ok status
	deactivate server

	Browser --> Server: request callback POST URL(https://translate.googleapis.com/translate_a/t?anno=3&client=te_lib&format=html&v=1.0&key=AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw&logld=vTE_20231220&sl=es&tl=en&tc=0&tk=522854.49901)
	activate server
	Server --> Browser: returns list with "testi" in it
	deactivate server

	Browser: request callback concats old list with new list ?