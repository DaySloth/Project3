const EmailHTML = {
    contactUs: (contactObj) => {
        return new Promise((resolve, reject) => {
            resolve(`
            <h1>${contactObj.name}</h1>
            <h1>${contactObj.email}</h1>
            <h1>${contactObj.message}</h1>`);
        });
    },

    resetPassword: (code, user_id) => {
        return new Promise((resolve, reject) => {
            resolve(`<!DOCTYPE html>
            <html>
                <head>
                    <title></title>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <style type="text/css">
                        /* CLIENT-SPECIFIC STYLES */
                        body,
                        table,
                        td,
                        a {
                            -webkit-text-size-adjust: 100%;
                            -ms-text-size-adjust: 100%;
                        }
                        table,
                        td {
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                        }
                        img {
                            -ms-interpolation-mode: bicubic;
                        }
            
                        /* RESET STYLES */
                        img {
                            border: 0;
                            height: auto;
                            line-height: 100%;
                            outline: none;
                            text-decoration: none;
                        }
                        table {
                            border-collapse: collapse !important;
                        }
                        body {
                            height: 100% !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            width: 100% !important;
                        }
            
                        /* MOBILE STYLES */
                        @media screen and (max-width: 600px) {
                            h1 {
                                font-size: 32px !important;
                                line-height: 32px !important;
                            }
                        }
            
                        /* ANDROID CENTER FIX */
                        div[style*="margin: 16px 0;"] {
                            margin: 0 !important;
                        }
                    </style>
            
                    <style type="text/css"></style>
                </head>
                <body
                    style="
                        background-color: #f4f4f4;
                        margin: 0 !important;
                        padding: 0 !important;
                    "
                >
                    <!-- HIDDEN PREHEADER TEXT -->
                    <div
                        style="
                            display: none;
                            font-size: 1px;
                            color: #fefefe;
                            line-height: 1px;
                            font-family: Helvetica, Arial, sans-serif;
                            max-height: 0px;
                            max-width: 0px;
                            opacity: 0;
                            overflow: hidden;
                        "
                    >
                        Reset your password
                    </div>
            
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td bgcolor="#f4f4f4" align="center">
                                <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="max-width: 600px"
                                >
                                    <tr>
                                        <td
                                            align="center"
                                            valign="top"
                                            style="padding: 40px 10px 40px 10px"
                                        ></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <!-- HERO -->
                        <tr>
                            <td
                                bgcolor="#f4f4f4"
                                align="center"
                                style="padding: 0px 10px 0px 10px"
                            >
                                <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="max-width: 600px"
                                >
                                    <tr>
                                        <td
                                            bgcolor="#ffffff"
                                            align="center"
                                            valign="top"
                                            style="
                                                padding: 40px 20px 20px 20px;
                                                border-radius: 4px 4px 0px 0px;
                                                color: #111111;
                                                font-family: Helvetica, Arial, sans-serif;
                                                font-size: 48px;
                                                font-weight: 400;
                                                letter-spacing: 4px;
                                                line-height: 48px;
                                            "
                                        >
                                            <h1
                                                style="
                                                    font-size: 28px;
                                                    font-weight: 400;
                                                    margin: 0;
                                                    letter-spacing: 0px;
                                                "
                                            >
                                                Reset your password
                                            </h1>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <!-- COPY BLOCK -->
                        <tr>
                            <td
                                bgcolor="#f4f4f4"
                                align="center"
                                style="padding: 0px 10px 0px 10px"
                            >
                                <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="max-width: 600px"
                                >
                                    <tr>
                                        <td
                                            bgcolor="#ffffff"
                                            align="left"
                                            style="
                                                padding: 20px 30px 40px 30px;
                                                color: #0e0d0d;
                                                font-family: Helvetica, Arial, sans-serif;
                                                font-size: 18px;
                                                font-weight: 400;
                                                line-height: 25px;
                                            "
                                        >
                                            <p style="margin: 0">
                                                You received this E-mail in response to your
                                                request to reset your password. Click the link and input your passcode provided.
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            bgcolor="#ffffff"
                                            align="left"
                                            style="
                                                padding: 20px 30px 40px 30px;
                                                color: #0e0d0d;
                                                font-family: Helvetica, Arial, sans-serif;
                                                font-size: 18px;
                                                font-weight: 400;
                                                line-height: 25px;
                                            "
                                        >
                                            <h1 style="text-align: center">${code}
                                            </h1>
                                        </td>
                                    </tr>
                                    <!-- BULLETPROOF BUTTON -->
                                    <tr>
                                        <td bgcolor="#ffffff" align="left">
                                            <table
                                                width="100%"
                                                border="0"
                                                cellspacing="0"
                                                cellpadding="0"
                                            >
                                                <tr>
                                                    <td
                                                        bgcolor="#ffffff"
                                                        align="center"
                                                        style="padding: 20px 30px 60px 30px"
                                                    >
                                                        <table
                                                            border="0"
                                                            cellspacing="0"
                                                            cellpadding="0"
                                                        >
                                                            <tr>
                                                                <td
                                                                    align="center"
                                                                    style="
                                                                        border-radius: 3px;
                                                                    "
                                                                    bgcolor="#4A35EA"
                                                                >
                                                                    <a
                                                                        href="http://localhost:3000/user/reset-password/${user_id}"
                                                                        target="_blank"
                                                                        style="
                                                                            font-size: 20px;
                                                                            font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                            color: #ffffff;
                                                                            text-decoration: none;
                                                                            color: #ffffff;
                                                                            text-decoration: none;
                                                                            padding: 15px
                                                                                25px;
                                                                            border-radius: 2px;
                                                                            border: 1px
                                                                                solid
                                                                                #4a35ea;
                                                                            display: inline-block;
                                                                        "
                                                                        >Reset Password</a
                                                                    >
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <!-- COPY -->
                                    <tr>
                                        <td
                                            bgcolor="#ffffff"
                                            align="left"
                                            style="
                                                padding: 0px 30px 0px 30px;
                                                color: #0c0c0c;
                                                font-family: Helvetica, Arial, sans-serif;
                                                font-size: 18px;
                                                font-weight: 400;
                                                line-height: 25px;
                                            "
                                        >
                                            <p style="margin: 0">
                                                This password reset is only valid for the
                                                next 30 minutes.If that doesn't work, copy
                                                and paste the following link in your
                                                browser:
                                            </p>
                                        </td>
                                    </tr>
                                    <!-- COPY -->
                                    <tr>
                                        <td
                                            bgcolor="#ffffff"
                                            align="left"
                                            style="
                                                padding: 20px 30px 20px 30px;
                                                color: #0e0d0d;
                                                font-family: Helvetica, Arial, sans-serif;
                                                font-size: 18px;
                                                font-weight: 400;
                                                line-height: 25px;
                                            "
                                        >
                                            <p style="margin: 0">
                                                <a
                                                    href="http://localhost:3000/user/reset-password/${user_id}"
                                                    target="_blank"
                                                    style="color: #4a35ea"
                                                    >http://localhost:3000/user/reset-password/${user_id}</a
                                                >
                                            </p>
                                        </td>
                                    </tr>
                                    <!-- COPY -->
                                    <tr>
                                        <td
                                            bgcolor="#ffffff"
                                            align="left"
                                            style="
                                                padding: 0px 30px 20px 30px;
                                                color: #0f0e0e;
                                                font-family: Helvetica, Arial, sans-serif;
                                                font-size: 18px;
                                                font-weight: 400;
                                                line-height: 25px;
                                            "
                                        >
                                            <p style="margin: 0">
                                                If you have any questions, just reply to
                                                this email—we're always happy to help out.
                                            </p>
                                        </td>
                                    </tr>
                                    <!-- COPY -->
                                    <tr>
                                        <td
                                            bgcolor="#ffffff"
                                            align="left"
                                            style="
                                                padding: 0px 30px 40px 30px;
                                                border-radius: 0px 0px 4px 4px;
                                                color: #0c0b0b;
                                                font-family: Helvetica, Arial, sans-serif;
                                                font-size: 18px;
                                                font-weight: 400;
                                                line-height: 25px;
                                            "
                                        >
                                            <p style="margin: 0">
                                                Thank you ,<br />
                                                Congo Team
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <!-- FOOTER -->
                        <tr>
                            <td
                                bgcolor="#f4f4f4"
                                align="center"
                                style="padding: 0px 10px 0px 10px"
                            >
                                <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="max-width: 600px"
                                >
                                    <!-- NAVIGATION -->
                                    <tr>
                                        <td
                                            bgcolor="#f4f4f4"
                                            align="left"
                                            style="
                                                padding: 30px 30px 30px 30px;
                                                color: #0e0d0d;
                                                font-family: Helvetica, Arial, sans-serif;
                                                font-size: 14px;
                                                font-weight: 400;
                                                line-height: 18px;
                                            "
                                        >
                                            <p style="margin: 0">
                                                <a
                                                    href="https://myaccount.google.com/intro/dashboard?pli=1"
                                                    target="_blank"
                                                    style="color: #111111; font-weight: 700"
                                                    >Dashboard</a
                                                >
                                                -
                                                <a
                                                    href="https://support.google.com/a/answer/1224185?hl=en"
                                                    target="_blank"
                                                    style="color: #111111; font-weight: 700"
                                                    >Billing</a
                                                >
                                                -
                                                <a
                                                    href="https://support.google.com/mail/?hl=en#topic=7065107"
                                                    target="_blank"
                                                    style="color: #111111; font-weight: 700"
                                                    >Help</a
                                                >
                                            </p>
                                        </td>
                                    </tr>
            
                                    <!-- UNSUBSCRIBE -->
                                    <tr>
                                        <td
                                            bgcolor="#f4f4f4"
                                            align="left"
                                            style="
                                                padding: 0px 30px 30px 30px;
                                                color: #0a0a0a;
                                                font-family: Helvetica, Arial, sans-serif;
                                                font-size: 14px;
                                                font-weight: 400;
                                                line-height: 18px;
                                            "
                                        >
                                            <p style="margin: 0">
                                                If these emails get annoying, please feel
                                                free to
                                                <a
                                                    href="https://support.google.com/mail/answer/8151?co=GENIE.Platform%3DDesktop&hl=en#:~:text=getting%20these%20emails.-,On%20your%20computer%2C%20go%20to%20Gmail.,click%20Unsubscribe%20or%20Change%20preferences."
                                                    target="_blank"
                                                    style="color: #111111; font-weight: 700"
                                                    >unsubscribe</a
                                                >.
                                            </p>
                                        </td>
                                    </tr>
                                    <!-- ADDRESS -->
                                    <tr>
                                        <td
                                            bgcolor="#f4f4f4"
                                            align="left"
                                            style="
                                                padding: 0px 30px 30px 30px;
                                                color: #585555;
                                                font-family: Helvetica, Arial, sans-serif;
                                                font-size: 14px;
                                                font-weight: 400;
                                                line-height: 18px;
                                            "
                                        >
                                            <p style="margin: 0">
                                                Congo <br />
                                                1234 Main Street <br />
                                                New York, MA 56789
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
            </html>
            `);
        });
    },
};

module.exports = EmailHTML;
