const emailVerificationTemplate = ({ firstName, appName, verifyLink }) => {
  const currentYear = new Date().getFullYear();

  return `
    <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Email Address</title>
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <style>
      /* --- Base Styles --- */
      body {
        margin: 0;
        padding: 0;
        width: 100% !important;
        background-color: #ffffff; /* Fallback for clients that support it */
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        text-align: center;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      /* This is the new wrapper class for the main table */
      .email-wrapper {
        background-color: #ffffff;
      }

      /* --- Content Wrapper --- */
      .content {
        max-width: 500px;
        margin: 0 auto;
        padding: 60px 20px;
      }

      /* --- Typography --- */
      .app-name {
        font-size: 20px;
        font-weight: 600;
        color: #111827;
        margin-bottom: 24px;
      }

      h1 {
        font-size: 28px;
        font-weight: 700;
        color: #111827;
        margin: 0 0 16px;
      }

      p {
        font-size: 16px;
        line-height: 1.6;
        color: #4b5563;
        margin: 0 0 32px;
      }

      /* --- Call to Action Button --- */
      .verify-button {
        display: inline-block;
        padding: 15px 35px;
        background-color: #000000;
        color: #ffffff !important;
        text-decoration: none;
        font-weight: 600;
        font-size: 16px;
        border-radius: 8px;
        margin-bottom: 32px;
      }
      
      /* --- Link Info --- */
      .link-info {
        font-size: 14px;
        color: #6b7280;
      }
      
      .link-info a {
        color: #6b7280;
        word-break: break-all;
        text-decoration: underline;
      }

      /* --- Footer --- */
      .footer {
        padding: 40px 20px;
        text-align: center;
        font-size: 13px;
        color: #9ca3af;
      }

      /* --- Dark Mode Styles --- */
      @media (prefers-color-scheme: dark) {
        /* Use !important to override inline styles set for compatibility */
        .dark-mode-wrapper {
          background-color: #000000 !important;
        }
        .dark-mode-text-primary {
          color: #ffffff !important;
        }
        .dark-mode-text-secondary {
          color: #d1d5db !important;
        }
        .dark-mode-text-tertiary, .dark-mode-link {
          color: #9ca3af !important;
        }
        .dark-mode-button {
          background-color: #ffffff !important;
          color: #000000 !important;
        }
      }
    </style>
  </head>
  <body>
    <table
      class="email-wrapper dark-mode-wrapper"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      role="presentation"
      bgcolor="#ffffff"
      style="background-color: #ffffff;"
    >
      <tr>
        <td>
          <div class="content">
            <div class="app-name dark-mode-text-primary">${appName}</div>

            <h1 class="dark-mode-text-primary">Verify your email address</h1>
            <p class="dark-mode-text-secondary">
              Hi ${
                firstName || "there"
              }, thanks for signing up! Please click the button below to confirm your email and activate your account.
            </p>

            <p class="dark-mode-text-secondary">
            ⏱️ <strong>This verification link is valid for 30 minutes.</strong><br />
            If the link expires, simply log in again and we’ll automatically send you a new verification email.
          </p>

            <a href="${verifyLink}" class="verify-button dark-mode-button" target="_blank">
              Verify Email
            </a>

            <div class="link-info">
              <p class="dark-mode-text-tertiary">If the button doesn't work, you can copy and paste this link into your browser:<br/>
                <a href="${verifyLink}" class="dark-mode-link">${verifyLink}</a>
              </p>
            </div>
          </div>

          <div class="footer dark-mode-text-tertiary">
            <p>&copy; ${currentYear} ${appName}. All rights reserved.</p>
          </div>
        </td>
      </tr>
    </table>
  </body>
  </html>
    `;
};

export default emailVerificationTemplate;
