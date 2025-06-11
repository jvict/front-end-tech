import React from "react";
import "./EvolutionForm.css";

type EvolutionFormProps = {
  origin: string;
  dateStart: string;
  dateEnd: string;
  onOriginChange: (value: string) => void;
  onDateStartChange: (value: string) => void;
  onDateEndChange: (value: string) => void;
  onSubmit: () => void;
};

export function EvolutionForm({
  origin,
  dateStart,
  dateEnd,
  onOriginChange,
  onDateStartChange,
  onDateEndChange,
  onSubmit
}: EvolutionFormProps) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
      data-testid="filter-form"
      className="evolution-form"
    >
      <label>
        <span>Canal:</span>
        <input
          value={origin}
          onChange={e => onOriginChange(e.target.value)}
          data-testid="origin-input"
          placeholder="Ex: email, whatsapp"
        />
      </label>
      <label>
        <span>Data início:</span>
        <input
          type="date"
          value={dateStart}
          onChange={e => onDateStartChange(e.target.value)}
          data-testid="date-start-input"
        />
      </label>
      <label>
        <span>Data fim:</span>
        <input
          type="date"
          value={dateEnd}
          onChange={e => onDateEndChange(e.target.value)}
          data-testid="date-end-input"
        />
      </label>
      <button type="submit">🔎 Filtrar</button>
    </form>
  );
}