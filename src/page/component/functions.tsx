// ทำกรอบแดงเพื่อเตือนว่ายังไม่มีข้อมูลที่ต้องการสำหรับ input
export const checkvalueinput = (element: HTMLElement, value: string | number) => {
    if (value) {
        element.style.border = '1px solid rgb(222, 226, 230)';
    } else {
        element.style.border = '2px solid red';
    }
}