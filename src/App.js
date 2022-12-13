import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Register from './screen/Register';
import Login from './screen/Login';
import Navbar from './screen/Navbar';
import Drugs from './screen/Drugs';
import SingleDrug from './screen/SingleDrug';
import Accounting from './screen/Accounting';
import SingleAccount from './screen/SingleAccount';
import Deficiency from './screen/Deficiency';
import ExpirationList from './screen/ExpirationList';
import SellPage from './screen/SellPage';
import SingleSell from './screen/SingleSell';
import Withdraw from './screen/Withdraw';
import Profile from './screen/Profile';
import AddDeficiency from './screen/AddDeficiency';
import Error from './screen/Error';
import LandingPage from './screen/LandingPage';
import Footer from './screen/Footer';
import Users from './screen/Users';
import UpdateDeficiency from './screen/UpdateDeficiency';
import UpdateDrug from './screen/UpdateDrug';
import { UserContext } from './context/AppContext';
import { useEffect, useMemo, useState } from 'react';
function App() {
  const data = localStorage.getItem('AuthUser')
    ? JSON.parse(localStorage.getItem('AuthUser'))
    : null;

  const [value, setValue] = useState(data);

  const memoValue = useMemo(() => ({ value, setValue }), [value, setValue]);

  useEffect(() => {
    window.addEventListener('beforeunload', function (e) {
      this.localStorage.clear();
    });

    return () => {};
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={memoValue}>
        <Navbar />

        <Routes>
          {value ? (
            <>
              <Route element={<Drugs />} path="/drugs" />
              <Route element={<Accounting />} path="/accounting" />
              <Route element={<SellPage />} path="/sellDrugPage" />
              <Route element={<SingleSell />} path="/singleSellDrug/:id" />
              <Route element={<Withdraw />} path="/withdraw" />
              <Route element={<Deficiency />} path="/deficiency" />
              <Route element={<AddDeficiency />} path="/addDeficiency" />
              <Route
                element={<UpdateDeficiency />}
                path="/updateDeficiency/:id"
              />

              <Route element={<ExpirationList />} path="/expirationList" />
              <Route element={<SingleDrug />} path="/singleDrug" />
              <Route element={<UpdateDrug />} path="/singleDrug/:id" />

              <Route element={<Profile />} path="/profile" />
              <Route element={<Users />} path="/users" />
              <Route element={<SingleAccount />} path="/singleAccount" />
              <Route element={<Drugs />} path="/login" />
              <Route element={<Drugs />} path="/register" />
              <Route element={<Error />} path="/*" />
            </>
          ) : (
            <>
              <Route element={<Login />} path="/login" />
              <Route element={<Register />} path="/register" />

              <Route element={<LandingPage />} path="/" />
              <Route element={<Login />} path="/*" />
            </>
          )}
        </Routes>
      </UserContext.Provider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
