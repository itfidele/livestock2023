import { handleLogin } from "../../controllers/auth";
import Router from "koa-router";


const authRoutes = new Router();


authRoutes.post("/login", async (ctx) => {
    const { email, password } = ctx.request.body;
    if (!email || !password) {
      ctx.throw("Incomplete Form", 422);
    }
    try {
      const { token, isAdmin } = await handleLogin(
        String(email),
        String(password)
      );
      ctx.status = 200;
      ctx.body = { token, isAdmin };
    } catch (error) {
      ctx.throw(error.message, 422);
    }
});


export { authRoutes };