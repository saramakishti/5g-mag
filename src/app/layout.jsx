import { Inter } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import './globals.css';
import NavBar from '@/components/navbar/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '5G - MAG',
  description: 'A user interface for metrics and consumption reports',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='min-h-screen bg-gray-100'>
          <header className='bg-blue-600 text-white p-4 flex justify-between items-center'>
            <div className='flex gap-5 items-center'>
              <Image
                src='/assets/logo.png'
                alt='5G MAG'
                width={40}
                height={40}
              />
              <Link className='text-xl' href='/'>
                5G MAG
              </Link>
            </div>
            <NavBar />
          </header>
          <main className='p-4'>{children}</main>
        </div>
      </body>
    </html>
  );
}
