express= require('express');
path = require('path');
phash = require('bcrypt');
Student = require('./database');
app = express();
port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/',(req, res)=>{
    res.render('login')
})

app.post('/register', async(req, res)=>{
    const { username, password }=  req.body;
    console.log(username, password);
    saltRounds = 1;
    encpassword = phash.hash(password, saltRounds);
    console.log(encpassword)
    newStudent = new Student({username, encpassword});
    Studentsave = await newStudent.save();
    res.redirect('/register')
})

app.get('/register', (req, res)=>{
    res.render('register')
})


app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
})