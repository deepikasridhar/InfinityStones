const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const db = require('../utils/database')
const bodyParser = require('body-parser');
const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
});
router.use(expressSession);
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}));

const passport = require('passport');

router.use(passport.initialize());
router.use(passport.session());
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

//mongoose.connect('mongodb://localhost/MyDatabase',
//  { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;
const UserDetail = new Schema({
    name: String,
    password: String
});

UserDetail.plugin(passportLocalMongoose);
const UserDetails = mongoose.model('user', UserDetail, 'users');
passport.use(UserDetails.createStrategy());

passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());
const connectEnsureLogin = require('connect-ensure-login');
const { check, validationResult } = require('express-validator');

router.post('/register',[check('username').isLength({min:3}),
        check('password').isLength({min:4})],
    async (req, res,next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {

            return res.status(422).json({ errors: errors.array() })

        }

        // perform creating new user
        // redirect to confirmation page upon success
        var data = req.body
        console.log(data)
        if(['about', 'access', 'account', 'accounts', 'add', 'address', 'adm', 'admin', 'administration' ,'adult',
            'advertising', 'affiliate', 'affiliates', 'ajax', 'analytics', 'android', 'anon', 'anonymous',
            'api', 'app', 'apps', 'archive', 'atom', 'auth', 'authentication', 'avatar','backup', 'banner', 'banners', 'bin', 'billing', 'blog','blogs', 'board', 'bot',
            'bots', 'business','chat', 'cache', 'cadastro', 'calendar', 'campaign', 'careers', 'cgi', 'client', 'cliente', 'code', 'comercial',
            'compare','config', 'connect', 'contact', 'contest', 'create', 'code', 'compras', 'css','dashboard', 'data', 'db', 'design', 'delete', 'demo', 'design', 'designer', 'dev', 'devel', 'dir',
            'directory', 'doc', 'docs', 'domain', 'download', 'downloads','edit', 'editor','email', 'ecommerce','forum', 'forums', 'faq', 'favorite', 'feed', 'feedback', 'flog', 'follow', 'file', 'files', 'free', 'ftp',
            'gadget', 'gadgets', 'games', 'guest','group','groups',
            'help', 'home', 'homepage', 'host', 'hosting', 'hostname', 'html', 'http', 'httpd', 'https', 'hpg' ,
            'info', 'information', 'image', 'img', 'images', 'imap', 'index', 'invite' ,'intranet', 'indice' ,
            'ipad', 'iphone', 'irc' ,
            'java', 'javascript', 'job', 'jobs', 'js','knowledgebase',
            'log', 'login','logs', 'logout', 'list', 'lists' ,
            'mail', 'mail1', 'mail2', 'mail3', 'mail4', 'mail5', 'mailer', 'mailing', 'mx', 'manager', 'marketing' ,
            'master', 'me', 'media', 'message', 'microblog' ,'microblogs', 'mine', 'mp3', 'msg', 'msn', 'mysql',
            'messenger', 'mob', 'mobile', 'movie', 'movies', 'music', 'musicas', 'my',
            'name', 'named', 'net', 'network', 'new', 'news', 'newsletter', 'nick', 'nickname','notes', 'noticias',
            'ns', 'ns1', 'ns2', 'ns3', 'ns4',
            'old', 'online', 'operator', 'order', 'orders' ,
            'page', 'pager', 'pages', 'panel', 'password', 'perl', 'pic', 'pics', 'photo', 'photos', 'photoalbum',
            'php', 'plugin', 'plugins', 'pop', 'pop3', 'post', 'postmaster',
            'postfix', 'posts', 'profile', 'project', 'projects', 'promo', 'pub', 'public', 'python','random', 'register', 'registration', 'root', 'ruby', 'rss',
            'sale', 'sales', 'sample','samples', 'script', 'scripts', 'secure', 'send', 'service', 'shop',
            'sql', 'signup', 'signin', 'search', 'security', 'settings', 'setting', 'setup', 'site' ,
            'sites', 'sitemap', 'smtp', 'soporte', 'ssh', 'stage', 'staging', 'start', 'subscribe' ,
            'subdomain', 'suporte', 'support', 'stat', 'static', 'stats', 'status', 'store', 'stores', 'system',
            'tablet', 'tablets', 'tech', 'telnet', 'test', 'test1', 'test2', 'test3', 'teste', 'tests', 'theme',
            'themes', 'tmp', 'todo', 'task', 'tasks', 'tools', 'tv', 'talk' ,
            'update', 'upload', 'url', 'user', 'username','usuario', 'usage',
            'vendas', 'video', 'videos', 'visitor',
            'win', 'ww', 'www', 'www1', 'www2', 'www3', 'www4', 'www5', 'www6', 'www7', 'wwww', 'wws', 'wwws', 'web', 'webmail',
            'website', 'websites', 'webmaster', 'workshop',
            'xxx', 'xpg' ,
            'you', 'yourname', 'your','username', 'yoursite', 'yourdomain'].includes(data.username)) {
            res.redirect('/?msg=Error: Cannot choose this reserve word. Choose another username')
            //return  res.status(422).json({ errors: "cannot choose this reserve word as username. choose another name" })
        }
            console.log("before username find")
        User.findOne({ username: data.username }).then((user) => {

            if (user != null) {
                console.log("Username  already taken")
                res.redirect('/?msg=Error: username  already taken')
            }
        })
        console.log("before username write")
        UserDetails.register({username:data.username},data.password)

        passport.authenticate('local',
            (err, user, info) => {
                if (err) {
                    return next(err);
                }




                return res.redirect('/home');


            })(req, res, next);


    })


