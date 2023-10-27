const { sequelize, User, Shop } = require("../models");

exports.createshop = async (req, res, next) => {
  try {
    const { name, title, banner, map } = req.body;
    const data = {};
    if (!name && !title && !banner && !map) {
      res.json({ msg: "Please insert data" });
      next(err);
    } else if (!name) {
      res.json({ msg: "Please insert name" });
      next(err);
    } else if (!title) {
      res.json({ msg: "Please insert title" });
      next(err);
    } else if (!map) {
      res.json({ msg: "Please insert map" });
      next(err);
    } else {
      const checkShopName = await Shop.findAll({ where: { name: name } });
      if (checkShopName[0]) {
        res.json({ msg: "Can't use this name" });
      } else {
        data.name = name;
        data.title = title;
        data.map = map;
        data.user_id = req.user[0].id;
        await Shop.create(data);
        res.json({ msg: "Create success" });
      }
    }
  } catch (err) {
    next(err);
  }
};

exports.getShop = async (req, res, next) => {
  try {
    const allShop = await Shop.findAll();
    res.json({ shop: allShop });
  } catch (err) {
    next(err);
  }
};

exports.editShop = async (req, res, next) => {
  try {
    const { name, title, banner, map,id } = req.body;
    const target = req.params["id"]; 
    const update = {};

    if (name) {
      update.name = name;
    }
    if (title) {
      update.title = title;
    }
    if (map) {
      update.map = map;
    }
   
    const result =  await Shop.update(update, { where: {id:target} });
    res.json({ msg: result });
    
  } catch (err) {
    next(err);
  }
};

exports.deleteShop = async (req,res) => {
    try{
        const target = req.params["id"];
        await Shop.destroy({ where: { id: target } });
        res.json({msg:"delete success"})
    }catch(err){
        next(err)
    }
}
