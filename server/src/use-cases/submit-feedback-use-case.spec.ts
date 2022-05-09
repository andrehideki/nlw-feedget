import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackRepositorySpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackRepositorySpy },
    { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
    it('should be able to submit a feedback', () => {
        expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64:test.jpeg'
        })).resolves.not.toThrow();
        expect(createFeedbackRepositorySpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });
    
    it('should not be able to submit a feedback without a type', () => {
        expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64:test.jpeg'
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without a comment', () => {
        expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64:test.jpeg'
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback with invalid screenshot', () => {
        expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'test.jpeg'
        })).rejects.toThrow();
    });

});