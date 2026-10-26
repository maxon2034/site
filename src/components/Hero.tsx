import { SITE } from "../config";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden />
      <div className="hero__inner">
        <div className="hero__photo">
          <img src="/olga.jpg" alt={`${SITE.title} ${SITE.name}`} width={853} height={1280} />
        </div>
        <div className="hero__text">
          <p className="hero__kicker">
            {SITE.title} {SITE.name}
          </p>
          <blockquote className="hero__quote">
            <p className="hero__quote-main">
              «Я не могу изменить то, что произошло в прошлом, но я могу изменить то, как я живу с этим прямо сейчас»
            </p>
            <p className="hero__credo">
              Жизнь — это путь, на котором случается то, к чему мы не были готовы. С уважением и живым интересом, вместе с
              вами я бережно ищу дорогу к новому качеству вашей жизни.
            </p>
          </blockquote>
          <h1 className="visually-hidden">
            {SITE.title} {SITE.name}, {SITE.method.toLowerCase()}
          </h1>
        </div>
      </div>
    </section>
  );
}
