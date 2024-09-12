import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type AuthenticationLayoutProps = {
  title: string;
  children: ReactNode;
};

export function AuthenticationLayout({
  title,
  children,
}: AuthenticationLayoutProps) {
  return (
    <div className="max-w-xl mx-auto my-16 px-4 space-y-8">
      <NavLink to="/">
        <h1 className="font-extrabold text-3xl uppercase text-center">
          Pasuyo
        </h1>
      </NavLink>
      <h2 className="font-semibold text-xl">{title}</h2>
      {children}
    </div>
  );
}
