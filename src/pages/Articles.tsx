import { ARTICLES } from "../data/articles";

export default function Articles() {
  return (
    <section className="section page">
      <div className="container">
        <h1 className="page__title">Статьи</h1>
        {ARTICLES.length === 0 ? (
          <p className="muted">Статьи появятся здесь совсем скоро.</p>
        ) : (
          <ul className="cards">
            {ARTICLES.map((a) => (
              <li key={a.id} className="card">
                <time className="muted small" dateTime={a.date}>
                  {new Date(a.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
                </time>
                <h2 className="card__title">{a.title}</h2>
                <p>{a.excerpt}</p>
                {a.url && (
                  <a href={a.url} className="card__link">
                    Читать
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
