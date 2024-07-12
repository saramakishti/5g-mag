import { Inter } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import './globals.css';

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
            <nav>
              <Link href='/qoe-reports' className='mr-4'>
                QoE Reports
              </Link>
              <Link className='mr-4' href='/consumption-reports'>
                Consumption Reports
              </Link>
              <Link href='/m8-reports' className='mr-4'>
                M8 Reports
              </Link>
              <Link href='/service-access-reports'>Service Access Reports</Link>
            </nav>
          </header>
          <main className='p-4'>{children}</main>
        </div>
      </body>
    </html>
  );
}
