import { FeedbackCreateData, FeedbackRepository } from "../feedback-repository";
import { prisma } from '../../prisma';

export class PrismaFeedbackRepository implements FeedbackRepository {
    async create({ type, comment, screenshot }: FeedbackCreateData) {
        await prisma.feedback.create({
            data: {
                type: type,
                comment: comment,
                screenshot: screenshot || ''
            }
        });
    }
}