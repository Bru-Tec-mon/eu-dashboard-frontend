import React from 'react';

export default function Dashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'philipp' && password === 'sicherespasswort') {
      setAuthenticated(true);
    } else {
      alert('Falsche Zugangsdaten');
    }
  };

  if (!authenticated) {
    return (
      <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
        <h2>Login</h2>
        <input placeholder="Benutzername" value={username} onChange={e => setUsername(e.target.value)} />
        <br /><br />
        <input type="password" placeholder="Passwort" value={password} onChange={e => setPassword(e.target.value)} />
        <br /><br />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h2>Willkommen, Philipp!</h2>
      <p>Dein Dashboard ist erfolgreich online 🎉</p>
    </div>
  );
}