import 'dotenv/config'
import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis'
import * as db from './db.js';
const RedisStore = connectRedis(session);
const app = express();

const REDIS_SERVER = process.env.REDIS_SERVER;
const ATAPP_SERVER_PORT = process.env.ATAPP_SERVER_PORT;


/* TODO: ride.js
         crypto.js
         user.js
*/

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    //res.setHeader('Access-Control-Allow-Origin', 'atapp.test')

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Access-Control-Allow-Origin, Accept, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next(); 
});

app.use(
    express.urlencoded({
      extended: true
    })
);

app.use(session({
    secret: process.env.SESSION_SECRET,
    name: process.env.SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({client: db.getRedisClient()}),
    cookie: {
        secure: false
    }
}));
  
app.use(express.json());

//TODO - rewrite to use ride class
app.post('/db/createride', (req, res) => {
    console.log('[NEW REQUEST]\n' + req.body);
    db.set(req.body.number, req.body);
    res.status(200);
    res.end();
});

app.get('/db/scan', (req, res) => {
    db.scan().then((x) => {
        res.status(200).json(x);
        res.end();
    })
})

app.get('/db/getkey', (req, res) => {
    db.get(req.query.key).then((x) => {
        res.status(200).json(x);
    })
})

app.post('/db/login', (req, res) => {
    db.checkUser(req.body.username, req.body.password).then((x) => {
        if (!x) {
            res.status(400).json("{'Invalid username or password'}");
            res.end("error");
            return;
        }
        const session = req.session;
        session.username = req.body.username;
        db.createHash(req.body.password).then((z) => {
            session.password = z;
        });
        res.status(200).json("{'login successful'}");
        res.end("");
    });
})

app.get('/db/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return console.log(err);
    })
})

app.post('/db/createuser', (req, res) => {
    db.createUser(req.body.username, 
        req.body.password, 
        req.body.contact,
        req.body.email).then(() => {
            res.status(200).json();
        })
})

app.listen(ATAPP_SERVER_PORT, () => {
    console.log(`listening on port ${ATAPP_SERVER_PORT}`);
})
