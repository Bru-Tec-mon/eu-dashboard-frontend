import React from 'react';
import { useState, useEffect } from 'react';
function Card({ children, className = '', style = {} }) {
  return (
    <div
      style={{
        background: '#222',
        borderRadius: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        padding: 16,
        marginBottom: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function CardContent({ children, className = '', style = {} }) {
  return <div style={{ ...style }}>{children}</div>;
}

function Button({ children, className = '', style = {}, ...props }) {
  return (
    <button
      style={{
        background: '#2563eb',
        color: 'white',
        padding: '8px 16px',
        borderRadius: 6,
        border: 'none',
        cursor: 'pointer',
        fontSize: 16,
        width: style.width,
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}

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

  const handleLogin = () => {
    if (username === 'philipp' && password === 'sicherespasswort') {
      setAuthenticated(true);
    } else {
      alert('Zugriff verweigert');
    }
  };

  if (!authenticated) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#18181b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            background: '#222',
            padding: 32,
            borderRadius: 16,
            width: 384,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <h1 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Login</h1>
          <input
            style={{
              width: '100%',
              padding: '8px 16px',
              borderRadius: 6,
              background: '#333',
              color: 'white',
              border: '1px solid #444',
              marginBottom: 0,
              fontSize: 16,
            }}
            placeholder="Benutzername"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            style={{
              width: '100%',
              padding: '8px 16px',
              borderRadius: 6,
              background: '#333',
              color: 'white',
              border: '1px solid #444',
              marginBottom: 0,
              fontSize: 16,
            }}
            placeholder="Passwort"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button style={{ width: '100%' }} onClick={handleLogin}>Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#18181b',
        color: 'white',
        padding: 24,
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22, fontWeight: 'bold' }}>🇨🇭 🇪🇺 EU Monitoring Dashboard</span>
        </div>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img
            src="/avatar.jpg"
            alt="Philipp Rappo"
            style={{
              height: 40,
              width: 40,
              borderRadius: '50%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <span
            style={{
              position: 'absolute',
              top: -8,
              right: -8,
              background: '#dc2626',
              color: 'white',
              fontSize: 12,
              borderRadius: 12,
              padding: '2px 8px',
              fontWeight: 600,
              lineHeight: 1,
            }}
          >
            3
          </span>
        </div>
      </header>

      <main
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 24,
        }}
      >
        <Card>
          <CardContent>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Nächste Sitzungen</h2>
            <p style={{ fontSize: 26, margin: 0 }}>27. Juni 2025</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Schlüsselwort-Überwachung</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {keywords.map((kw, i) => (
                <span
                  key={i}
                  style={{
                    background: '#1d4ed8',
                    padding: '4px 12px',
                    borderRadius: 999,
                    fontSize: 14,
                    color: 'white',
                    display: 'inline-block',
                  }}
                >
                  {kw}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card
          style={{
            gridColumn: '1 / -1',
          }}
        >
          <CardContent>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Übereinstimmende EU-Dokumente</h2>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ paddingBottom: 8 }}>Datum</th>
                  <th style={{ paddingBottom: 8 }}>Gruppe</th>
                  <th style={{ paddingBottom: 8 }}>Quelle</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((m, i) => (
                  <tr key={i} style={{ borderTop: '1px solid #374151' }}>
                    <td style={{ padding: '8px 0' }}>{m.date}</td>
                    <td style={{ padding: '8px 0' }}>{m.group}</td>
                    <td
                      style={{
                        padding: '8px 0',
                        color: '#60a5fa',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                    >
                      {m.source}
                    </td>
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