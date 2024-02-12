express= require('express');
path = require('path');
bcrypt = require('bcrypt');
Student = require('./database');
app = express();
port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/login',(req, res)=>{
    res.render('login')
})

////this is for after loing home page redrection
app.get('/home', (req, res)=>{
    res.render('home')
})

////this for login username and password validation
app.post('/', async (req, res) => {
    try {
        const checkUser = await Student.findOne({ username: req.body.username });
        if (checkUser) {
            const match = await bcrypt.compare(req.body.password, checkUser.password);
            if (match) {
                res.redirect('/home');  ///// after username and passsword match , then redirect home page
            } else {
                res.send('Incorrect password');
            }
        } else {
            res.send('Username does not exist');
        }   
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
});

/////this is for registration and rastration validation
app.post('/register', async(req, res)=>{
    const { username, password }=  req.body;
    
    exitstingUser = await Student.findOne({username})
    if(exitstingUser){res.send('User already exists, try to another user name')}

    else{
        encpassword = await bcrypt.hash(password, 4);
        newStudent = new Student({
            username : username,
            password : encpassword
        })

        console.log(username, encpassword);
        Studentsave = await newStudent.save();
        res.redirect('/register')
    }
});

app.get('/register', (req, res)=>{
    res.render('register')
})


app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
})