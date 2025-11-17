import dotenv from "dotenv";
dotenv.config();

const FRONTEND_LOGIN_URL = process.env.FRONTEND_LOGIN_URL;

export const INVALID_LINK_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Link Invalid or Expired • YourApp</title>
  <meta name="robots" content="noindex, nofollow" />
  <style>
    /* Using a modern system font stack for performance and consistency */
    html {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    body {
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background-color: #f8f9fa;
      color: #344054;
    }

    .card {
      width: 100%;
      max-width: 460px;
      background-color: #ffffff;
      border-radius: 16px;
      border: 1px solid #e5e7eb;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      text-align: center;
      padding: 48px;
      box-sizing: border-box;
      margin: 20px;
    }

    .icon-container {
      margin: 0 auto 24px;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background-color: #fee2e2;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .icon-container svg {
      color: #ef4444;
    }

    h1 {
      font-size: 28px;
      font-weight: 700;
      color: #111827;
      margin: 0 0 12px;
    }

    .subtitle {
      font-size: 16px;
      color: #667085;
      margin-bottom: 32px;
    }

    .reasons-list {
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 20px;
      text-align: left;
      margin-bottom: 32px;
    }

    .reason-item {
      display: flex;
      align-items: center;
      font-size: 15px;
      color: #344054;
    }

    .reason-item:not(:last-child) {
      margin-bottom: 12px;
    }

    .reason-item svg {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      color: #ef4444;
      margin-right: 12px;
    }

    .cta-button {
      display: inline-block;
      width: 100%;
      padding: 14px 0;
      background-color: #111827;
      color: #ffffff !important;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      border-radius: 8px;
      transition: background-color 0.2s ease;
      box-sizing: border-box;
    }

    .cta-button:hover {
      background-color: #374151;
    }

    .footer {
      margin-top: 32px;
      font-size: 14px;
      color: #9ca3af;
    }
    
    .footer strong {
      color: #4b5563;
    }

    /* --- Dark Mode Styles --- */
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #111827;
        color: #d1d5db;
      }
      .card {
        background-color: #1f2937;
        border-color: #374151;
      }
      h1 {
        color: #ffffff;
      }
      .subtitle {
        color: #9ca3af;
      }
      .reasons-list {
        background-color: #111827;
        border-color: #374151;
      }
      .reason-item {
        color: #d1d5db;
      }
      .cta-button {
        background-color: #f9fafb;
        color: #111827 !important;
      }
      .cta-button:hover {
        background-color: #e5e7eb;
      }
      .footer {
        color: #6b7280;
      }
      .footer strong {
        color: #d1d5db;
      }
    }
  </style>
</head>

<body>
  <div class="card">
    <div class="icon-container">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <h1>Link Invalid or Expired</h1>
    <p class="subtitle">This verification link is no longer valid.</p>

    <div class="reasons-list">
      <div class="reason-item">
        <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" /></svg>
        <span>This can happen if the link has expired or was already used.</span>
      </div>
    </div>
    
    <a href="${FRONTEND_LOGIN_URL}" class="cta-button">
      Return to Login
    </a>

    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} <strong>Chicku</strong>. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>
`.trim();

export const SUCCESS_VERIFICATION_HTML = (firstName = "there") =>
  `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verified Successfully • YourApp</title>
  <meta name="robots" content="noindex, nofollow" />
  <style>
    /* Using a modern system font stack for performance and consistency */
    html {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    body {
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background-color: #f8f9fa;
      color: #344054;
    }

    .card {
      width: 100%;
      max-width: 460px;
      background-color: #ffffff;
      border-radius: 16px;
      border: 1px solid #e5e7eb;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      text-align: center;
      padding: 48px;
      box-sizing: border-box;
      margin: 20px;
    }

    .icon-container {
      margin: 0 auto 24px;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background-color: #d1fae5; /* Light green */
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .icon-container svg {
      color: #10b981; /* Dark green */
    }

    h1 {
      font-size: 28px;
      font-weight: 700;
      color: #111827;
      margin: 0 0 12px;
    }

    .subtitle {
      font-size: 16px;
      color: #667085;
      margin-bottom: 32px;
      line-height: 1.6;
    }
    
    .subtitle .name {
        color: #111827;
        font-weight: 600;
    }

    .cta-button {
      display: inline-block;
      width: 100%;
      padding: 14px 0;
      background-color: #111827;
      color: #ffffff !important;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      border-radius: 8px;
      transition: background-color 0.2s ease;
      box-sizing: border-box;
    }

    .cta-button:hover {
      background-color: #374151;
    }

    /* --- Dark Mode Styles --- */
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #111827;
        color: #d1d5db;
      }
      .card {
        background-color: #1f2937;
        border-color: #374151;
      }
      .icon-container {
        background-color: #064e3b;
      }
      .icon-container svg {
        color: #a7f3d0;
      }
      h1, .subtitle .name {
        color: #ffffff;
      }
      .subtitle {
        color: #9ca3af;
      }
      .cta-button {
        background-color: #f9fafb;
        color: #111827 !important;
      }
      .cta-button:hover {
        background-color: #e5e7eb;
      }
    }
  </style>
</head>

<body>
  <div class="card">
    <div class="icon-container">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <h1>Verification Successful</h1>
    <p class="subtitle">
      Welcome, <span class="name">${firstName}</span>! Your email is confirmed and your account is ready to go.
    </p>
    
    <a href="${FRONTEND_LOGIN_URL}" class="cta-button">
      Continue to Your Account
    </a>
  </div>
</body>
</html>
`.trim();

export default {
  INVALID_LINK_HTML,
  SUCCESS_VERIFICATION_HTML,
};
