'use client';
import type { ToastType } from '#/components/Toast';
import Toast from '#/components/Toast';
import { coerceToArrayBuffer, coerceToBase64Url } from '#/helpers/bytes';
import ApiService from '#/services/frontend/api.service';
import Image from 'next/image';
import { useRef, useState } from 'react';

const PasskeysPage = (props: {
  appUrl: string;
  passkeyId: string;
  orgId: string;
  userId: string;
  loginName: string;
  publicKeyCredentialCreationOptions: globalThis.PublicKeyCredentialCreationOptions;
}) => {
  const {
    appUrl,
    passkeyId,
    publicKeyCredentialCreationOptions,
    orgId,
    userId,
    loginName,
  } = props;
  const apiService = ApiService({ appUrl });
  const toastRef = useRef<ToastType>();

  const verifyPasskey = async () => {
    console.log('passkeyId', passkeyId);

    console.log(
      `debug:publicKeyCredentialCreationOptions`,
      publicKeyCredentialCreationOptions,
    );

    if (passkeyId && publicKeyCredentialCreationOptions) {
      try {
        publicKeyCredentialCreationOptions.publicKey.challenge =
          coerceToArrayBuffer(
            publicKeyCredentialCreationOptions.publicKey.challenge,
            'challenge',
          );

        publicKeyCredentialCreationOptions.publicKey.user.id =
          coerceToArrayBuffer(
            publicKeyCredentialCreationOptions.publicKey.user.id,
            'userid',
          );

        if (publicKeyCredentialCreationOptions.publicKey.excludeCredentials) {
          publicKeyCredentialCreationOptions.publicKey.excludeCredentials.map(
            (cred: any) => {
              cred.id = coerceToArrayBuffer(
                cred.id as string,
                'excludeCredentials.id',
              );
              return cred;
            },
          );
        }

        const credential = await navigator.credentials.create({
          publicKey: publicKeyCredentialCreationOptions.publicKey,
        });
        if (!credential) throw new Error('invalid credential');

        console.log('credential', credential);

        const attestationObject = (credential as any).response
          .attestationObject;
        const clientDataJSON = (credential as any).response.clientDataJSON;
        const rawId = (credential as any).rawId;

        const data = {
          id: credential.id,
          rawId: coerceToBase64Url(rawId, 'rawId'),
          type: credential.type,
          response: {
            attestationObject: coerceToBase64Url(
              attestationObject,
              'attestationObject',
            ),
            clientDataJSON: coerceToBase64Url(clientDataJSON, 'clientDataJSON'),
          },
        };

        const result = await apiService.request<any>({
          url: '/api/passkey/verify',
          method: 'post',
          data: {
            orgId,
            userId,
            passkeyId,
            credential: data,
          },
        });

        console.log('result', result);
      } catch (error) {
        console.log('debug', error);
      }
    }
  };

  const [username, setUsername] = useState<string>(loginName);

  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center align-middle">
      <div className="mb-[8px] ml-[30px] mr-[30px] flex h-full w-full flex-col justify-center rounded-md border-gray-300 lg:h-[484px] lg:w-[480px] lg:border lg:p-[80px]">
        <div className="flex flex-col items-center justify-center">
          <Image src="/images/company.png" alt="logo" width="125" height="47" />

          <h2 className="mb-[24px] mt-6 text-center text-3xl font-extrabold text-gray-900">
            👋 Welcome!
          </h2>
        </div>

        <div className="m-5 flex max-w-7xl flex-col lg:m-0">
          <input
            autoFocus
            name="username"
            required
            className="appearance-none rounded-[8px] relative block w-full px-3 py-2 mb-[24px] border border-gray-300 placeholder-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Username"
            value={username}
            disabled={false}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="my-4 ">
            <button
              onClick={async (e) => {
                e.preventDefault();
                verifyPasskey();
              }}
              type="button"
              className="disabled:bg-gray-300 group relative w-full flex justify-center py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </div>
      </div>

      <Toast ref={toastRef} />
    </div>
  );
};

export default PasskeysPage;
