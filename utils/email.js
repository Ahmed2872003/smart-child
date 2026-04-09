const catchAsync = require('./catchAsync');
const { MailtrapClient } = require('mailtrap');
const resetTemplate = require('../utils/templates/email-reset');

const sendEmail = catchAsync(async (options, htmlTemplate) => {
  const TOKEN = process.env.EMAIL_TOKEN;

  const client = new MailtrapClient({
    token: TOKEN,
  });

  const sender = {
    email: process.env.EMAIL,
    name: 'Mailtrap Test',
  };
  const recipients = [
    {
      email: options.recipientsEmail,
    },
  ];
  const response = await client.send({
    from: sender,
    to: recipients,
    subject: options.subject,
    html: htmlTemplate,
    category: options.category,
  });
  console.log('Email sent.', response);
});

exports.sendPasswordResetTokenEmail = catchAsync(async (options) => {
  await sendEmail(options, resetTemplate(options.token));
});
