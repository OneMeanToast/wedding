const weddingDate = new Date("2027-07-25T14:00:00+02:00");

function daysUntilWedding() {
  const now = new Date();
  return Math.max(0, Math.ceil((weddingDate.getTime() - now.getTime()) / 86_400_000));
}

function FloralCluster({ className, flip = false }: { className: string; flip?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 420 420" aria-hidden="true">
      <g transform={flip ? "translate(420 0) scale(-1 1)" : undefined}>
        <path d="M-18 346C70 288 118 221 172 156C221 97 286 47 382 6" fill="none" stroke="currentColor" strokeWidth="2" opacity=".5" />
        <path d="M36 319C55 275 80 249 116 226C103 268 75 301 36 319Z" fill="currentColor" opacity=".72" />
        <path d="M88 260C106 218 132 191 170 169C157 211 128 244 88 260Z" fill="currentColor" opacity=".52" />
        <path d="M145 199C145 156 161 120 192 90C195 134 178 172 145 199Z" fill="currentColor" opacity=".62" />
        <path d="M216 126C225 88 248 57 284 34C281 73 257 108 216 126Z" fill="currentColor" opacity=".45" />
        <path d="M269 83C306 51 343 39 384 43C352 74 315 89 269 83Z" fill="currentColor" opacity=".6" />

        <g transform="translate(52 63)">
          <circle cx="82" cy="86" r="58" fill="#f5e5d7" opacity=".95" />
          <path d="M82 29C94 50 118 51 137 68C116 78 115 103 94 119C85 97 58 99 43 82C62 70 63 46 82 29Z" fill="#bb704e" opacity=".9" />
          <path d="M82 47C91 62 107 63 121 75C106 82 105 98 91 109C84 94 66 95 56 83C69 75 69 59 82 47Z" fill="#e0aa8f" />
          <circle cx="83" cy="79" r="12" fill="#7f442f" />
        </g>

        <g transform="translate(168 205)">
          <circle cx="68" cy="66" r="46" fill="#f4eadf" opacity=".98" />
          <path d="M68 20C81 39 102 41 113 57C93 64 94 86 78 103C68 84 47 87 31 72C49 61 49 39 68 20Z" fill="#d49b78" opacity=".92" />
          <path d="M69 35C78 48 91 49 99 59C86 64 86 77 76 88C69 76 56 78 46 68C57 61 57 48 69 35Z" fill="#f3d8c8" />
          <circle cx="69" cy="62" r="9" fill="#9c5b3e" />
        </g>

        <g fill="#9b573d" opacity=".65">
          <circle cx="238" cy="154" r="8" /><circle cx="258" cy="140" r="6" /><circle cx="276" cy="157" r="7" />
          <circle cx="109" cy="350" r="6" /><circle cx="127" cy="338" r="5" /><circle cx="143" cy="352" r="7" />
        </g>
      </g>
    </svg>
  );
}

function GoldSprig() {
  return (
    <svg className="goldSprig" viewBox="0 0 170 45" aria-hidden="true">
      <path d="M7 26C39 25 57 19 82 7C108 20 128 25 163 26" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M30 22c-9-11-18-8-18-8 7 10 12 12 18 8Zm18-5c-6-12-15-11-15-11 4 11 9 14 15 11Zm73 0c6-12 15-11 15-11-4 11-9 14-15 11Zm18 5c9-11 18-8 18-8-7 10-12 12-18 8Z" fill="currentColor" opacity=".8" />
    </svg>
  );
}

export default function Home() {
  const days = daysUntilWedding();

  return (
    <main className="page">
      <section className="saveDateCard" aria-labelledby="couple-name">
        <FloralCluster className="floralCluster floralTopLeft" />
        <FloralCluster className="floralCluster floralTopRight" flip />
        <FloralCluster className="floralCluster floralBottomLeft" flip />
        <FloralCluster className="floralCluster floralBottomRight" />

        <div className="cardFrame" />
        <div className="heroContent">
          <GoldSprig />
          <p className="smallScript introLine">Together with their loved ones</p>
          <p className="kicker">Save the date</p>

          <h1 id="couple-name">
            <span>Oona</span>
            <em>&amp;</em>
            <span>Wes</span>
          </h1>

          <p className="smallScript celebrationLine">are getting married</p>

          <div className="dateLockup" aria-label="25 July 2027">
            <span className="dateDay">25</span>
            <span className="dateMonth">July</span>
            <span className="dateYear">2027</span>
          </div>

          <div className="fineRule"><span>◆</span></div>
          <p className="details">Time &amp; venue to be announced</p>
          <p className="message">We cannot wait to celebrate with you.</p>
        </div>

        <section className="terracottaPanel" aria-label="Save the date actions">
          <div className="panelOrnament">❧</div>
          <p className="panelKicker">Countdown to the day</p>
          <div className="countdown" aria-label={`${days} days until the wedding`}>
            <span className="countNumber">{days}</span>
            <span className="countLabel">days to go</span>
          </div>
          <a className="calendarButton" href="/oona-wes-25-july-2027.ics">Add to calendar</a>
          <p className="formalInvite">Formal invitation and RSVP to follow</p>
        </section>
      </section>

      <section className="sitePreview" aria-label="Future wedding website sections">
        <div>
          <p className="kicker">Oona &amp; Wes</p>
          <h2>This is only the beginning.</h2>
          <p>Wedding weekend details, travel, schedule, registry and RSVP will appear here as plans are finalized.</p>
        </div>
        <nav className="previewNav" aria-label="Future site navigation">
          <span>Our Wedding</span><span>Travel</span><span>Schedule</span><span>FAQ</span><span>Registry</span><a href="/rsvp">RSVP</a>
        </nav>
      </section>
    </main>
  );
}
