import { Router } from "express";
import {sendMail} from '../handlers/mail'
const router = Router();
router.post('/sendmail',sendMail)


export default router;