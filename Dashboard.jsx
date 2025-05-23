import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const [keywords, setKeywords] = useState(['SIS', 'Prüm', 'API POLICE']);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (authenticated) {
      fetch('https://eu-dashboard-backend.onrender.com/api/matches')
        .then(res => res.json())
        .then(data => setMatches(data))
        .catch(err => console.error('Fehler beim Laden:', err));
    }
  }, [authenticated]);
    { date: '2.3. April 2025', group: 'IXIM', source: 'consilium.europa.eu' },
    { date: '21. März 2025', group: 'COM Prüm Expert Group', source: 'eur-lex.europaa.eu' },
    { date: '7. März 2025', group: 'CATS', source: 'eur lex.europa.eu' }
  ];

  const handleLogin = () => {
    if (username === 'philipp' && password === 'sicherespasswort') {
      setAuthenticated(true);
    } else {
      alert('Zugriff verweigert');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-xl w-96 space-y-4">
          <h1 className="text-white text-xl font-bold mb-4">Login</h1>
          <input
            className="w-full px-4 py-2 rounded bg-gray-700 text-white"
            placeholder="Benutzername"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="w-full px-4 py-2 rounded bg-gray-700 text-white"
            placeholder="Passwort"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button className="w-full" onClick={handleLogin}>Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold">🇨🇭 🇪🇺 EU Monitoring Dashboard</span>
        </div>
        <div className="relative">
          <img src="/avatar.jpg" alt="Philipp Rappo" className="h-10 w-10 rounded-full" />
          <span className="absolute -top-1 -right-1 bg-red-600 text-xs rounded-full px-2">3</span>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Nächste Sitzungen</h2>
            <p className="text-2xl">27. Juni 2025</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Schlüsselwort-Überwachung</h2>
            <div className="flex flex-wrap gap-2">
              {keywords.map((kw, i) => (
                <span key={i} className="bg-blue-700 px-3 py-1 rounded-full text-sm">{kw}</span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Übereinstimmende EU-Dokumente</h2>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="pb-2">Datum</th>
                  <th className="pb-2">Gruppe</th>
                  <th className="pb-2">Quelle</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((m, i) => (
                  <tr key={i} className="border-t border-gray-700">
                    <td className="py-2">{m.date}</td>
                    <td className="py-2">{m.group}</td>
                    <td className="py-2 text-blue-400 underline cursor-pointer">{m.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}