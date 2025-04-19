import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <header style={{ padding: "1rem", background: "#eee" }}>
      <h1>MySite 🚀</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
    </header>
  );
}