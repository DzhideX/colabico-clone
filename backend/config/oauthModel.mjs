import Sequelize from "sequelize";
import OAuth2Server from "oauth2-server";

const sequelize = new Sequelize("colabico", "postgres", "Ageofempires1", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

const Model = Sequelize.Model;

class Users extends Model {}
class Tokens extends Model {}
class Clients extends Model {}

Users.init(
  {
    id: {
      type: Sequelize.UUIDV4,
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

Clients.init(
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
      primaryKey: true,
    },
    secret: {
      type: Sequelize.CHAR,
    },
    redirect_uris: {
      type: Sequelize.ARRAY(Sequelize.CHAR),
    },
  },
  {
    sequelize,
    modelName: "clients",
    tableName: "oauth_clients",
    timestamps: false,
    underscored: true,
  }
);

const model = {
  async getOneToken(whichToken, tokenString) {
    const token = await Tokens.findOne({
      where:
        whichToken === "access_token"
          ? { access_token: tokenString }
          : { refresh_token: tokenString },
    });

    if (!token) {
      return null;
    }

    const user = await Users.findOne({
      where: {
        id: token.user_id,
      },
    });
    const client = await Clients.findOne({
      where: {
        id: token.oauth_client_id,
      },
    });

    return {
      createdAt: token.dataValues.created_at,
      updatedAt: token.dataValues.updated_at,
      deletedAt: token.dataValues.deleted_at,
      id: token.dataValues.id,
      accessToken: token.dataValues.access_token,
      accessTokenExpiresAt: token.dataValues.access_token_expires_at,
      refreshToken: token.dataValues.refresh_token,
      refreshTokenExpiresAt: token.dataValues.refresh_token_expires_at,
      oauthClientId: token.dataValues.oauth_client_id,
      userId: token.dataValues.user_id,
      client: client.dataValues,
      user: user.dataValues,
    };
  },
  async getAccessToken(bearerToken) {
    return this.getOneToken("access_token", bearerToken);
  },
  async getRefreshToken(bearerToken) {
    return this.getOneToken("refresh_token", bearerToken);
  },
  async getClient(clientId, clientSecret) {
    const client = await Clients.findOne({
      where: {
        id: clientId,
        secret: clientSecret,
      },
    });

    if (!client) {
      return null;
    }

    return {
      ...client,
      grants: ["password", "refresh_token", "authorization_grant"],
    };
  },
  async saveToken(token, client, user) {
    Tokens.create({
      access_token: token.accessToken,
      access_token_expires_at: token.accessTokenExpiresAt,
      refresh_token: token.refreshToken,
      refresh_token_expires_at: token.refreshTokenExpiresAt,
      oauth_client_id: client.dataValues.id,
      user_id: user.id,
    });

    return { ...token, client, user };
  },
  async revokeToken(token) {
    Tokens.destroy({
      where: {
        refresh_token: token.refreshToken,
      },
    });
    return token;
  },
  async getUser(username, password) {
    const user = await Users.findOne({
      where: {
        email: username,
        password,
      },
    });
    return {
      username: user.dataValues.email,
      password: user.dataValues.password,
      id: user.dataValues.id,
    };
  },
};

export default model;
