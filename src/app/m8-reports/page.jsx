'use client';
import { useEffect, useState } from 'react';

const M8Reports = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3003/m8/m8.json')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className='text-center text-gray-500'>Loading...</p>;
  }

  if (!data) {
    return <p className='text-center text-red-500'>Error loading data.</p>;
  }

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white rounded shadow-lg'>
      <h1 className='text-2xl font-bold mb-5 text-blue-600 text-center'>
        M8 Information
      </h1>
      <h2 className='text-lg font-semibold mb-2'>
        Base URL: <span className='text-gray-700'>{data.m5BaseUrl}</span>
      </h2>
      <h2 className='text-lg font-semibold mb-2'>Services:</h2>
      <ul className='space-y-4'>
        {data.serviceList.map((service) => (
          <li
            key={service.provisioningSessionId}
            className='bg-gray-100 p-4 rounded shadow'
          >
            <div className='font-semibold text-gray-900'>
              {service.name}{' '}
              <span className='text-sm text-gray-600'>
                (Session ID: {service.provisioningSessionId})
              </span>
            </div>
            {service.entryPoints && (
              <ul className='mt-2 space-y-2'>
                {service.entryPoints.map((entry, index) => (
                  <li key={index} className='border-t pt-2'>
                    <p>
                      <span className='font-semibold text-gray-800'>
                        Locator:
                      </span>
                      <a
                        href={entry.locator}
                        className='text-blue-500 hover:underline ml-2 break-words'
                      >
                        {entry.locator}
                      </a>
                    </p>
                    <p>
                      <span className='font-semibold text-gray-800'>
                        Content Type:
                      </span>
                      <span className='ml-2 text-gray-700'>
                        {entry.contentType}
                      </span>
                    </p>
                    {entry.profiles && (
                      <p>
                        <span className='font-semibold text-gray-800'>
                          Profiles:
                        </span>
                        <span className='ml-2 text-gray-700'>
                          {entry.profiles.join(', ')}
                        </span>
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default M8Reports;
