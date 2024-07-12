'use client';

import { useState } from 'react';
import Link from 'next/link';

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className='relative'>
      <Link href='/qoe-reports' className='mr-4'>
        QoE Reports
      </Link>
      <Link className='mr-4' href='/consumption-reports'>
        Consumption Reports
      </Link>
      <div className='inline-block relative'>
        <button
          onClick={toggleDropdown}
          onBlur={closeDropdown}
          className='inline-flex items-center'
        >
          Server Reports
        </button>
        {dropdownOpen && (
          <div className='absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg'>
            <Link
              href='/m8-reports'
              className='block px-4 py-2 text-gray-800 hover:bg-gray-200'
            >
              M8 Information
            </Link>
            <Link
              href='/service-access-reports'
              className='block px-4 py-2 text-gray-800 hover:bg-gray-200'
            >
              Service Access Information
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
