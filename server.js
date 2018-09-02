var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);


  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */

    //print listingData if met requirements
    if (request.method === "GET" && parsedUrl.pathname === "/listings") {
        response.statusCode = '200';
        response.write(listingData);
        response.end();
    }

    //print error statement if failed requirements
    else {
    response.statusCode = '404';
    response.write("Bad gateway error");
    response.end();
    }
};

fs.readFile('listings.json', 'utf8', function(err, data) {
    
/*
    This callback function should save the data in the listingData variable, 
    then start the server. 
   */

    //print error statement if failed to read file.
    if(err) {
    console.log("error reading json!");
    return;
}

    //save data as listingData
    listingData = data; 

    //start server
    server = http.createServer(requestHandler);
    server.listen(port);
    console.log('server listening on: http://localhost:' + port);

});
