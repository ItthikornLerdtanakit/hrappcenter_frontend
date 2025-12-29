// นำเข้ามาจาก Bootstrap
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

import { alertlogout } from '../sweetalerttwo';
import { logout } from '../connectdatabase';

import logo from '../../../assets/image/logofull.png';

import { FaSignOutAlt } from 'react-icons/fa'; // ไอคอนสำหรับ logout

const Navbars = () => {
    return (
        <nav>
            <Row>
                <Navbar className='navbars'>
                    <Container style={{ justifyContent: 'center' }}>
                        <Row className='w-100'>
                            <Col className='col-4 d-flex justify-content-center align-items-center'>
                                <img className='logonokair' src={logo} alt='logo navbar' />
                            </Col>
                            <Col className='col-8 d-flex justify-content-end align-items-center' style={{ fontSize: '20px' }}>
                                <button style={{ all: 'unset', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }} onClick={() => alertlogout(logout)}><span className='me-2'>Logout</span><FaSignOutAlt /></button>
                            </Col>
                        </Row>
                    </Container>
                </Navbar>
            </Row>
        </nav>
    )
}

export default Navbars;