import { useState } from "react";
import { DIPLOMAS, type Diploma } from "../data/diplomas";

export default function Diplomas() {
  const [active, setActive] = useState<Diploma | null>(null);

  return (
    <section className="section page">
      <div className="container">
        <h1 className="page__title">Дипломы и сертификаты</h1>
        {DIPLOMAS.length === 0 ? (
          <p className="muted">Документы об образовании будут добавлены здесь.</p>
        ) : (
          <ul className="gallery">
            {DIPLOMAS.map((d) => (
              <li key={d.id}>
                <button className="gallery__item" onClick={() => setActive(d)} aria-label={`Открыть: ${d.title}`}>
                  <img src={d.image} alt={d.title} loading="lazy" />
                  <span>{d.title}</span>
                  <span className="muted small">
                    {d.institution}, {d.year}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {active && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={active.title} onClick={() => setActive(null)}>
          <img src={active.image} alt={active.title} />
          <button className="lightbox__close" aria-label="Закрыть">
            ×
          </button>
        </div>
      )}
    </section>
  );
}
