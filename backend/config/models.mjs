import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize("colabico", "postgres", process.env.PASSWORD, {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

const Model = Sequelize.Model;

class Users extends Model {}
class Tokens extends Model {}
class Lists extends Model {}
class Todos extends Model {}

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

Lists.init(
  {
    name: {
      type: Sequelize.TEXT,
    },
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.UUIDV4,
    },
    created_at: {
      type: Sequelize.DATE,
    },
  },
  {
    sequelize,
    modelName: "lists",
    tableName: "lists",
    timestamps: false,
  }
);

Todos.init(
  {
    created_at: {
      type: Sequelize.DATE,
    },
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    list_id: {
      type: Sequelize.UUIDV4,
    },
    state: {
      type: Sequelize.TEXT,
    },
    value: {
      type: Sequelize.TEXT,
    },
  },
  {
    sequelize,
    modelName: "todos",
    tableName: "todos",
    timestamps: false,
  }
);

export { Users, Tokens, Lists, Todos };
