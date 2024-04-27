import { validateToken } from "../service/auth.js";
import { catchAsyncErros } from "./catchAsyncErros.js";
import ErrorHandler from "./errorMiddleware.js";

export const isAdminAuthenticated = catchAsyncErros(async (req, res, next) => {
  const tokenCookieValue = req.cookies.AdminToken;
  if (!tokenCookieValue)
    return next(new ErrorHandler("Admin Not Authenticated!", 400));

  const userPayLoad = validateToken(tokenCookieValue);
  if (!userPayLoad.role.includes("Admin")) {
    return next(
      new ErrorHandler("You are not authrized for this resources!", 403)
    );
  }
  req.user = userPayLoad;
  next();
});

export const isUserAuthenticated = catchAsyncErros(async (req, res, next) => {
  const tokenCookieValue = req.cookies.UserToken;
  if (!tokenCookieValue)
    return next(new ErrorHandler("User Not Authenticated!", 400));

  const userPayLoad = validateToken(tokenCookieValue);

  if (
    !userPayLoad.role.includes("Patient") &&
    !userPayLoad.role.includes("Doctor")
  ) {
    return next(
      new ErrorHandler("You are not authrized for this resources!", 403)
    );
  }
  req.user = userPayLoad;
  next();
});
