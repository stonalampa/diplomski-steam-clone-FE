import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LandingPage } from '../components/UserComponents/LandingPage';
import { SignIn } from '../components/UserComponents/SignIn';
import { SignUp } from '../components/UserComponents/SignUp';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <div className='App'>
      <Helmet>
        <title>Steam clone</title>
        <meta name='description' content='Steam clone school project.' />
      </Helmet>
      <BrowserRouter>
        <Routes>
          {/* User routes */}
          <Route path='/' element={<LandingPage />} />
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/user' element={<SignUp />} />
          {/* Dodaj ovde sad jos za opcije */}

          {/* Admin routes */}
          <Route path='/admin/' element={<SignUp />} />
          <Route path='/admin/login' element={<SignUp />} />
          <Route path='/admin/users' element={<SignUp />} />
          <Route path='/admin/users' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
