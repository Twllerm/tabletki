import { Router } from "express";
import { channelsRouter } from "./channels";
import { usersRouter } from "./users-routes";

// User-route
// const userRouter = Router();
// userRouter.get('/all', getAllUsers);
// userRouter.post('/add', addOneUser);
// userRouter.put('/update', updateOneUser);
// userRouter.delete('/delete/:id', deleteOneUser);

// Export the base-router
const baseRouter = Router();

baseRouter.use("/channels", channelsRouter);
baseRouter.use("/users", usersRouter);

// baseRouter.use('/users', userRouter);

export default baseRouter;
