import express from 'express';
import SessionsController from '../controllers/sessions.controller.js';

const userSessions = express.Router();

userSessions.post('/', SessionsController.signIn);

export default userSessions;