import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LandingPage } from './Components/UserComponents/LandingPage';
import { SignIn } from './Components/UserComponents/SignIn';
import { SignUp } from './Components/UserComponents/SignUp';

function App() {
  return (
    <div className='App'>
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
