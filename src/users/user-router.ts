import { Router } from "../router";
import { getUsers, createUser } from "./user-controller";

const router = new Router();

router.get('/users', getUsers)
router.post('/users', createUser)

export default router;