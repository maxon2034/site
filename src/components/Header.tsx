import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV, SITE } from "../config";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const close = () => setOpen(false);

  // Имя и рамка появляются, когда прокручено 50% главного экрана
  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("top");
      // На страницах без главного экрана шапка сразу полная
      setScrolled(hero ? window.scrollY > hero.offsetHeight * 0.5 : true);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <header className={`header${scrolled ? " is-scrolled" : ""}`}>
      <div className="header__inner">
        <Link to="/" className="header__brand" onClick={close}>
          {SITE.name}
        </Link>

        <button
          className="header__burger"
          aria-label="Меню"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>

        <nav className={`header__nav${open ? " is-open" : ""}`} aria-label="Основная навигация">
          {NAV.map((item) =>
            item.to.includes("#") ? (
              <Link key={item.to} to={item.to} onClick={close}>
                {item.label}
              </Link>
            ) : (
              <NavLink key={item.to} to={item.to} end onClick={close}>
                {item.label}
              </NavLink>
            )
          )}
          <a className="btn btn--ghost" href={SITE.paymentUrl} target="_blank" rel="noopener noreferrer">
            Оплатить
          </a>
        </nav>
      </div>
    </header>
  );
}
