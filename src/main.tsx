import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// นำเข้า css ทั้งหมด
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

// ทั้งหมด
import AuthGuard from './page/component/authguard';
import Index from './page/index';
import Home from './page/home';
import Notfound from './notfound';

const Main = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthGuard />}>
                    <Route path='/callback' element={<Index />}></Route>
                    <Route path='/' element={<Index />}></Route>
                    <Route path='/home' element={<Home />}></Route>
                </Route>
                <Route path='*' element={<Notfound />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

createRoot(document.getElementById('root')!).render(<Main />);