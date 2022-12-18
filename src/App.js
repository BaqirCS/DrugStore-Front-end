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
import { useContext } from 'react';
import { Store } from './context/Store';

function App() {
  const { state } = useContext(Store);
  return (
    <BrowserRouter>
      {state.userInfo ? (
        <>
          <Navbar />

          <Routes>
            <Route element={<Drugs />} path="/drugs" />
            <Route element={<Drugs />} path="/" />
            <Route element={<UpdateDrug />} path="/singleDrug/:id" />
            <Route element={<SingleDrug />} path="/singleDrug" />

            <Route element={<Accounting />} path="/accounting" />
            <Route element={<SingleAccount />} path="/singleAccount" />
            <Route element={<SellPage />} path="/sellDrugPage" />
            <Route element={<SingleSell />} path="/singleSellDrug/:id" />

            <Route element={<Withdraw />} path="/withdraw" />
            <Route element={<ExpirationList />} path="/expirationList" />

            <Route element={<Deficiency />} path="/deficiency" />
            <Route
              element={<UpdateDeficiency />}
              path="/updateDeficiency/:id"
            />
            <Route element={<AddDeficiency />} path="/addDeficiency" />

            <Route element={<Profile />} path="/profile" />
            <Route element={<Users />} path="/users" />
            <Route element={<Error />} path="/*" />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route element={<Register />} path="/register" />
          <Route element={<LandingPage />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<Login />} path="/*" />
        </Routes>
      )}

      <Footer />
    </BrowserRouter>
  );
}

export default App;
