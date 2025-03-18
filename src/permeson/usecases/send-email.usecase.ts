import * as nodemailer from 'nodemailer';

export async function sendEmail({ to, subject, html }: { to: string, subject: string, html: string, }): Promise<void> {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_EMAIL || 'noreply.rapida@gmail.com',
                pass: process.env.SMTP_PASSWORD || 'ekgwxlazvjjllfxf',
            },
        });

        const mailOptions = {
            from: process.env.SMTP_EMAIL || 'noreply.rapida@gmail.com',
            to,
            subject,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.info('E-mail enviado:', info.messageId);
    } catch (error) {
        console.error('Erro ao enviar o e-mail:', error);
    }
}