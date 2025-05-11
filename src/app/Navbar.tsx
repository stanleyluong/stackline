import React from 'react';
import logo from '../stackline_logo.svg'; // Assuming logo is in src/

// Define section IDs for navigation
export const SECTION_IDS = {
  PRODUCT_SUMMARY: 'product-summary',
  SALES_DATA: 'sales-data',
  PRODUCT_DETAILS: 'product-details',
  REVIEWS: 'reviews',
};

interface NavbarProps {
  // Add any props if needed, e.g., for active link highlighting if we implement that
}

const Navbar: React.FC<NavbarProps> = () => {
  // Basic smooth scroll for anchor links
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Stackline Logo" />
      </div>
      <ul className="navbar-links">
        <li>
          <a
            href={`#${SECTION_IDS.PRODUCT_SUMMARY}`}
            onClick={(e) => handleNavClick(e, SECTION_IDS.PRODUCT_SUMMARY)}
          >
            Product
          </a>
        </li>
        <li>
          <a
            href={`#${SECTION_IDS.SALES_DATA}`}
            onClick={(e) => handleNavClick(e, SECTION_IDS.SALES_DATA)}
          >
            Sales
          </a>
        </li>
        <li>
          <a
            href={`#${SECTION_IDS.PRODUCT_DETAILS}`}
            onClick={(e) => handleNavClick(e, SECTION_IDS.PRODUCT_DETAILS)}
          >
            Details
          </a>
        </li>
        <li>
          <a
            href={`#${SECTION_IDS.REVIEWS}`}
            onClick={(e) => handleNavClick(e, SECTION_IDS.REVIEWS)}
          >
            Reviews
          </a>
        </li>
      </ul>
      {/* Placeholder for a hamburger toggle on mobile if needed later */}
      {/* <button className="navbar-toggle">&#9776;</button> */}
    </nav>
  );
};

export default Navbar;