router.post('/login', (req, res, next) => {
    passport.authenticate('local',
        (err, user, info) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.redirect('/login?info=' + info);
            }

            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }

                return res.redirect('/home');
            });

        })(req, res, next);
});







//we need to choose the correct response code
//for creating sth, 201 is better than 200


//ask for login verification
/*router.post('/login', async (req, res) => {
    //perform credential checks
    console.log(req.body)
    var data = req.body
    User.findOne({ name: data.username }).then((user) => {

        if (user.password == data.password) {
            console.log("User has been verified")
            res.redirect('/home')
            //res.redirect('/chat')
        } else {
          console.log('Incorrect password')
          res.redirect('/?msg=Error: incorrect password')
        }
    })
}) */



// router.post('/users/logout', auth, async (req, res)=>{
//     //what should auth do when user logs out?
//     //you need to delete the token or make it expired
//     //but during auth, still need to verify and then acquire the token
//     try {
//         req.user.tokens = req.user.tokens.filter((token)=>{
//             return token.token !== req.token
//         })
//         //we made changes to token array, so we need to save
//         await req.user.save()

//         res.status(200).send(req.user)
//     } catch(error) {
//         res.status(500).send()
//     }
// })

// router.post('/users/logoutAll', auth, async (req, res)=>{
//     try {
//         console.log('after authorization:', 'clear the cache')
//         req.user.tokens = []

//         //we made changes to token array, so we need to save
//         await req.user.save()

//         res.status(200).send(req.user)
//     } catch(error) {
//         res.status(500).send()
//     }
// })

// router.get('/users', (req, res) => {
//     //searching for users
//     User.find({}).then((users)=>{
//         res.send(users)
//     }).catch((error) => {
//         res.status(500).send()
//     })
// })

// //read profile for specific user that is authenticated
// router.get('/users/me', auth, async (req, res)=>{
//     //this will run only after auth is perfomed
//     //auth will return the user
//     res.send(req.user)
// })

// //get user by id    get /users/:id
// router.get('/users/:id',(req, res) => {
//     //print the id
//     console.log(req.params)
//     const _id = req.params.id
//     User.findById(_id).then((user)=>{
//         if (!user) {
//             res.status(404).send()
//         }
//         res.send(user)
//     }).catch((error)=>{
//         res.status(500).send()
//     })
// })

// //update the user by id
// router.patch('/users/:id', async (req, res) => {
//     const _id = req.params.id
//     const body = Object.keys(req.body)
//     const alloweUpdates = ['name', 'email', 'password', 'age']
//     try {
//         const isValid = body.every((field) =>{
//             return alloweUpdates.includes(field)
//         })
//         if (!isValid) throw new Error('bad update request')
//        /*
//         const user = await User.findByIdAndUpdate(_id, req.body, {new: true, useFindAndModify: true})
//        */
//         const user = await User.findById(_id)
//         body.forEach((key) => {
//             user[key] = req.body[key]
//         })
//         await user.save()

//         if (!user) throw new Error('no such an user')
//         res.status(201).send(user)
//     } catch(e){
//         res.status(400).send()
//     }
// })

// //delete user by id
// //just delete the user who requested, so /users/:id, id is not needed for safety
// /*router.delete('/users/:id', async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id)
//         if (!user) throw new Error('no such an user')
//         res.send(user)
//     } catch(e) {
//         res.status(500).send(e.message)
//     }
// })*/

// //directly delete the user profile after the action is authorized
// router.delete('/users/me', auth, async (req, res) => {
//     //would not run if auth didnt not pass
//     console.log('running delete')
//     try {
//         /*
//         just use the remove method
//         */
//         //const user = await User.findByIdAndDelete(req.params.id)
//         //if (!user) throw new Error('no such an user')
//         await req.user.remove()
//         res.send(req.user)
//     } catch(e) {
//         res.status(500).send()
//     }
// })

module.exports = router