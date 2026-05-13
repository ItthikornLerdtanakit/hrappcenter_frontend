import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// นำเข้ามาจาก Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Navbars from './component/navbar/navbar';
import Footer from './component/footer';
import { msalInstance, loginRequest } from './component/microsoftservice';
import { loading, alertwarning, alerterror } from './component/sweetalerttwo';
import { login } from './component/connectdatabase';

import logo from '../assets/image/logo.png';
import logomicrodoft from '../assets/image/logomicrosoft.png';

const Index = () => {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'Login';
        MicrosoftInit();
    }, []);

    const MicrosoftInit = async () => {
        await msalInstance.initialize();
        msalInstance.handleRedirectPromise().then(async (response) => {
            if (response) {
                msalInstance.setActiveAccount(response.account);
                const result = await login(response.account.username, response.account.idTokenClaims!.oid || '');
                if (result.login === 'success') {
                    localStorage.setItem(import.meta.env.VITE_TOKEN, result.token);
                    if (response.account?.idTokenClaims?.oid) {
                        localStorage.setItem(import.meta.env.VITE_OID, response.account.idTokenClaims.oid);
                    }
                    navigate('/home');
                } else if (result === 'user_not_exist') {
                    alertwarning('Login failed because your information was not found in the system. (User Not Exist)');
                } else {
                    alerterror('Error ไม่สามารถเชื่อมต่อกับหลังบ้านได้ (ฺBackend AppCenter) Response Backend:' + result);
                }
            }
        }).catch((error) => {
            console.error('Redirect error:', error);
            alerterror('Error ไม่สามารถเชื่อมต่อกับ Microsoft ได้ Error Message:' + error);
        });
    }

    // ปุ่มเข้าสู่ระบบ
    const btn_login = async () => {
        loading('');
        msalInstance.loginRedirect(loginRequest);
    }

    return (
        <Container fluid>
            <Navbars />
            <Row style={{ flex: 1 }} className='midpoint'>
                <Col xs={11} md={9} xl={4} style={{ backgroundColor: 'white', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', borderRadius: 15 }}>
                    {/* Card Body */}
                    <div style={{ padding: '3rem 2.5rem' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#2c3e50', fontSize: '2rem' }}>
                                Welcome To HR Application Center
                            </h2>
                            <Col md={12} className='midpoint mt-5 mb-5'>
                                <img src={logo} alt='logo nokair' className='logo' />
                            </Col>
                            <p style={{ color: '#6c757d', marginBottom: '2rem', fontSize: '0.95rem' }}>
                                Sign in with your Microsoft account.
                            </p>
                        </div>
                        {/* Login Button */}
                        <Button variant='dark' style={{ width: '100%', padding: '1rem', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '500', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }} onClick={btn_login}>
                            <img src={logomicrodoft} width={30} alt='Logo Microsoft' />
                            <span>Sign in with Microsoft</span>
                        </Button>
                        {/* Additional Info */}
                        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                            <small style={{ color: '#6c757d', fontSize: '0.85rem' }}>
                                Use your Microsoft or Office 365 account.
                            </small>
                        </div>
                    </div>
                </Col>
            </Row>
            <Footer />
        </Container>
    )
}

export default Index;