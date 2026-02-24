import React from "react";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 bottom-0 fixed">
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by ABHIMVP Industries Ltd</p>
  </aside>
</footer>
  );
};

export default Footer;
