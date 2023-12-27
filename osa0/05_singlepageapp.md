sequenceDiagram
	participant User
	participant Browser / Device
	participant Server

	User --> Browser: types url to search bar
	Browser --> Server: GET URL(https://studies.cs.helsinki.fi/exampleapp/spa)
	activate server
	Server --> Browser: returns HTML-document
	deactivate server

	Browser --> Server: GET URL(https://studies.cs.helsinki.fi/exampleapp/main.css)
	activate server
	Server --> Browser: returns main.css
	deactivate server

	Browser --> Server: GET URL(https://studies.cs.helsinki.fi/exampleapp/spa.js)
	activate server
	Server --> Browser: returns spa.js
	deactivate server

	Browser --> Server: GET URL(https://studies.cs.helsinki.fi/exampleapp/data.json)
	activate server
	Server --> Browser: returns data.json
	deactivate server

	Browser --> Server: request callback onLoadCSS GET URL(https://www.gstatic.com/_/translate_http/_/ss/k=translate_http.tr.qhDXWpKopYk.L.W.O/am=wA/d=0/rs=AN8SPfq5gedF4FIOWZgYyMCNZA5tU966ig/m=el_main_css)
	activate server
	Server --> Browser: returns translated CSS
	deactivate server

	Browser --> Server: request callback onLoadJavaScript GET URL(https://translate.googleapis.com/_/translate_http/_/js/k=translate_http.tr.fi.VO17A9yyE-4.O/d=1/exm=el_conf/ed=1/rs=AN8SPfo13MCimO_PFUVaT2J3sRQvfn2Jbw/m=el_main)
	activate server
	Server --> Browser: returns translated JavaScript
	deactivate server

	Browser --> Server: request callback GET URL(https://translate.google.com/gen204?nca=te_li&client=te_lib&logld=vTE_20231220)
	activate server
	Server --> Browser: blocked by client "cross-policy-origin"
	deactivate server

	Browser --> Server: request callback Image GET URL(https://fonts.gstatic.com/s/i/productlogos/translate/v14/24px.svg)
	activate server
	Server --> Browser: returns image 24px.svg
	deactivate server

	Browser --> Server request callback POST URL(https://translate.googleapis.com/translate_a/t?anno=3&client=te_lib&format=html&v=1.0&key=AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw&logld=vTE_20231220&sl=es&tl=en&tc=0&tk=545041.1010074) + headers + data
	activate server
	Server --> Browser: returns notes list
	deactivate server

	Browser --> Server: request callback GET URL(https://translate.google.com/gen204?sl=es&tl=en&textlen=24&ttt=175&ttl=124&ttf=77&sr=1&nca=te_time&client=te_lib&logld=vTE_20231220)
	activate server
	Server --> Browser: blocked by client "cross-policy-origin"
	deactivate server

	Browser: renders spa notes
	