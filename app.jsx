const { useState } = React;

const MOCK_PLAN = {
  transport: [
    "Flight Warsaw (WAW) → Barcelona (BCN), ~2h 30min",
    "Recommended airlines: Ryanair, Wizz Air, LOT",
    "Local transport: metro T1/T2 lines cover most attractions",
    "Barcelona Card recommended for unlimited metro rides",
  ],
  accommodation: [
    "Eixample district — central, walkable, good metro access",
    "Budget pick: Generator Hostel Barcelona (~€30/night)",
    "Mid-range: Hotel Praktik Rambla (~€90/night)",
    "Tip: book at least 4 weeks ahead for July stays",
  ],
  attractions: [
    "Day 1 — Sagrada Família + Gràcia neighbourhood",
    "Day 2 — Park Güell + Camp Nou tour",
    "Day 3 — Gothic Quarter + Barceloneta Beach",
    "Day 4 — Casa Batlló + Passeig de Gràcia shopping",
    "Day 5 — Montjuïc castle + Poble Sec food scene",
  ],
};

function PlanSection({ title, items }) {
  return (
    <div className="section">
      <h2>{title}</h2>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [prompt, setPrompt] = useState("");
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleGenerate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setPlan(null);
    setTimeout(() => {
      setPlan(MOCK_PLAN);
      setLoading(false);
    }, 1000);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleGenerate();
  }

  return (
    <div className="app">
      <h1>Travel Planner</h1>
      <div className="input-row">
        <input
          type="text"
          placeholder='e.g. "Trip to Barcelona, 5 days, from Warsaw, July"'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleGenerate} disabled={loading || !prompt.trim()}>
          {loading ? "Generating…" : "Generate Plan"}
        </button>
      </div>

      {loading && <p className="loading">Generating your travel plan…</p>}

      {plan && (
        <div className="results">
          <PlanSection title="Transport" items={plan.transport} />
          <PlanSection title="Accommodation" items={plan.accommodation} />
          <PlanSection title="Attractions" items={plan.attractions} />
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
