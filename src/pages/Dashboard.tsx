import React, { useEffect, useState } from "react";
import axios from "axios";
import { EvolutionForm } from "../components/EvolutionForm";

import "./Dashboard.css";
import { EvolutionBarChart } from "../components/EvolutionTable";

type Evolution = {
  origin: string;
  day: string;
  total: number;
  valid: number;
  conversion_rate: number;
};

const URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export function Dashboard() {
  const [data, setData] = useState<Evolution[]>([]);
  const [origin, setOrigin] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  function fetchData() {
    axios
      .get(`${URL}/evolution`, {
        params: { origin, dateStart, dateEnd }
      })
      .then((res) => setData(res.data));
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <main className="dashboard-main">
      <div className="dashboard-header">
        <h2>Evolução Temporal da <span>Taxa de Conversão</span></h2>
        <p>
          Visualize de forma rápida e colorida a conversão dos canais ao longo do tempo.<br />
          Use os filtros para refinar sua análise!
        </p>
      </div>
      <EvolutionForm
        origin={origin}
        dateStart={dateStart}
        dateEnd={dateEnd}
        onOriginChange={setOrigin}
        onDateStartChange={setDateStart}
        onDateEndChange={setDateEnd}
        onSubmit={fetchData}
      />
      <EvolutionBarChart data={data} />
    </main>
  );
}