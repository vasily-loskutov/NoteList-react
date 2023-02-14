const jwt = require("jsonwebtoken");
const Token = require("../models/Token");
const config = require("config");
class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, config.get("accessTokenKey"), {
      // expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, config.get("refreshTokenKey"));
    return {
      accessToken,
      refreshToken,
      expiresIn: 10,
    };
  }
  async save(user, refreshToken) {
    const data = await Token.findOne({ user });
    if (data) {
      data.refreshToken = refreshToken;
      return data.save();
    }
    const token = await Token.create({
      user,
      refreshToken,
    });
    return token;
  }
  validateRefresh(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get("refreshTokenKey"));
    } catch (error) {
      return null;
    }
  }
  validateAccess(accessToken) {
    try {
      return jwt.verify(accessToken, config.get("accessTokenKey"));
    } catch (error) {
      return null;
    }
  }
  async findToken(refreshToken) {
    try {
      return await Token.findOne({ refreshToken });
    } catch (error) {
      return null;
    }
  }
}
module.exports = new TokenService();
