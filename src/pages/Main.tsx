import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useIdToken } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../features/translation/translationSlice';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PageLayout from '../components/PageLayout';
import { Loading } from '../components/Loading';

function Main() {
  const t = useSelector(selectTranslations);
  const auth = getAuth();
  const [user, loading] = useIdToken(auth);

  if (loading) {
    return <Loading text={null} fullHeight={true} />;
  }

  if (!user) {
    return (
      <>
        <Loading text={t.auth.redirecting} fullHeight={true} />
        <Navigate to="/" replace />
      </>
    );
  }

  return (
    <>
      <Header></Header>
      <PageLayout></PageLayout>
      <Footer />
    </>
  );
}

export default Main;
