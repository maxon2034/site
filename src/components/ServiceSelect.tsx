import { useEffect, useRef, useState } from "react";
import { SERVICES, type Service } from "../config";

interface Props {
  value: Service | "";
  onChange: (v: Service) => void;
}

export default function ServiceSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="select" ref={ref}>
      <button
        type="button"
        className={`select__btn${value ? " has-value" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {value || "Выберите формат"}
        <span className="select__chevron" aria-hidden />
      </button>
      {open && (
        <ul className="select__list" role="listbox">
          {SERVICES.map((s) => (
            <li
              key={s}
              role="option"
              aria-selected={s === value}
              tabIndex={0}
              onClick={() => {
                onChange(s);
                setOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onChange(s);
                  setOpen(false);
                }
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
