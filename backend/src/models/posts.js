module.exports = (sequelize, DataTypes) => {
	const Post = sequelize.define("posts", {
	  post_id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	  },
	  user_id: {
		type: DataTypes.INTEGER,
		references: {
		  model: "users",
		  key: "user_id",
		},
		field: "user_id",
	  },
  
	  title: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	  },
	  content: {
		type: DataTypes.TEXT,
		allowNull: false,
		unique: true,
	  },
	  isHidden: {
		type: DataTypes.BOOLEAN,
		field: "is_hidden",
		allowNull: false,
		defaultValue: false,
	  },
	});
  
	Post.associate = (models) => {
	  Post.belongsTo(models.users, {
		foreignKey: { field: "user_id" },
	  });
	};
  
	return Post;
  };