import { useState } from "react";
import { DIPLOMAS, type Diploma } from "../data/diplomas";

function Thumb({ d }: { d: Diploma }) {
  const [broken, setBroken] = useState(false);
  return (
    <a
      className="diploma__thumb"
      href={d.photo}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Открыть фото: ${d.title}`}
    >
      {broken ? (
        <span className="diploma__fallback">Открыть фото</span>
      ) : (
        <img
          src={d.thumb || d.photo}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setBroken(true)}
        />
      )}
    </a>
  );
}

export default function Diplomas() {
  return (
    <section className="section page">
      <div className="container">
        <h1 className="page__title">Образование</h1>
        <ul className="diplomas">
          {DIPLOMAS.map((d) => (
            <li key={d.photo} className="diploma">
              <div className="diploma__body">
                <h2 className="diploma__title">{d.title}</h2>
                {d.details.map(([label, value]) => (
                  <p key={label} className="diploma__row">
                    {label}: {value}
                  </p>
                ))}
              </div>
              <Thumb d={d} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
