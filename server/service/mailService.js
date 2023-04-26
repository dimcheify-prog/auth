import nodemailer from "nodemailer";

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationEmail (to, link) {
        try {
            await this.transporter.sendMail({
                from: 'vancheify@gmail.com',
                to: to,
                subject: `Активация аккаунта ${process.env.API_URL}`,
                text: '',
                html:
                    ` 
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
            })
        } catch (error) {
            console.log(error);
        }

    }
}

export default new MailService();