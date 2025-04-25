import { Link } from "@remix-run/react";

//Header for each site
export default function Header() {
  return (
    <header style={{ padding: "1rem"}}>
        <h1>Shopping List</h1>
        <div className="buttons">
            <Link to="/">
                <button className="blue">Home</button>
            </Link>
            <Link to="/add">
                <button className="green">Add Item</button>
            </Link>
        </div>
    </header>
  );
}