const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//making new express application
var app = express();

hbs.registerPartials(__dirname + '/views/partials'); //for including partials, reusable code

app.set('view engine', 'hbs'); //using hbs

//it's how middleware is registered, it takes a function
app.use((req, res, next)=>
{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>
  {
    if(err)
    {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

//middleware, third party add on 
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>
{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text)=>
{
  return text.toUpperCase();
})

//setting http handlers
//get has two args, 1st the url and 2nd the function
app.get('/', (req, res)=>
{
  //res.send('<h1>Hello Express</h1>');
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my Wesbite'
  });
});

app.get('/about',(req, res)=>
{
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

//bad 
app.get('/bad', (req, res) =>
{
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

//second arg is optional
app.listen(3000, ()=>
{
  console.log('Server is up on port 3000');
}); //start listening on port

