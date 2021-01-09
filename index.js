var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3001;
var cors = require('cors');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
});

app.use(cors());

app.get('/', (req, res) => {
    res.send(listmensagem);
});

const listmensagem = [{
    nome: '',
    mensagem: ''
}]

io.on('connection', function (socket) {
    console.log('Cliente conectado ' + socket.id);
    socket.on('mensagem1', function (msg) {
        console.log('Cliente conectado ' + socket.id);
        io.emit('mensagem2', msg);
        listmensagem.push(msg);
        console.log(listmensagem);

    });
});

http.listen(port, function () {
    console.log('Servidor conectado na porta:' + port);
});