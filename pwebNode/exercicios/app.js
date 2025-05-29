let express = require('express')

let app=express();

app.set('view engine', 'ejs')

app.get('/', function(req, res){
    res.send("<html><body>site fatec sorocaba</body></html>");
});

app.get('/historia', function(req, res){
    res.render("secao/historia");
});

app.get('/cursos', function(req, res){
    res.render("secao/cursos");
});

app.get('/professores', function(req, res){
    res.render("secao/professores");
});

app.listen(3000, function(){
    console.log("servidor com express foi carregado");
})
