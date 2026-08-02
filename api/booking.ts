import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const data = req.body;

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'katrina.rozenbaha@gmail.com',
      subject: 'Jauns konsultācijas pieteikums',
      html: `
        <h2>Jauns pieteikums</h2>
        <p><b>Vārds:</b> ${data.fullName}</p>
        <p><b>E-pasts:</b> ${data.email}</p>
        <p><b>Tālrunis:</b> ${data.phone}</p>
        <p><b>Datums:</b> ${data.date}</p>
        <p><b>Laiks:</b> ${data.timeSlot}</p>
        <p><b>Komentārs:</b> ${data.message}</p>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ error });
  }
}
