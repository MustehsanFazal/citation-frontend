import { useState } from 'react';

function App() {
  const [ecli, setEcli] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://citation-backend-ci6r.onrender.com/generate-citation?ecli=${encodeURIComponent(ecli)}`);
    

      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('❌ Fout bij ophalen:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Zoek uitspraak</h1>
      <input
        type="text"
        value={ecli}
        onChange={e => setEcli(e.target.value)}
        placeholder="Voer ECLI in"
        style={{ marginRight: 10 }}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Bezig...' : 'Zoeken'}
      </button>

      {data && (
        <div style={{ marginTop: 20 }}>
          <h2>Resultaat:</h2>
          <p><strong>Instantie:</strong> {data.instantie}</p>
          <p><strong>Datum uitspraak:</strong> {data.datum_uitspraak}</p>
          <p><strong>Datum publicatie:</strong> {data.datum_publicatie}</p>
          <p><strong>Zaaknummer:</strong> {data.zaaknummer}</p>
          <p><strong>Rechtsgebieden:</strong> {data.rechtsgebieden}</p>
          <p><strong>Inhoudsindicatie:</strong> {data.inhoudsindicatie}</p>
        </div>
      )}
    </div>
  );
}

export default App;
