import React from 'react';
import configuration from '#/configuration';
import Home from '#/ui/Home/Home';
import { ROUTING } from '#/lib/router';
import { redirect } from 'next/navigation';
import { getCurrentSessions } from '#/services/backend/zitadel.service';

export default async function Page({
  params: { index },
}: {
  params: { index: number };
}) {
  const sessions = await getCurrentSessions();
  if (!sessions[index]) redirect(ROUTING.LOGIN);

  return (
    <Home
      appUrl={configuration.appUrl}
      activeSession={sessions[index]}
      sessions={sessions}
      index={index}
    />
  );
}
