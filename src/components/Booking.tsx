import { useState, type FormEvent } from "react";
import { SITE, type Service } from "../config";
import ServiceSelect from "./ServiceSelect";

type Status = "idle" | "sending" | "sent" | "error";

export default function Booking() {
  const [service, setService] = useState<Service | "">("");
  const [status, setStatus] = useState<Status>("idle");
  const [serviceError, setServiceError] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!service) {
      setServiceError(true);
      return;
    }
    const data = new FormData(form);
    if (data.get("_gotcha")) return; // защита от ботов
    data.set("service", service);

    setStatus("sending");
    try {
      if (!SITE.formEndpoint) throw new Error("VITE_FORM_ENDPOINT не задан");
      const res = await fetch(SITE.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
      setService("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="section" id="booking">
      <div className="container booking">
        <div className="booking__intro">
          <h2>Записаться на консультацию</h2>
          <p className="muted">
            Оставьте заявку, и я свяжусь с вами, чтобы договориться о времени. Рассказывать подробности сейчас не обязательно.
          </p>
        </div>

        {status === "sent" ? (
          <div className="booking__done" role="status">
            <h3>Спасибо, заявка отправлена</h3>
            <p>Я отвечу вам в ближайшее время на указанный e-mail или телефон.</p>
          </div>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            <label className="field">
              <span>Имя *</span>
              <input name="name" type="text" required autoComplete="given-name" />
            </label>

            <div className="form__row">
              <label className="field">
                <span>E-mail *</span>
                <input name="email" type="email" required autoComplete="email" />
              </label>
              <label className="field">
                <span>Мобильный телефон *</span>
                <input name="phone" type="tel" required autoComplete="tel" />
              </label>
            </div>

            <div className="field">
              <span>Какой формат работы вам подходит *</span>
              <ServiceSelect
                value={service}
                onChange={(v) => {
                  setService(v);
                  setServiceError(false);
                }}
              />
              {serviceError && <em className="field__error">Выберите, пожалуйста, формат</em>}
            </div>

            <label className="field">
              <span>По какому вопросу вы хотите обратиться? *</span>
              <textarea name="message" rows={3} required />
            </label>

            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hp" aria-hidden />

            <label className="check">
              <input type="checkbox" name="consent" required />
              <span>
                Я ознакомился(лась) с <a href={SITE.privacyUrl}>политикой конфиденциальности</a> и{" "}
                <a href={SITE.offerUrl}>публичным договором</a> *
              </span>
            </label>

            <button className="btn btn--primary" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Отправляем…" : "Записаться на консультацию"}
            </button>

            {status === "error" && (
              <p className="field__error" role="alert">
                Не получилось отправить заявку. Попробуйте ещё раз чуть позже.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
