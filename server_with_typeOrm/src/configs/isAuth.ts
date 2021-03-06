import { MiddlewareFn } from "type-graphql";
import jwt from "jsonwebtoken";
import { MyContext } from "../MyContext";

// Bearer alshdlskhdkllkshjdf

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];
  console.log("authorization", authorization);

  if (!authorization) {
    console.log("err");
    throw new Error("Not authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!); // payload === { userId: user.id }
    //we will store payload in MyContext
    context.payload = payload as any;
  } catch (err) {
    console.log("err", err);
    throw new Error("Not authenticated!");
  }
  return next();
};
