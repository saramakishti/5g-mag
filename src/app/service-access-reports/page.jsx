'use client';
import React, { useState } from 'react';

const ServiceAccessReports = () => {
  const [data, setData] = useState(null);
  const [provisioningSessionID, setProvisioningSessionID] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setProvisioningSessionID(e.target.value);
  };

  const fetchData = () => {
    setLoading(true);
    setError(null);

    fetch(
      `http://localhost:3003/3gpp-m5/v2/service-access-information/${provisioningSessionID}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      });
  };

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white rounded shadow-lg'>
      <h1 className='text-2xl font-bold mb-4 text-blue-600 text-center'>
        Service Access Information
      </h1>
      <div className='mb-4'>
        <label
          htmlFor='provisioningSessionID'
          className='block text-sm font-medium text-gray-700'
        >
          Provisioning Session ID
        </label>
        <input
          type='number'
          id='provisioningSessionID'
          value={provisioningSessionID}
          onChange={handleInputChange}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
        />
        <button
          onClick={fetchData}
          className='mt-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Fetch Data
        </button>
      </div>
      <div>
        {loading && <p className='text-center text-gray-500'>Loading...</p>}
        {error && <p className='text-center text-red-500'>{error}</p>}
        {data && (
          <div className='space-y-4'>
            <div className='bg-gray-100 p-4 rounded shadow'>
              <h2 className='text-lg font-semibold'>
                Provisioning Session ID: {data.provisioningSessionId}
              </h2>
              <p className='text-gray-700'>
                Provisioning Session Type: {data.provisioningSessionType}
              </p>
            </div>
            <div className='bg-gray-100 p-4 rounded shadow'>
              <h2 className='text-lg font-semibold mb-2'>Streaming Access</h2>
              {data.streamingAccess.entryPoints.map((entry, index) => (
                <div key={index} className='mt-2'>
                  <p>
                    <span className='font-semibold'>Locator:</span>{' '}
                    <a
                      href={entry.locator}
                      className='text-blue-500 hover:underline break-words'
                    >
                      {entry.locator}
                    </a>
                  </p>
                  <p>
                    <span className='font-semibold'>Content Type:</span>{' '}
                    <span className='text-gray-700'>{entry.contentType}</span>
                  </p>
                  <p>
                    <span className='font-semibold'>Profiles:</span>{' '}
                    <span className='text-gray-700'>
                      {entry.profiles.join(', ')}
                    </span>
                  </p>
                </div>
              ))}
            </div>
            <div className='bg-gray-100 p-4 rounded shadow'>
              <h2 className='text-lg font-semibold mb-2'>
                Client Consumption Reporting Configuration
              </h2>
              <p>
                <span className='font-semibold'>Server Addresses:</span>
              </p>
              <ul className='list-disc list-inside'>
                {data.clientConsumptionReportingConfiguration.serverAddresses.map(
                  (address, index) => (
                    <li key={index} className='break-words'>
                      {address}
                    </li>
                  )
                )}
              </ul>
              <p>
                <span className='font-semibold'>Location Reporting:</span>{' '}
                <span className='text-gray-700'>
                  {data.clientConsumptionReportingConfiguration
                    .locationReporting
                    ? 'Enabled'
                    : 'Disabled'}
                </span>
              </p>
              <p>
                <span className='font-semibold'>Sample Percentage:</span>{' '}
                <span className='text-gray-700'>
                  {
                    data.clientConsumptionReportingConfiguration
                      .samplePercentage
                  }
                  %
                </span>
              </p>
              <p>
                <span className='font-semibold'>Reporting Interval:</span>{' '}
                <span className='text-gray-700'>
                  {
                    data.clientConsumptionReportingConfiguration
                      .reportingInterval
                  }{' '}
                  seconds
                </span>
              </p>
              <p>
                <span className='font-semibold'>Access Reporting:</span>{' '}
                <span className='text-gray-700'>
                  {data.clientConsumptionReportingConfiguration.accessReporting
                    ? 'Enabled'
                    : 'Disabled'}
                </span>
              </p>
            </div>
            <div className='bg-gray-100 p-4 rounded shadow'>
              <h2 className='text-lg font-semibold mb-2'>
                Client Metrics Reporting Configurations
              </h2>
              {data.clientMetricsReportingConfigurations.map(
                (config, index) => (
                  <div key={index} className='mt-2'>
                    <h3 className='font-semibold'>
                      Configuration ID: {config.metricsReportingConfigurationId}
                    </h3>
                    <p>
                      <span className='font-semibold'>Server Addresses:</span>
                    </p>
                    <ul className='list-disc list-inside'>
                      {config.serverAddresses.map((address, addrIndex) => (
                        <li key={addrIndex} className='break-words'>
                          {address}
                        </li>
                      ))}
                    </ul>
                    <p>
                      <span className='font-semibold'>Scheme:</span>{' '}
                      <span className='text-gray-700'>{config.scheme}</span>
                    </p>
                    <p>
                      <span className='font-semibold'>Reporting Interval:</span>{' '}
                      <span className='text-gray-700'>
                        {config.reportingInterval} seconds
                      </span>
                    </p>
                    <p>
                      <span className='font-semibold'>Sample Percentage:</span>{' '}
                      <span className='text-gray-700'>
                        {config.samplePercentage}%
                      </span>
                    </p>
                    <p>
                      <span className='font-semibold'>Sampling Period:</span>{' '}
                      <span className='text-gray-700'>
                        {config.samplingPeriod} seconds
                      </span>
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceAccessReports;
