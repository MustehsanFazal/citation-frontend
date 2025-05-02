import { useState } from "react"

export default function CitationGenerator() {
  const [ecli, setEcli] = useState("")
  const [citation, setCitation] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    setCitation("")

    try {
      const response = await fetch("https://citation-api-theta.vercel.app/api/generate-citation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ecli }),
      })

      const data = await response.json()
      if (data.citation) {
        setCitation(data.citation)
      } else {
        setCitation("Geen geldige uitspraak gevonden voor deze ECLI.")
      }
    } catch (err) {
      setCitation("Er is een fout opgetreden bij het genereren van de citatie.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h1>Juridische Citatie Generator</h1>
      <input
        placeholder="Bijv. ECLI:NL:HR:2016:162"
        value={ecli}
        onChange={(e) => setEcli(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button onClick={handleGenerate} disabled={loading || !ecli}>
        {loading ? "Bezig..." : "Genereer Citatie"}
      </button>
      {citation && (
        <div style={{ marginTop: '1rem', backgroundColor: '#f0f0f0', padding: '1rem' }}>
          <strong>Gegenereerde citatie:</strong>
          <p>{citation}</p>
        </div>
      )}
    </div>
  )
}
