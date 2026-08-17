import Countdown from "./countdown";

function GoldSprig() {
  return (
    <svg className="goldSprig" viewBox="0 0 220 54" aria-hidden="true">
      <path d="M12 28C52 26 73 20 105 7C139 21 164 27 208 28" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M39 24c-11-13-22-9-22-9 8 12 15 15 22 9Zm24-7c-8-14-19-12-19-12 5 13 11 16 19 12Zm94 0c8-14 19-12 19-12-5 13-11 16-19 12Zm24 7c11-13 22-9 22-9-8 12-15 15-22 9Z" fill="currentColor" opacity=".82" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="page">
      <section className="saveDateCard" aria-labelledby="couple-name">
        <div className="paperGlow" />
        <div className="goldFrame" />
        <div className="goldFrameInner" />

        <img src="/luxe-floral-left.svg" alt="" aria-hidden="true" className="watercolor floralLeft floralFloatOne" />
        <img src="/luxe-floral-left.svg" alt="" aria-hidden="true" className="watercolor floralRight floralFloatTwo" />
        <img src="/luxe-floral-corner.svg" alt="" aria-hidden="true" className="watercolor cornerBottomLeft floralFloatThree" />
        <img src="/luxe-floral-corner.svg" alt="" aria-hidden="true" className="watercolor cornerBottomRight floralFloatOne" />

        <span className="petal petalOne" aria-hidden="true" />
        <span className="petal petalTwo" aria-hidden="true" />
        <span className="petal petalThree" aria-hidden="true" />
        <span className="goldDust dustOne" aria-hidden="true" />
        <span className="goldDust dustTwo" aria-hidden="true" />

        <div className="heroContent">
          <div className="monogram" aria-hidden="true"><span>O</span><em>&amp;</em><span>W</span></div>
          <p className="kicker">Save the Date</p>
          <GoldSprig />
          <p className="smallScript introLine">Together with their loved ones</p>

          <h1 id="couple-name" className="names">
            <span>Oona</span>
            <em>&amp;</em>
            <span>Wes</span>
          </h1>

          <p className="celebrationLine">joyfully invite you to celebrate their wedding</p>

          <div className="dateFeature" aria-label="Sunday 25 July 2027">
            <span className="weekday">Sunday</span>
            <span className="day">25</span>
            <span className="monthYear">July 2027</span>
          </div>

          <div className="fineRule"><span>◆</span></div>
          <p className="details"><span>Time</span> All TBD <b>•</b> <span>Venue</span> TBD</p>
          <p className="formalInvite">Formal invitation to follow</p>
        </div>

        <section className="terracottaPanel" aria-label="Save the date actions">
          <div className="panelCrest">OW</div>
          <p className="panelKicker">Countdown to the day</p>
          <Countdown />
          <a className="calendarButton" href="/oona-wes-25-july-2027.ics">
            <span className="calendarIcon" aria-hidden="true">▣</span>
            Add to Calendar
            <span aria-hidden="true">→</span>
          </a>
          <p className="panelNote">No response needed yet — RSVP will open with the formal invitation.</p>
        </section>
      </section>

      <section className="sitePreview" aria-label="Future wedding website sections">
        <div className="tornNote">
          <p className="kicker">More to Come</p>
          <h2>Our wedding website will grow from here.</h2>
          <p>Travel details, accommodations, schedule, registry, FAQ and RSVP will appear here as plans are finalized.</p>
          <GoldSprig />
        </div>
        <nav className="previewNav" aria-label="Future site navigation">
          <span>Our Story</span><span>Travel</span><span>Schedule</span><span>FAQ</span><span>Registry</span><a href="/rsvp">RSVP</a>
        </nav>
      </section>
    </main>
  );
}
