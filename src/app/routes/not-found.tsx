import { NavLink } from "react-router-dom";

export function NotFound() {
  return (
    <div className="text-center pt-12">
      <h1 className="text-7xl font-bold mb-4">404</h1>
      <p>
        Page does not exist. <br /> Go to{" "}
        <NavLink to="/" className="underline">
          homepage
        </NavLink>{" "}
        instead.
      </p>
    </div>
  );
}
