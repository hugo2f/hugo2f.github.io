import React, { useState, useEffect, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import FallbackSpinner from './pages/FallbackSpinner';
import NavBarWithRouter from './pages/NavBar';
import Home from './pages/Home';
import endpoints from './constants/endpoints';

function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="MainApp">
      <NavBarWithRouter />
      <main className="main">
        <Routes>
          <Suspense fallback={<FallbackSpinner />}>
            <Route exact path="/" component={Home} />
            {data
              && data.sections.map((route) => {
                const SectionComponent = React.lazy(() => import('./pages/' + route.page));
                return (
                  <Route
                    key={route.headerTitle}
                    path={route.path}
                    component={() => (
                      <SectionComponent style={{ marginTop: '80px' }} header={route.headerTitle} />
                    )}
                  />
                );
              })}
          </Suspense>
        </Routes>
      </main>
    </div>
  );
}

export default MainApp;
