import Sequelize from "sequelize";

const sequelize = new Sequelize("colabico", "postgres", process.env.PASSWORD, {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

const Model = Sequelize.Model;

class Users extends Model {}

Users.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: Sequelize.TEXT,
    },
    password: {
      type: Sequelize.TEXT,
    },
  },
  {
    sequelize,
    modelName: "users",
    tableName: "users",
    timestamps: false,
    underscored: true,
  }
);

export { Users };
