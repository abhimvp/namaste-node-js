//http server
// import http module
const http = require("node:http");
//
const port = 999;
// create server using the createServer function of http module - gives you back instance of server (server object)
const server = http.createServer(
  // to handle logic for incoming requests - we pass a callback function to createServer method
  function (req, res) {
    if (req.url === "/getSecretData") {
      res.end("You are a human and the the secret so chill");
      // use response(res).end method to send response back to client
      return;
      //   Because you can only end a response once. Without return, the code continues after the if and calls res.end("server Created") too, which triggers “write after end.” The return stops execution after sending the secret response.
    }
    res.end("server Created");
  },
);
// to let server listen to requests - we use listen method of server object and listen on a particular port
server.listen(port, () => {
  // now server is ready to accept requests on port 999
  console.log("Server running on port " + port);
});

// Go to browser and hit http://localhost:999/getSecretData to see the response from server
// hit http://localhost:999/ to see the response : server Created
