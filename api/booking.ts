import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'katrina.rozenbaha@gmail.com',
      subject: 'Jauns konsultācijas pieteikums',
      html: `
        <h2>Jauns konsultācijas pieteikums</h2>
        
        <p><b>Vārds:</b> ${data.fullName}</p>
        <p><b>E-pasts:</b> ${data.email}</p>
        <p><b>Tālrunis:</b> ${data.phone}</p>
        <p><b>Pakalpojums:</b> ${data.serviceName || data.serviceId}</p>
        <p><b>Formāts:</b> ${data.format}</p>
        <p><b>Datums:</b> ${data.date}</p>
        <p><b>Laiks:</b> ${data.timeSlot}</p>
        <p><b>Komentārs:</b> ${data.message || 'Nav norādīts'}</p>
      `,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: 'Email sending failed' },
      { status: 500 }
    );
  }
}
