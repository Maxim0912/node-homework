const http = require('http'); 
const fs= require('fs').promises;

const filenames = ["header.html", "body.html", "footer.html"];


function readFiles(files) {
    return Promise.allSettled(files.map(file=> fs.readFile(file, 'utf8')));
    // return Promise.all(files.map(file=> fs.readFile(file, 'utf8')));
}

http.createServer((request, response) => {
    const data = [];
    readFiles(filenames).then((data)=> {
        response.writeHead(200, {'Content-Type':'text/html'});
        for (let iter of data) {
            response.write(iter.value);
            console.log(iter.value)
        };
        // console.log(data);
        response.end()}).catch(err => {
            response.statusCode = 500;
            response.end();
            console.log(err);
            console.log('Could not find or open file for reading\n');
        });   
    })
    .listen(8080, ()=>{
        console.log("HTTP server works in 8080 port!\n");
    });
    