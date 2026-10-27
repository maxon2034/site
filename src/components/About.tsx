import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const TOPICS = [
  "Тревога и страхи",
  "Панические атаки",
  "Депрессия",
  "Утрата и горе",
  "Самооценка и границы",
  "Кризисы",
  "Развод",
  "Эмоциональная зависимость",
  "Отношения с партнёром",
  "Отношения с ребёнком, родителями, коллегами",
  "Подростки",
];

const SPECIALIZATIONS = [
  "Психология семейных отношений",
  "Гештальт-терапия семьи",
  "Женское здоровье и психосоматика",
  "Эмоциональная зависимость",
  "Работа с личностными расстройствами в гештальт-подходе",
  "Терапия инцеста: травма, насилие и путь к исцелению",
];

export default function About() {
  const stickyRef = useRef<HTMLDivElement>(null);

  // Левый блок «висит» строго по центру видимой области (под шапкой), какой бы высоты он ни был
  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;
    const update = () => {
      const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 56;
      const free = window.innerHeight - headerH;
      if (el.offsetHeight > free - 48) {
        el.style.position = "static"; // блок выше экрана: не закрепляем
        return;
      }
      el.style.position = "";
      el.style.top = `${headerH + (free - el.offsetHeight) / 2}px`;
    };
    update();
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, []);

  return (
    <section className="section section--sand" id="about">
      <div className="container about">
        <div className="about__side">
          <div className="about__sticky" ref={stickyRef}>
            <h2>Обо мне</h2>
            <ul className="facts">
            <li>Психолог, специализация: психология семейных отношений</li>
            <li>Аккредитованный гештальт-терапевт, член ЕАГТ (Европейской ассоциации гештальт-терапии)</li>
            <li>Супервизор</li>
            <li>Более 600 часов личной терапии</li>
            <li>Более 200 часов индивидуальной супервизии</li>
            <li>Продолжаю учиться: гештальт-институт, семинары, конференции</li>
            </ul>
          </div>
        </div>

        <div className="about__body">
          <p className="about__lead">
            Здравствуйте! Я практикующий психолог. В профессию влюбилась сразу и продолжаю любить.
          </p>
          <p>
            Я могу быть полезна, если вы хотите снизить тревогу, найти опору, когда всё рушится, услышать свой внутренний
            голос, улучшить отношения с близкими или принять сложное решение.
          </p>
          <p>
            Я не даю универсальных советов. Мы вместе создаём новый, здоровый опыт отношений: сначала на сессиях, а затем
            и в вашей жизни. Со мной не страшно плакать, злиться, молчать или не знать, что делать. Я остаюсь рядом в
            самые тяжёлые моменты и помогаю вырастить внутреннюю опору.
          </p>
          <p>
            На семейных встречах мы ищем выход из ссор, обвинений и недоверия, слышим нужды друг друга под слоем претензий
            и учимся выдерживать различия. Так в отношениях появляется больше воздуха и безопасной близости.
          </p>

          <div className="about__cols">
            <div>
              <h3>С кем я работаю</h3>
              <ul className="plain">
                <li>Индивидуально</li>
                <li>С парами и семьями</li>
              </ul>
            </div>
            <div>
              <h3>Формат</h3>
              <ul className="plain">
                <li>Очно в Минске</li>
                <li>Онлайн по всему миру</li>
              </ul>
            </div>
          </div>

          <h3>С чем я работаю</h3>
          <ul className="tags">
            {TOPICS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <h3>Специализации</h3>
          <ul className="plain">
            {SPECIALIZATIONS.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <p>
            В работе я опираюсь на конфиденциальность, уважение к вашему опыту, ясные границы, эмпатию и безусловное
            принятие.
          </p>

          <p className="about__links">
            <Link className="btn btn--ghost" to="/articles">Читать статьи</Link>
            <Link className="btn btn--ghost" to="/diplomas">Дипломы и образование</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
