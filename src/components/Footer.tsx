import React from "react";

const Footer = async () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-gray-800 py-12">
      <div className="flex-col content-frame">
        <div className="text-center text-sm text-gray-500">
          <p>© {currentYear} | All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
