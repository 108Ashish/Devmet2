import React from "react";
import "../styles/mainStyles.css";
import "../styles/layoutStyles.css";
import ParticlesEffect from "../components/ParticlesEffect";

export default function BaseLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ParticlesEffect />
        {children}
      </body>
    </html>
  );
}
