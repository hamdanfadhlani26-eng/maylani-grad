"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import SplashScreen from "@/components/SplashScreen";
import InvitationPage from "@/components/InvitationPage";

function HomeContent() {
  const [opened, setOpened] = useState(false);
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || "Tamu Undangan";

  return (
    <>
      <SplashScreen guestName={guestName} onOpen={() => setOpened(true)} />
      {opened && <InvitationPage />}
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-navy-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-navy-400 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
