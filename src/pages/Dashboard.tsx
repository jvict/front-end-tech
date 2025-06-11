import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      <h2>Evolução temporal da taxa de conversão</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          fetchData();
        }}
      >
        <label>
          Canal:
          <input value={origin} onChange={e => setOrigin(e.target.value)} />
        </label>
        <label>
          Data início:
          <input type="date" value={dateStart} onChange={e => setDateStart(e.target.value)} />
        </label>
        <label>
          Data fim:
          <input type="date" value={dateEnd} onChange={e => setDateEnd(e.target.value)} />
        </label>
        <button type="submit">Filtrar</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Canal</th>
            <th>Data</th>
            <th>Total</th>
            <th>Válidos</th>
            <th>Taxa de conversão (%)</th>
          </tr>
        </thead>
        <tbody>
          {data.map(d => (
            <tr key={d.origin + d.day}>
              <td>{d.origin}</td>
              <td>{d.day}</td>
              <td>{d.total}</td>
              <td>{d.valid}</td>
              <td>{d.conversion_rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}