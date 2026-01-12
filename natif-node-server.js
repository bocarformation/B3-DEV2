const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "application/json"});

    if(req.url === "/" && req.method === "GET"){

        res.end(JSON.stringify({message: "Bienvenue sur notre API"}));
    } 
    else if(req.url === "/about" && req.method === "GET"){
        res.end(JSON.stringify({message: "route about"}))
    } else {
        res.writeHead(404)
        res.send("Page non trouvée")
    }

})



server.listen(8000);

