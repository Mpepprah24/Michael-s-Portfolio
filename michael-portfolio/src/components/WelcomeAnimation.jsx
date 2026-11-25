import { useEffect } from 'react';

const WELCOME_DURATION = 3000;

export default function WelcomeAnimation({ onComplete }) {
  useEffect(() => {
    const timeout = window.setTimeout(onComplete, WELCOME_DURATION);
    return () => window.clearTimeout(timeout);
  }, [onComplete]);

  return (
    <main className="welcome-screen" role="status" aria-live="polite">
      <h1 className="welcome-message">Hello! Welcome to my portfolio.</h1>
    </main>
  );
}
