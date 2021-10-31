const User = require('../models/user');
const {auth} = require('../middlewares/auth');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).send(`Welcome to login , sign-up api`);
})

// adding new user (sign-up route)
router.post('/api/register', function (req, res) {
  // taking a user
  const newuser = new User(req.body);
  console.log(newuser);


  if (newuser.password != newuser.confirmPassword) return res.status(400).json({ message: "Hasła do siebie nie pasują" });

  User.findOne({ email: newuser.email }, function (err, user) {
    if (user) return res.status(400).json({ auth: false, message: "Podany email jest już zarejestrowany" });

    newuser.save((err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: false });
      }
      res.status(200).json({
        succes: true,
        user: doc
      });
    });
  });
});

// login user
router.post('/api/login', function(req,res){
  let token = req.cookies.auth;

  User.findByToken(token,(err,user)=>{
      if(err) return  res(err);
      if(user) return res.status(400).json({
          error: true,
          message: "Jesteś już zalogowany"
      });
  
      else{
          User.findOne({'email':req.body.email}, function(err,user) {
              if(!user) return res.json({isAuth: false, message: 'Nie znaleziono takiego adresu e-mail'});
      
              user.comparePassword(req.body.password, (err,isMatch) => {
                  if(!isMatch) return res.json({isAuth: false, message: "Hasła nie są identyczne"});
      
              user.generateToken((err,user) => {
                  if(err) return res.status(400).send(err);
                  res.cookie('auth',user.token, {credentials: 'include', maxAge: 900000,
                  httpOnly: true,}).json({
                      isAuth : true,
                      id : user._id,
                      email : user.email,
                      role: user.role
                  });
              });    
          });
        });
      }
  });
});

// get logged in user
router.get('/api/profile',auth,function(req,res){
  res.json({
      isAuth: true,
      id: req.user._id,
      email: req.user.email,
      name: req.user.firstName + " " + req.user.lastName,
      role: req.user.role
      
  })
});

//logout user
router.get('/api/logout',auth,function(req,res){

  req.user.deleteToken(req.token,(err,user)=>{
      if(err) return res.status(400).send(err);
      res.sendStatus(200);
  });

}); 

module.exports = router