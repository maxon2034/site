import { ARTICLES } from "../data/articles";

export default function Articles() {
  return (
    <section className="section page">
      <div className="container">
        <h1 className="page__title">Статьи</h1>
        <ul className="articles">
          {ARTICLES.map((a) => {
            const title = a.title || "Читать статью";
            return (
              <li key={a.url}>
                <a className="article" href={a.url} target="_blank" rel="noopener noreferrer">
                  {a.image ? (
                    <img className="article__img" src={a.image} alt="" loading="lazy" />
                  ) : (
                    <span className="article__img article__img--empty" aria-hidden />
                  )}
                  <span className="article__title">{title}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
