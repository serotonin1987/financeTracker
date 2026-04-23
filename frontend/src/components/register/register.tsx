import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password1", password1);
    formData.append("password2", password2);

    try {
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        navigate("/main");
      } else {
        alert(JSON.stringify(data));
      }
    } catch (error) {
      console.log(error);
      alert("Ошибка сервера");
    }
  }

  return (
    <div>
      <h2>Регистрация</h2>

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
          autoComplete="new-password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
        />

        <input
          type="password"
          placeholder="repeat password"
          autoComplete="new-password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />

        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default Register;
