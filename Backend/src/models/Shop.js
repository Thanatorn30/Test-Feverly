module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define("Shop", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    banner: {
      type: DataTypes.STRING,
      allowNull: true,
      
    },
    map: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Shop.associate = (db) => {
    Shop.belongsTo(db.User, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  }

  return Shop;
};
