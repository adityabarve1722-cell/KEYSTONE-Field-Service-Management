import { useState } from "react";

interface LoginPageProps {
  onLogin: () => void;
}

function LoginPage({ onLogin }: LoginPageProps) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault();

    try {

     const response = await fetch("https://keystone-field-service-management-production-61aa.up.railway.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      const data = await response.json();

      if (data.token) {

        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);

        setMessage("Login successful!");

        onLogin();

      } else {

        setMessage("Invalid username or password");

      }

    } catch (error) {

      console.error(error);
      setMessage("Unable to connect to server");

    }
  };

  return (
    <div
      style={{
        width: "350px",
        margin: "100px auto",
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "10px"
      }}
    >

      <h2>KEYSTONE Login</h2>

      <form onSubmit={handleLogin}>

        <div style={{ marginBottom: "15px" }}>

          <label>Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px"
            }}
          />

        </div>

        <div style={{ marginBottom: "15px" }}>

          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px"
            }}
          />

        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px"
          }}
        >
          Login
        </button>

      </form>

      {message && (
        <p style={{ marginTop: "15px" }}>
          {message}
        </p>
      )}

    </div>
  );
}

export default LoginPage;