import Sequelize from "sequelize";

const sequelize = new Sequelize("colabico", "postgres", process.env.PASSWORD, {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

const Model = Sequelize.Model;

class Users extends Model {}
class Tokens extends Model {}

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

Tokens.init(
  {
    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
    deleted_at: {
      type: Sequelize.DATE,
    },
    id: {
      type: Sequelize.UUIDV4,
    },
    access_token: {
      type: Sequelize.CHAR,
    },
    access_token_expires_at: {
      type: Sequelize.DATE,
    },
    refresh_token: {
      type: Sequelize.CHAR,
    },
    refresh_token_expires_at: {
      type: Sequelize.DATE,
    },
    oauth_client_id: {
      type: Sequelize.CHAR,
    },
    user_id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "tokens",
    tableName: "tokens",
    timestamps: false,
  }
);

export { Users, Tokens };
