import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const isContactForm = data.serviceId === 'kontaktforma' || !data.date;

    const subject = isContactForm
      ? `Jauna ziņa no kontaktformas (${data.fullName})`
      : `Jauns konsultācijas pieteikums (${data.fullName})`;

    const htmlContent = isContactForm
      ? `
        <h2>Jauna ziņa no kontaktformas</h2>
        <p><b>Vārds, uzvārds:</b> ${data.fullName || 'Nav norādīts'}</p>
        <p><b>E-pasts:</b> ${data.email || 'Nav norādīts'}</p>
        <p><b>Tālrunis:</b> ${data.phone || 'Nav norādīts'}</p>
        <p><b>Ziņa / Jautājums:</b></p>
        <div style="background-color: #f4f4f4; padding: 12px; border-radius: 6px; margin-top: 8px;">
          ${data.message || 'Tukša ziņa'}
        </div>
      `
      : `
        <h2>Jauns konsultācijas pieteikums</h2>
        <p><b>Vārds, uzvārds:</b> ${data.fullName || 'Nav norādīts'}</p>
        <p><b>E-pasts:</b> ${data.email || 'Nav norādīts'}</p>
        <p><b>Tālrunis:</b> ${data.phone || 'Nav norādīts'}</p>
        <p><b>Pakalpojums:</b> ${data.serviceName || data.serviceId || 'Nav norādīts'}</p>
        <p><b>Formāts:</b> ${data.format || 'Nav norādīts'}</p>
        <p><b>Datums:</b> ${data.date || 'Nav norādīts'}</p>
        <p><b>Laiks:</b> ${data.timeSlot || 'Nav norādīts'}</p>
        <p><b>Komentārs:</b> ${data.message || 'Nav norādīts'}</p>
      `;

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'katrina.rozenbaha@gmail.com',
      replyTo: data.email, // Ļaus atbildēt tieši klientam, nospiežot "Reply" e-pastā
      subject: subject,
      html: htmlContent,
    });

    return Response.json({ success: true });

  } catch (error: any) {
    console.error('Resend Kļūda:', error);

    return Response.json(
      { error: error?.message || 'Email sending failed' },
      { status: 500 }
    );
  }
}
