const weddingDate = new Date("2027-07-25T14:00:00+02:00");

function daysUntilWedding() {
  const now = new Date();
  return Math.max(0, Math.ceil((weddingDate.getTime() - now.getTime()) / 86_400_000));
}

export default function Home() {
  const days = daysUntilWedding();
  return (
    <main>
      <section className="hero shell">
        <div className="floral floralTopLeft" aria-hidden="true">✦ ❀ ❧</div>
        <div className="floral floralTopRight" aria-hidden="true">❧ ❀ ✦</div>
        <p className="eyebrow">SAVE THE DATE</p>
        <h1><span>Oona</span><em>&amp;</em><span>Wes</span></h1>
        <p className="inviteLine">are getting married</p>
        <div className="date">25 July 2027</div>
        <div className="rule" />
        <p className="venue">Time &amp; venue to be announced</p>
        <p className="note">We would love for you to celebrate with us.</p>
        <a className="primary" href="/oona-wes-25-july-2027.ics">Add to calendar</a>
        <div className="countdown" aria-label={`${days} days until the wedding`}>
          <strong>{days}</strong>
          <span>days to go</span>
        </div>
        <div className="floral floralBottomLeft" aria-hidden="true">❀ ❧ ✦</div>
        <div className="floral floralBottomRight" aria-hidden="true">✦ ❧ ❀</div>
      </section>

      <section className="future shell">
        <p className="eyebrow">MORE TO COME</p>
        <h2>Wedding details will live here.</h2>
        <p>Travel, schedule, venue information, registry details and RSVP will be added as plans are finalized.</p>
        <div className="futureLinks">
          <span>Travel</span><span>Schedule</span><span>Registry</span><a href="/rsvp">RSVP</a>
        </div>
      </section>
    </main>
  );
}
