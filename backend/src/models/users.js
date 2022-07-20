const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM("admin", "blogger"),
      defaultValue: "blogger",
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  User.associate = (models) => {
    User.hasMany(models.posts, {
      foreignKey: { field: "post_id" },
    });
  };

  User.beforeSave(async (user, options) => {
    if (user.changed("passwordHash")) {
      user.passwordHash = await bcrypt.hash(user.passwordHash, 10);
    }
  });

  return User;
};