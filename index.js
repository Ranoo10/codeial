const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-stratergy');
const MongoStore = require('connect-mongo'); 
const flash=require('connect-flash');
const customMware=require('./config/middleware');
  
const sassMiddleware=require('node-sass-middleware');


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix:'/css',

}))
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
//make the uploads patha available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//set up a view engine
app.set('view engine','ejs');
app.set('views','./views');



//mongo store is used to store the session cookiein the db
app.use(
    session({
    name:'codeial',
    //TODO change the secret before deployment in production mode
    secret:"blahsomething",
    saveUninitialized: false,
    resave:false,
    cookie:{
        maxAge: (1000*60*100),
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            mongoUrl: 'mongodb://localhost/codeial_development',
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));
   

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
//use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        // console.log('Error:',err);
        console.log(`Error in running server : ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});