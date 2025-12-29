export interface CustomJwtPayload {
    exp: number;
    iat: number;
    result_select: UserItem[];
}

export interface UserItem {
    department_id: number;
    employee_annotation: string;
    employee_code: string;
    employee_created_at: string;
    employee_email: string;
    employee_id: number;
    employee_nameen: string;
    employee_nameth: string;
    employee_oid: string;
    employee_position: string;
    employee_level: string;
    employee_status: string;
    employee_supervisor: string;
    employee_usertype: string;
}

export interface ApplicationItem {
    application_id: number;
    application_name: string;
    application_description: string;
    application_website: string;
    group_id: number;
    application_status: string;
}