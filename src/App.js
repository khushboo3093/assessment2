import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  const [result, setResult] = useState([]);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
      );
      setLoading(false);
      setResult(res.data);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const prev = () => {
    if (result.previous) setOffset((p) => p - 1);
  };
  const next = () => {
    if (result.next) setOffset((p) => p + 1);
  };

  useEffect(() => {
    getData();
  }, [limit, offset]); // eslint-disable-line

  return (
    <div className="App">
      <ul>
        {result?.results?.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <select
          value={limit}
          onChange={({ target }) => setLimit(target.value)}
          disabled={loading}
        >
          <option>10</option>
          <option>20</option>
          <option>40</option>
          <option>50</option>
        </select>

        <div>
          <button
            type="button"
            onClick={prev}
            disabled={!result.previous || loading}
          >
            prev
          </button>

          <button
            type="button"
            onClick={next}
            disabled={!result.next || loading}
          >
            next
          </button>
        </div>
      </div>
      {loading && (
        <div className="loader">
          <i className="fa fa-spinner fa-spin" style={{ color: "#fff" }} />
        </div>
      )}
    </div>
  );
}
