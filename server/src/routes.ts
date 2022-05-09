import express from 'express';
import { prisma } from './prisma';
import nodemailer from 'nodemailer';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedback-repository';
import { NodemailerMailAdapter } from './adapter/nodemailer/nodemailer-mail-adapter';
export const routes = express.Router();



routes.post('/feedback', async (req, res) => {
    const {type, comment, screenshot} = req.body;
    const feedbackRepository = new PrismaFeedbackRepository();
    const mailAdapter = new NodemailerMailAdapter();
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        feedbackRepository,
        mailAdapter
    );
    submitFeedbackUseCase.execute({
        type,
        comment, 
        screenshot
    });
   

    return res.send(201) ;
});