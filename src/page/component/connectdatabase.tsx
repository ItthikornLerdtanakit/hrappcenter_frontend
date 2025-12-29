import axios from 'axios';

const ipaddress = import.meta.env.VITE_IPADDRESS;

export const login = async (email: string, oid: string) => {
    try {
        const response = await axios.post(ipaddress + import.meta.env.VITE_LOGIN, { email, oid });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

// ออกจากระบบและเคลียร์ session ทุกอย่าง
export const logout = async () => {
    localStorage.removeItem(import.meta.env.VITE_TOKEN);
    localStorage.removeItem(import.meta.env.VITE_OID);
    globalThis.location.href = '/';
}

export const get_application = async (emp_id: number, emp_usertype: string) => {
    try {
        const response = await axios.post(ipaddress + import.meta.env.VITE_GET_APPLICATION, { emp_id, emp_usertype });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}