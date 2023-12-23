import React, { useEffect, useState } from 'react';
import openSocket from 'socket.io-client';
import axios from 'axios';

const socket = openSocket('http://localhost:6001');

export const LiveVisitors = () => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    axios.get('http://geoplugin.net/json.gp').then((res) => {
      const {
        geoplugin_request,
        geoplugin_countryCode,
        geoplugin_city,
        geoplugin_region,
        geoplugin_countryName,
      } = res.data;

      const visitor = {
        ip: geoplugin_request,
        countryCode: geoplugin_countryCode,
        city: geoplugin_city,
        state: geoplugin_region,
        country: geoplugin_countryName,
      };

      socket.emit('new_visitor', visitor);
      
      socket.on("visitors", (receivedVisitors) => {
        console.log(receivedVisitors);
        setVisitors(receivedVisitors);
      });
    });

  }, [socket, axios]);


  return (
    <div>

{/**Navbar */}
<nav className="bg-slate-100 border-gray-400 dark:bg-gray-900 ">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/" >
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Live Visitors App</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
    </div>
  </div>
</nav>
{/** Table  */}

<div className="relative overflow-x-auto flex items-center justify-center mt-8">
<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Ip address
              </th>
              <th scope="col" className="px-6 py-3">
                City
              </th>
              <th scope="col" className="px-6 py-3">
                State
              </th>
              <th scope="col" className="px-6 py-3">
                Country
              </th>
            </tr>
          </thead>
          <tbody>{
            visitors.map((v, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {v.ip}
                  </th>
                  <td className="px-6 py-4">{v.city}</td>
                  <td className="px-6 py-4">{v.state}</td>
                  <td className="px-6 py-4">{v.country}</td>
                </tr>
              ))
            }</tbody>
        </table>
</div>
{/** */}

    </div>
  )
}
