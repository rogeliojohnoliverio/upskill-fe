import React, { FC, useEffect } from 'react';
import Layout from './components/Layout';
import SunAsterisk from './components/SunAsterisk';
import { useParams } from 'react-router-dom';
import useUser from '../utilities/hooks/useUser';
import moment from 'moment';
import {
  ArrowDownTrayIcon,
  CalendarIcon,
  EnvelopeIcon,
  HomeIcon,
  PhoneIcon,
  PrinterIcon,
} from '@heroicons/react/24/outline';
import { axios } from '../utilities/axios/axios';
import UserInformationLoading from './components/UserInformationLoading';

const UserInformation: FC = () => {
  const { id } = useParams();
  const { fetchUser, user, isLoading, isError } = useUser();
  useEffect(() => {
    if (id) fetchUser(parseInt(id));
  }, [id]);
  const handleClickDownload = async () => {
    const res = await axios.get(`/api/attachments/${user?.attachments[1].id}`);
    const anchorElement = document.createElement('a');
    anchorElement.href = res.data as string;
    anchorElement.download = 'QR_Code.svg';
    anchorElement.click();
    anchorElement.remove();
  };
  const handleClickPrint = () => {
    const popup = window.open();
    popup?.document.write(
      `<html><body style="display:flex; align-items: center; justify-content:center;"><img style="width:400px;" onload="window.print()" src="${user?.attachments[1].url}"/></body></html>`
    );
  };
  return (
    <Layout>
      <main className='flex items-center flex-col w-full mx-auto max-w-5xl justify-center'>
        <SunAsterisk />
        <p className='text-gray-600 font-semibold text-3xl mt-3 mb-3'>
          User Info
        </p>
        <div className='flex flex-row w-full align border-1 mx-auto shadow-md bg-white rounded-lg'>
          {isLoading || isError ? (
            <UserInformationLoading />
          ) : (
            <>
              <div className='py-20 px-32 w-full max-w-lg mx-auto'>
                <img
                  className='h-52 w-52 mb-6 object-cover rounded shadow-md'
                  src={user?.attachments[0].url}
                  alt='Profile Picture'
                />
                <div className='text-xl font-bold p-1.5'>{user?.name}</div>
                <div className='flex flex-row p-1.5'>
                  <HomeIcon className='w-6 h-6' />
                  <span className='pl-6'> {user?.address}</span>
                </div>
                <div className='flex flex-row p-1.5'>
                  <CalendarIcon className='w-6 h-6' />
                  <span className='pl-6'>
                    {moment(user?.birthdate).format('MMM DD, YYYY')}
                  </span>
                </div>
                <div className='text-xs font-semibold p-1.5'>
                  <span className='text-sun_asterisk'>CONTACT</span> INFORMATION
                </div>
                <div className='flex flex-row p-1.5'>
                  <EnvelopeIcon className='w-6 h-6' />
                  <span className='pl-6'>{user?.email}</span>
                </div>
                <div className='flex flex-row p-1.5'>
                  <PhoneIcon className='w-6 h-6' />
                  <span className='pl-6'>{user?.contact}</span>
                </div>
              </div>
              <div className='py-20 px-32 max-w-lg  mx-auto'>
                {user?.attachments && user.attachments.length > 1 ? (
                  <img
                    id='qr_code'
                    className='h-52 w-52 object-cover rounded shadow-md mb-6'
                    src={user?.attachments[1].url}
                    alt='QR code'
                  />
                ) : (
                  <img
                    id='qr_code'
                    src={'/images/qr-sample.png'}
                    className='h-52 w-52 object-cover rounded shadow-md mb-6'
                    alt='QR code'
                  />
                )}
                <button
                  onClick={handleClickDownload}
                  className='border-gray-700 border-2 hover:border-gray-500 rounded-md flex w-full items-center justify-center p-2 mt-6 text-sm space-x-2 '
                >
                  <ArrowDownTrayIcon className='w-5 h-5' />
                  <span className='text-gray-700'>Download QR Code</span>
                </button>
                <button
                  onClick={handleClickPrint}
                  className='bg-gray-700 border-2 text-white hover:border-gray-500 rounded-md flex w-full items-center justify-center p-2 mt-6 text-sm space-x-2 !'
                >
                  <PrinterIcon className='w-5 h-5' />
                  <span className='text-current'>Print QR Code</span>
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default UserInformation;
