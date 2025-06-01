import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full py-8 mt-12">
      <div className="container mx-auto px-4">
        {/* Divider */}
        <div className="h-px bg-zinc-700 w-full my-6" />
        {/* Copyright and Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-zinc-400">
          <p>© 2025 Gamepocket. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="hover:text-zinc-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-zinc-300 transition-colors"
            >
              Terms of Use
            </Link>
            <Link
              href="/cookies"
              className="hover:text-zinc-300 transition-colors"
            >
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
