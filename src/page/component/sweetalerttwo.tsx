// การนำเข้าและประกาศ Object ให้กับไฟล์สำหรับ Sweetalert2
import Swal from 'sweetalert2'

type SweetAlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question';

// ป้ายเล็กๆด้านขวาบน
export const alertsmall = (icon: SweetAlertIcon, text: string) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: icon,
        title: text
    });
}

export const loading = async (message: string) => {
    // แสดง Loading Popup
    if (message === '' || message === undefined) {
        Swal.fire({
            title: 'Loading...',
            html: `
                <div class='spinner-border text-warning' role='status' style='width: 5rem; height: 5rem;'>
                    <span class='visually-hidden'>Loading...</span>
                </div>
            `,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            customClass: {
                popup: 'custom-loading-popup'
            },
            scrollbarPadding: false,
        });
    }
    // ตรวจสอบข้อความตอบกลับ
    if (message === 'success') {
        // ปิด Popup Loading
        Swal.close();
    }
};

// การแจ้งเตือนเมื่อมีการถามว่าจะต้องการทำอะไร
export const alertwarning = (text: string) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          cancelButton: 'btn btn-danger m-2'
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: 'Warning!',
        html: text,
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: 'OK',
    });
}

// แจ้งเตือนเมื่อมีการ Error พร้อม Redireact
export const alerterror = (text: string) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-danger m-2'
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: 'Error!',
        text: text,
        icon: 'error',
        confirmButtonText: 'OK'
    });
}

// เมื่อออกจากระบบ
export const alertlogout = (logout: () => void) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success m-2',
          cancelButton: 'btn btn-danger m-2'
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: 'Log out or not?',
        text: 'Do you want to log out?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Logout',
        cancelButtonText: 'Cancel',
        reverseButtons: true
    }).then((result) => result.isConfirmed ? logout() : null);
}