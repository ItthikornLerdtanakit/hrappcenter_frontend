import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import { FiSearch } from 'react-icons/fi';

import type { CustomJwtPayload, UserItem, ApplicationItem } from './component/interfaces';

import Navbars from './component/navbar/navbarhome';
import Footer from './component/footer';
import { get_application } from './component/connectdatabase';

import bannerhome from '../assets/image/bannerhome.jpeg';

const Home = () => {
    useEffect(() => {
        document.title = 'Applications';
        get_database();
    }, [])

    const [hoveredApp, setHoveredApp] = useState<number | null>(null);
    const [User, setUser] = useState<UserItem[]>([]);
    const [Application, setApplication] = useState<ApplicationItem[]>([]);
    const [FilterApplication, setFilterApplication] = useState<ApplicationItem[]>([]);
    const [Status, setStatus] = useState<string[]>([]);
    const get_database = async () => {
        const token = localStorage.getItem(import.meta.env.VITE_TOKEN)!;
        const decoded = jwtDecode<CustomJwtPayload>(token);
        setUser(decoded.result_select);
        const result = await get_application(decoded.result_select[0].employee_id, decoded.result_select[0].employee_usertype);
        setApplication(result);
        setFilterApplication(result);
        const all_status = [...new Set(result.map((item: ApplicationItem) => item.application_status))] as string[];
        const order = ['active', 'testing', 'unavailable'];
        const sort_status = [...all_status].sort((a, b) => order.indexOf(a) - order.indexOf(b));
        setStatus(sort_status);
    }

    // ค้นหาแอพพลิเคชั่น
    const SearchApplication = (value: string) => {
        const FilteredApps = Application.filter((item) => item.application_name.toLowerCase().includes(value.toLowerCase()) || item.application_description.toLowerCase().includes(value.toLowerCase()));
        setFilterApplication(FilteredApps);
    }

    useEffect(() => {
        const all_status = [...new Set(FilterApplication.map((item: ApplicationItem) => item.application_status))] as string[];
        const order = ['active', 'testing', 'unavailable'];
        const sort_status = [...all_status].sort((a, b) => order.indexOf(a) - order.indexOf(b));
        setStatus(sort_status);
    }, [FilterApplication]);

    return (
        <Container fluid>
            <Navbars />
            <Container style={{ flex: 1 }} className='py-4'>
                <div className='mb-4'>
                    <h4>Welcome, {User[0]?.employee_nameen}</h4>
                    <p className='text-muted'>You are authorized to access {Application.length} applications</p>
                </div>
                <Form className='mb-4' onSubmit={(e) => e.preventDefault()}>
                    <div className='d-flex align-items-center position-relative'>
                        <FiSearch size={18} className='position-absolute ms-2 text-muted' />
                        <Form.Control type='text' placeholder='Search Application...' onChange={(e) => SearchApplication(e.target.value)} style={{ paddingLeft: '2rem' }} />
                    </div>
                </Form>
                {FilterApplication.length === 0 ? (
                    <div className='text-center py-5'>
                        <FiSearch size={36} className='text-muted mb-3' />
                        <p className='fw-medium text-muted'>The requested application could not be found.</p>
                    </div>
                ) : (
                    Status?.filter(item => item !== 'inactive').map((status: string) => (
                        <div  key={status} className='mb-3'>
                            <Row className='headers mb-3'>
                                <Col md={8}>
                                    <p>Application - {status.charAt(0).toUpperCase() + status.slice(1)}</p>
                                </Col>
                            </Row>
                            {status === 'unavailable' ? (
                                <Row xs={2} sm={3} md={4} lg={4} className='g-3'>
                                    {FilterApplication?.filter(data => data.application_status === status).map((item) => {
                                        return (
                                            <Col key={item.application_id}>
                                                <Card className='h-100 shadow-sm border-0 app-card'>
                                                    <div className='overflow-hidden' style={{ height: 120 }}>
                                                        <Card.Img variant='top' src={bannerhome} alt={item.application_name} className='h-100 object-fit-cover'style={{ filter: 'grayscale(100%)', opacity: 0.6, transition: 'filter 0.3s ease, opacity 0.3s ease' }} />
                                                    </div>
                                                    <Card.Body className='text-center mt-4 mb-4'>
                                                        <Card.Title className='fs-6'>{item.application_name}</Card.Title>
                                                        <Card.Text className='text-muted small'>{item.application_description}</Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        );
                                    })}
                                </Row>
                            ) : (
                                <Row key={status} xs={2} sm={3} md={4} lg={4} className='g-3'>
                                    {FilterApplication?.filter(data => data.application_status === status).map((item) => {
                                        return (
                                            <Col key={item.application_id}>
                                                <Card className='h-100 shadow-sm border-0 app-card' onMouseEnter={() => setHoveredApp(item.application_id)} onMouseLeave={() => setHoveredApp(null)} onClick={() => globalThis.location.href = item.application_website + '?oid=' + localStorage.getItem(import.meta.env.VITE_OID)} style={{ cursor: 'pointer', transform: hoveredApp === item.application_id ? 'translateY(-5px) scale(1.03)' : 'scale(1)', transition: 'all 0.3s ease', boxShadow: hoveredApp === item.application_id ? '0 6px 18px rgba(0,0,0,0.15)' : '0 2px 6px rgba(0,0,0,0.05)' }}>
                                                    <div className='overflow-hidden' style={{ height: 120 }}>
                                                        <Card.Img variant='top' src={bannerhome} alt={item.application_name} className='h-100 object-fit-cover' />
                                                    </div>
                                                    <Card.Body className='text-center mt-4 mb-4'>
                                                        <Card.Title className='fs-6'>{item.application_name}</Card.Title>
                                                        <Card.Text className='text-muted small'>{item.application_description}</Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        );
                                    })}
                                </Row>
                            )}
                        </div>
                    ))
                )}

            </Container>
            <Footer />
        </Container>
    );
}

export default Home;