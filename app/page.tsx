const weddingDate = new Date("2027-07-25T14:00:00+02:00");

function daysUntilWedding() {
  const now = new Date();
  return Math.max(0, Math.ceil((weddingDate.getTime() - now.getTime()) / 86_400_000));
}

function Botanical({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 320 320" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M44 280C74 219 109 168 165 116C204 80 244 54 285 37" strokeWidth="2.5" />
        <path d="M82 224c-33 0-48-25-48-25 33-8 53 3 63 19" strokeWidth="1.8" />
        <path d="M119 174c-31-7-40-35-40-35 34-2 50 13 56 31" strokeWidth="1.8" />
        <path d="M159 132c-20-23-12-51-12-51 28 16 33 38 25 57" strokeWidth="1.8" />
        <path d="M207 89c-9-30 10-52 10-52 18 28 12 50-4 64" strokeWidth="1.8" />
        <path d="M246 62c15-28 44-29 44-29-9 31-28 44-47 40" strokeWidth="1.8" />
        <circle cx="61" cy="255" r="10" strokeWidth="1.8" />
        <circle cx="96" cy="207" r="7" strokeWidth="1.8" />
      </g>
    </svg>
  );
}

export default function Home() {
  const days = daysUntilWedding();

  return (
    <main className="page">
      <section className="saveDateCard" aria-labelledby="couple-name">
        <Botanical className="botanical botanicalTopLeft" />
        <Botanical className="botanical botanicalBottomRight" />
        <div className="wash washOne" />
        <div className="wash washTwo" />

        <div className="cardFrame" />

        <div className="heroContent">
          <p className="kicker">Save the date</p>
          <p className="smallScript">for the wedding of</p>
          <h1 id="couple-name">
            <span>Oona</span>
            <em>&amp;</em>
            <span>Wes</span>
          </h1>

          <div className="dateLockup" aria-label="25 July 2027">
            <span className="dateDay">25</span>
            <span className="dateMonth">July</span>
            <span className="dateYear">2027</span>
          </div>

          <div className="fineRule"><span>✦</span></div>

          <p className="details">Time &amp; venue to be announced</p>
          <p className="message">We would love for you to celebrate with us.</p>

          <a className="calendarButton" href="/oona-wes-25-july-2027.ics">
            Add to calendar
          </a>

          <div className="countdown" aria-label={`${days} days until the wedding`}>
            <span className="countNumber">{days}</span>
            <span className="countLabel">days to go</span>
          </div>

          <p className="formalInvite">Formal invitation to follow</p>
        </div>
      </section>

      <section className="sitePreview" aria-label="Future wedding website sections">
        <div>
          <p className="kicker">Oona &amp; Wes</p>
          <h2>This is only the beginning.</h2>
          <p>
            Wedding weekend details, travel, schedule, registry and RSVP will appear here as plans are finalized.
          </p>
        </div>
        <nav className="previewNav" aria-label="Future site navigation">
          <span>Our Wedding</span>
          <span>Travel</span>
          <span>Schedule</span>
          <span>FAQ</span>
          <span>Registry</span>
          <a href="/rsvp">RSVP</a>
        </nav>
      </section>
    </main>
  );
}
