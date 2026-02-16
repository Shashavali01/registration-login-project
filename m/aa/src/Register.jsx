import React, { useState } from "react";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const submitbutton = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formsubmit = async (e) => {
    e.preventDefault();

    // ✅ frontend validation
    if (!data.name || !data.email || !data.password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:8085/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      // ✅ read backend response
      const result = await res.text();

      if (!res.ok) {
        alert("Registration failed: " + result);
        return;
      }

      alert("Registered successfully");
      console.log(result);

      // ✅ clear form after success
      setData({ name: "", email: "", password: "" });

    } catch (error) {
      console.error("Fetch error:", error);
      alert("Backend connection error");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Register Page</h1>

      <form onSubmit={formsubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={data.name}
          onChange={submitbutton}
        />
        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={data.email}
          onChange={submitbutton}
        />
        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={data.password}
          onChange={submitbutton}
        />
        <br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
