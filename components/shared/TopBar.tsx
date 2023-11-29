'use client';

import { UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import Link from 'next/link';
import Image from 'next/image';

const TopBar = () => {
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo.png" alt="logo" height={28} width={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">ToDo App</p>
      </Link>
      <div className="flex items-center gap-1">
        <UserButton appearance={{ baseTheme: dark }} />
      </div>
    </nav>
  );
};

export default TopBar;