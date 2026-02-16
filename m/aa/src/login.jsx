import React, { useState } from "react";

function Login() {
  const [data, setData] = useState({
    name: "",
    password: ""
  });

  const handleChange = (e) => {
    setData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const formsubmit = async (e) => {
    e.preventDefault();

    // ✅ frontend validation
    if (!data.name.trim() || !data.password.trim()) {
      alert("All fields required");
      return;
    }

    try {
      const res = await fetch("http://localhost:8085/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: data.name.trim(),
          password: data.password.trim()
        })
      });

      const result = await res.text();

      if (res.status === 200) {
        alert("Login Successful");
        console.log(result);
        // 🔁 later you can redirect here
        // navigate("/home");
      } else {
        alert(result); // shows backend message
      }

    } catch (err) {
      console.error("Fetch error:", err);
      alert("Backend connection error");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login</h1>

      <form onSubmit={formsubmit}>
        <input
          type="text"
          name="name"
          placeholder="Username or Email"
          value={data.name}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
