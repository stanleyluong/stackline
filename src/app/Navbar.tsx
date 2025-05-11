import React, { useState } from 'react';
import logo from '../stackline_logo.svg'; // Assuming logo is in src/

// MUI Components
import MenuIcon from '@mui/icons-material/Menu'; // Default Menu Icon
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton'; // For Menu Icon
import Menu from '@mui/material/Menu'; // For Mobile Menu
import MenuItem from '@mui/material/MenuItem'; // For Mobile Menu items
import { styled } from '@mui/material/styles'; // For custom styled components if needed
import Toolbar from '@mui/material/Toolbar';

// Define section IDs for navigation
export const SECTION_IDS = {
  PRODUCT_SUMMARY: 'product-summary',
  SALES_DATA: 'sales-data',
  PRODUCT_DETAILS: 'product-details',
  REVIEWS: 'reviews',
};

const NavLinks = [
  { label: 'Product', sectionId: SECTION_IDS.PRODUCT_SUMMARY },
  { label: 'Sales', sectionId: SECTION_IDS.SALES_DATA },
  { label: 'Details', sectionId: SECTION_IDS.PRODUCT_DETAILS },
  { label: 'Reviews', sectionId: SECTION_IDS.REVIEWS },
];

// Styled img tag for logo to control its size within AppBar
const LogoImg = styled('img')(({ theme }) => ({
  width: '40px',
  height: '40px',
  marginRight: theme.spacing(1.5), // Corresponds to 0.75rem if theme.spacing(1) is 8px
  [theme.breakpoints.up('sm')]: {
    width: '50px',
    height: '50px',
    marginRight: theme.spacing(2), // Corresponds to 1rem
  },
}));

const Navbar: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLElement>, // Changed type to HTMLElement for MenuItem and Button
    sectionId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    handleCloseNavMenu(); // Close mobile menu after click
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#052849', // From .navbar
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // From .navbar
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LogoImg src={logo} alt="Stackline Logo" />
          {/* If you want "Stackline" text next to logo, add Typography here */}
        </Box>
        <Box
          sx={{ display: { xs: 'none', md: 'flex' }, gap: { xs: 0.5, sm: 1 } }}
        >
          {NavLinks.map((link) => (
            <Button
              key={link.label}
              color="inherit" // Inherits AppBar's text color (should be white/light)
              onClick={(e) => handleNavClick(e, link.sectionId)}
              href={`#${link.sectionId}`} // Keep for context, but click is handled
              sx={{
                color: '#e0e0e0', // from .navbar-links a
                padding: { xs: '0.5rem 0.75rem', sm: '0.5rem 1rem' },
                fontSize: { xs: '0.9rem', sm: '1rem' },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', // from .navbar-links a:hover
                  color: '#ffffff',
                },
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>
        {/* Mobile Navigation Menu Icon and Menu */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="navigation menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {NavLinks.map((link) => (
              <MenuItem
                key={link.label}
                onClick={(e) => handleNavClick(e, link.sectionId)}
              >
                {/* <Typography textAlign="center">{link.label}</Typography> */}
                {/* Using Button for consistency, or just text with sx if preferred */}
                <Button
                  component="a"
                  href={`#${link.sectionId}`}
                  sx={{
                    color: 'inherit',
                    textDecoration: 'none',
                    width: '100%',
                    justifyContent: 'flex-start',
                  }}
                >
                  {link.label}
                </Button>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
