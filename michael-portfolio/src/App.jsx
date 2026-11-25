import { useCallback, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import NotFound from './pages/NotFound';
import LoadingEffect from './components/LoadingEffect';
import WelcomeAnimation from './components/WelcomeAnimation';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const finishLoading = useCallback(() => setIsLoaded(true), []);
  const finishWelcome = useCallback(() => setHasWelcomed(true), []);

  if (!isLoaded) {
    return <LoadingEffect onComplete={finishLoading} />;
  }

  if (!hasWelcomed) {
    return <WelcomeAnimation onComplete={finishWelcome} />;
  }

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;