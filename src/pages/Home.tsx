import Header from '../components/Header';
import React from 'react';
import Footer from '../components/Footer';
import PageLayout from '../components/PageLayout';
//import PersistentDrawerLeft from '../components/testMain';

function Home() {
  return (
    <>
      <Header></Header>
      <PageLayout></PageLayout>
      <Footer></Footer>
      {/* <PersistentDrawerLeft></PersistentDrawerLeft> */}
    </>
  );
}

export default Home;
