import {
  FaChartLine,
  FaChartBar,
  FaServer,
  FaInfoCircle,
} from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-10'>
      <h2 className='text-3xl font-semibold mb-4 text-blue-600'>
        Welcome to the 5G Media Streaming Dashboard
      </h2>
      <p className='text-lg mb-4'>
        QoE Metrics and Consumption Reports use mocked data for visualization
        purposes. Meanwhile, M8 Information and Service Access Information are
        connected to a mock Express server for detailed and realistic data
        access.
      </p>
      <hr className='mb-4' />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='bg-gray-100 p-4 rounded shadow hover:bg-gray-200'>
          <Link href='/qoe-reports' className='flex items-center'>
            <FaChartLine className='text-blue-600 text-2xl mr-2' />
            <span className='text-lg font-semibold text-blue-600'>
              QoE Metrics
            </span>
          </Link>
          <p className='text-sm text-gray-600 mt-2'>
            View Quality of Experience (QoE) metrics to understand the
            performance and quality of the media streaming.
          </p>
        </div>
        <div className='bg-gray-100 p-4 rounded shadow hover:bg-gray-200'>
          <Link href='/consumption-reports' className='flex items-center'>
            <FaChartBar className='text-blue-600 text-2xl mr-2' />
            <span className='text-lg font-semibold text-blue-600'>
              Consumption Reports
            </span>
          </Link>
          <p className='text-sm text-gray-600 mt-2'>
            Analyze consumption reports to gain insights into user engagement
            and media consumption patterns.
          </p>
        </div>
        <div className='bg-gray-100 p-4 rounded shadow hover:bg-gray-200'>
          <Link href='/m8-reports' className='flex items-center'>
            <FaServer className='text-blue-600 text-2xl mr-2' />
            <span className='text-lg font-semibold text-blue-600'>
              M8 Information
            </span>
          </Link>
          <p className='text-sm text-gray-600 mt-2'>
            Access M8 information connected to our mock Express server for
            detailed service data.
          </p>
        </div>
        <div className='bg-gray-100 p-4 rounded shadow hover:bg-gray-200'>
          <Link href='/service-access-reports' className='flex items-center'>
            <FaInfoCircle className='text-blue-600 text-2xl mr-2' />
            <span className='text-lg font-semibold text-blue-600'>
              Service Access Information
            </span>
          </Link>
          <p className='text-sm text-gray-600 mt-2'>
            Get detailed service access information provided by our mock Express
            server for deeper analysis.
          </p>
        </div>
      </div>
    </div>
  );
}
