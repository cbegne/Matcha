import nodemailer from 'nodemailer';

const sendMail = (to, text, subject) => {
	const stmp = {
    service: 'gmail',
    auth: {
      user: '42matcha42@gmail.com',
      pass: 'matcha42'
    }
  };
	const transporter = nodemailer.createTransport(stmp);
	const mailOptions = {
		from: '42matcha42@gmail.com',
		to,
		subject,
		text,
	};
	transporter.sendMail(mailOptions, (err, info) => {
		console.log(err || info);
	});
};

export default sendMail;
