'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { RegisterParams } from '../Register';

type RegisterFormForm = {
  loading: boolean;
  handleRegisterForm: (params: RegisterParams) => Promise<void>;
};

const RegisterFormForm: React.FC<RegisterFormForm> = (props) => {
  const { handleRegisterForm, loading } = props;
  const [givenName, setGivenName] = useState<string>('givenName');
  const [familyName, setFamilyName] = useState<string>('familyName');
  const [email, setEmail] = useState<string>(`test.${Date.now()}@yopmail.com`);
  const [password, setPassword] = useState<string>('Qwerty@123');
  const [confirmPassword, setConfirmPassword] = useState<string>('Qwerty@123');
  const [hidePwd, setHidePwd] = useState<boolean>(false); //true

  return (
    <div className="my-4 ">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          handleRegisterForm({
            familyName,
            givenName,
            email,
            password,
          });
        }}
      >
        <div className="rounded-md shadow-sm space-y-px">
          <div>
            <input
              autoFocus
              required
              className="appearance-none rounded-[8px] relative block w-full px-3 py-2 mb-[24px] border border-gray-300 placeholder-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              name="givenName"
              placeholder="Given name"
              value={givenName}
              onChange={(e) => setGivenName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <input
              autoFocus
              required
              className="appearance-none rounded-[8px] relative block w-full px-3 py-2 mb-[24px] border border-gray-300 placeholder-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              name="familyName"
              placeholder="Family name"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <input
              autoFocus
              required
              className="appearance-none rounded-[8px] relative block w-full px-3 py-2 mb-[24px] border border-gray-300 placeholder-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={hidePwd ? 'password' : 'text'}
              required
              className="appearance-none mb-[24px] rounded-[8px] relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-300 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Image
              src={`/images/${hidePwd ? 'eye' : 'eye-off'}.png`}
              alt="logo"
              width={20}
              height={20}
              onClick={() => setHidePwd(!hidePwd)}
              className="absolute right-4 z-10 top-2 hover:cursor-pointer"
            />
          </div>

          <div className="relative">
            <input
              required
              className="appearance-none mb-[24px] rounded-[8px] relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-300 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Password confirmation"
              // type={hidePwd ? 'password' : 'text'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />

            <Image
              src={`/images/${hidePwd ? 'eye' : 'eye-off'}.png`} //TODO Update
              onClick={() => setHidePwd(!hidePwd)} //TODO Update
              alt="logo"
              width={20}
              height={20}
              className="absolute right-4 z-10 top-2 hover:cursor-pointer"
            />
          </div>
        </div>

        <button
          type="submit"
          className="disabled:bg-gray-300 group relative w-full flex justify-center py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Loading...' : 'Log in'}
        </button>
      </form>
    </div>
  );
};

export default RegisterFormForm;
