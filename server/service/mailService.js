import nodemailer from "nodemailer";

class MailService {
    constructor() {
        //TODO: переместить значения в .env файл
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'vancheify@gmail.com',
                pass: 'xoyuwvovjzsiybkc'
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