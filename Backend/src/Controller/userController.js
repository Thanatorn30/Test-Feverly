const { where } = require("sequelize");
const { sequelize, User } = require("../models");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const secretKey = 'peetthanatorn'




exports.register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const registerData = {};
    const checkUserEmail = await User.findAll({ where: { email: email } });
    if (!email || !password || !name) {
      res.json({ msg: "Please insert data" });
      next(err);
    }
    if (checkUserEmail[0]) {
      res.json({ msg: "This email is register" });
      next(err);
    }else{
      const emailValidate = validator.isEmail(email);
      if (emailValidate) {
        registerData.email = email;
        bcrypt.hash(password, saltRounds, function (err, hash) {
          const Registerdata = { name:name, email:email, password: hash };
          User.create(Registerdata);
          res.status(200).json({ msg:"Register success" });
        });
      } 
    }

  } catch (err) {
    next(err);
  }
};


exports.login = async(req,res,next) => {
  try{
    const {email,password} = req.body;

    if(!email||!password){
      res.json({msg:'Please insert data'})
      next(err)
    }else{
      const checkUser = await User.findAll({
        where:{email:email}
      })
      if(checkUser[0]){
       const checkPassword = await bcrypt.compare(password,checkUser[0].password)
       if(checkPassword){
        const token = jwt.sign({ email: email }, secretKey, {expiresIn:'1h'});
        res.json({msg:checkPassword , token:token})
       }

      }else{
        res.json({msg:'not found'})
        next(err)
      }
    }

  }catch(err){
    next(err)
  }
}

exports.auth = async(req,res,next) => {
  try{
    
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findAll({
      where: { email: decoded.email },
      attributes: { exclude: "password" },
    });
    req.user = user
    next()
  }catch(err){
    res.json({status:'error'})
    next(err)
  }
}

exports.userInfo = async(req,res,next) => {
  res.json({user:req.user})
}

