import { useState } from "react";
import axios from "axios";

function App() {
  const [ecli, setEcli] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/scrape", { ecli });
      setResult(res.data);
    } catch (error) {
      alert("Fout bij ophalen data");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Zoek op ECLI</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={ecli}
          onChange={(e) => setEcli(e.target.value)}
          className="border p-2 w-full mb-4"
          placeholder="Voer ECLI in..."
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Zoek
        </button>
      </form>

      {result && (
        <div className="mt-6">
          <h2 className="font-semibold">Resultaat:</h2>
          <pre className="bg-gray-100 p-4 mt-2">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
