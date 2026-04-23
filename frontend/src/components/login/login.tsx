import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const response = await fetch("http://localhost:8000/api/login/", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await response.json();
    console.log("LOGIN:", data);

    if (response.ok) {
      navigate("/main");
    } else {
      alert(JSON.stringify(data));
    }
  }

  return (
    <div>
      <h2>Вход</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;