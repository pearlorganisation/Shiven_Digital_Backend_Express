import transporter from "../../config/nodemailer.js";

class EmailService {
  
  static async send({ to, subject, html, from }) {
    try {
      const mailOptions = {
        from: from || `Chicku <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
      };

      await transporter.sendMail(mailOptions);
      
      return {
        success: true,
        message: "Email sent successfully",
      };
    } catch (error) {
      console.error("❌ Email sending failed:", error);
      return {
        success: false,
        message: "Failed to send email",
      };
    }
  }

}

export default EmailService;
