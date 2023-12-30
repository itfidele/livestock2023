import { UsersEntity } from "models/user/user.entity";
import { handleLogin, handleRegistration } from "../../controllers/auth";
import Router from "koa-router";


const authRoutes = new Router();


authRoutes.post("/login", async (ctx) => {
    const { email, password } = ctx.request.body;
    console.log(email,password)
    if (!email || !password) {
      ctx.throw("Incomplete Form", 400);
    }
    try {
      const response = await handleLogin(
        String(email),
        String(password)
      );
      ctx.status = 200;
      ctx.body = response;
    } catch (error) {
      ctx.throw(error.message, 400);
    }
});

authRoutes.post('/register',async (ctx)=>{
  const { firstName, lastName, email, password,phone } = ctx.request.body;

  if (!firstName || !lastName || !email || !password || !phone) {
    ctx.throw("Incomplete Form", 400);
  }
  const token = await handleRegistration(String(email), String(password), String(firstName), String(lastName), String(phone));
  ctx.status = 204;
  ctx.body = { token };

})


export { authRoutes };