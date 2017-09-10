import nodemailer from 'nodemailer';

const sendMail = (to, text, subject) => {
	const transporter = nodemailer.createTransport(process.env.SMTPS_URI);
	const mailOptions = {
		from: '42matcha42@gmail.com',
		to,
		subject,
		text,
	};
	transporter.sendMail(mailOptions, (err) => {
		console.log(err);
	});
};

export default sendMail;
