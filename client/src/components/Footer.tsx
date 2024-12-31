import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 Juadeb Gabriel. All Rights Reserved</p>
      <div className="footer__links">
        {["About", "Privacy Policy", "Licensing", "Contact"].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase().replace(" ", "-")}`}
            className="footer_link"
          >
            {item}
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
