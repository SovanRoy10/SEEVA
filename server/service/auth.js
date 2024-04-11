import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET_KEY;

export function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
  };

  return {
    token: jwt.sign(payload, secret, {
      expiresIn: process.env.JWT_EXPIRES,
    }),
    tokenName: user.role.includes("Admin") ? "AdminToken" : "UserToken",
  };
}

export function validateToken(token) {
  return jwt.verify(token, secret);
}
