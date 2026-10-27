import { SITE } from "../config";

export default function Footer() {
  const { phone, email, workHours, city, socials } = SITE.contacts;
  const { name, registration, unp, address } = SITE.legal;
  const hasLegal = Boolean(name || registration || unp || address);
  const socialList = [
    { href: socials.telegram, label: "Telegram" },
    { href: socials.instagram, label: "Instagram" },
    { href: socials.vk, label: "ВКонтакте" },
  ].filter((s) => s.href);

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__col">
          <h2 className="footer__title">{name || SITE.name}</h2>
          {hasLegal ? (
            <>
              {registration && <p>{registration}</p>}
              {unp && <p>УНП {unp}</p>}
              {address && <p>Юридический адрес: {address}</p>}
            </>
          ) : (
            <p className="muted">
              {SITE.title}, {SITE.method.toLowerCase()}
            </p>
          )}
        </div>

        <div className="footer__col">
          <h2 className="footer__title">Клиентам</h2>
          <a className="btn btn--ghost footer__pay" href={SITE.paymentUrl}>
            Оплатить
          </a>
          <ul className="footer__list">
            <li>
              <a href={SITE.privacyUrl}>Политика конфиденциальности и обработки персональных данных</a>
            </li>
            <li>
              <a href={SITE.offerUrl}>Договор оферты</a>
            </li>
            {SITE.paymentMethodsUrl && (
              <li>
                <a href={SITE.paymentMethodsUrl}>Методы оплаты</a>
              </li>
            )}
          </ul>
          {SITE.paymentLogos.length > 0 && (
            <ul className="footer__logos" aria-label="Способы оплаты">
              {SITE.paymentLogos.map((l) => (
                <li key={l.src}>
                  <img src={l.src} alt={l.alt} height={28} loading="lazy" />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="footer__col">
          <h2 className="footer__title">Контакты</h2>
          <ul className="footer__list">
            {phone && (
              <li>
                <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
              </li>
            )}
            {email && (
              <li>
                <a href={`mailto:${email}`}>{email}</a>
              </li>
            )}
            {city && <li>{city}</li>}
            {workHours && <li className="muted">Режим работы: {workHours}</li>}
          </ul>
          {socialList.length > 0 && (
            <ul className="footer__socials">
              {socialList.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
