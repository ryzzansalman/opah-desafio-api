import { sendEmail } from "../../usecases/send-email.usecase";

const createForgetPasswordEmailTemplate = (token: string): string  => {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Esqueci a Senha</title>
            </head>
            <body>
                <h1>Esqueci a Senha</h1>
                <p>Clique no link abaixo para redefinir sua senha:</p>
                <a href="${process.env.FRONT_URL}/reset-password?token=${token}">Redefinir Senha</a>

                <p>Se você não solicitou a redefinição da senha, por favor, ignore este e-mail.</p>
            </body>
        </html>
        `;
}

export const sendForgetPasswordEmailUsecase = (email: string, token: string): void => {
    const forgetPasswordEmailTemplate = createForgetPasswordEmailTemplate(token);
    sendEmail({to: email, subject: 'Redefinir senha', html: forgetPasswordEmailTemplate});
}