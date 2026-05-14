# HR APP CENTER — Frontend

**Application Portal สำหรับศูนย์กลางแอปพลิเคชัน HR**
Nok Airlines Public Company Limited

---

## 1. บทนำ

Frontend Application พัฒนาด้วย React 19 + TypeScript บน Vite (rolldown-vite) ทำหน้าที่เป็น Application Portal สำหรับพนักงานในการเข้าถึงแอปพลิเคชัน HR ต่างๆ ขององค์กร รองรับการเข้าสู่ระบบผ่าน Microsoft Azure AD (Single Sign-On) และแสดงรายการแอปพลิเคชันตามสิทธิ์ของผู้ใช้งาน

---

## 2. เทคโนโลยีที่ใช้ (Tech Stack)

### 2.1 Core

| เทคโนโลยี | เวอร์ชัน | วัตถุประสงค์ |
|---|---|---|
| React | 19.1.1 | UI Library |
| TypeScript | 5.9.x | Type Safety |
| Vite (rolldown-vite) | 7.1.x | Build Tool & Dev Server |
| React Router DOM | 7.9.3 | Client-side Routing & Navigation |

### 2.2 Authentication

| เทคโนโลยี | เวอร์ชัน | วัตถุประสงค์ |
|---|---|---|
| @azure/msal-browser | 4.24.1 | Microsoft Azure AD Authentication (SSO) |
| JWT Decode | 4.0.0 | JWT Token Decoding |

### 2.3 UI Components & Styling

| เทคโนโลยี | เวอร์ชัน | วัตถุประสงค์ |
|---|---|---|
| Bootstrap | 5.3.8 | CSS Framework |
| React Bootstrap | 2.10.10 | Bootstrap React Components |
| React Icons | 5.5.x | Icon Library |

### 2.4 Utilities

| เทคโนโลยี | เวอร์ชัน | วัตถุประสงค์ |
|---|---|---|
| Axios | 1.12.2 | HTTP Client สำหรับเรียก API |
| SweetAlert2 | 11.25.x | Notification & Confirmation Dialogs |

### 2.5 Development Tools

| เทคโนโลยี | เวอร์ชัน | วัตถุประสงค์ |
|---|---|---|
| ESLint | 9.36.x | Code Linting |
| TypeScript ESLint | 8.x | TypeScript Lint Rules |
| React Compiler (Babel Plugin) | 19.1.x | Automatic Memoization |
| @vitejs/plugin-react | 5.0.4 | React Support for Vite |

---

## 3. โครงสร้างโปรเจกต์ (Project Structure)

```
REACT_FRONTEND/
├── index.html                    # HTML Entry Point
├── vite.config.ts                # Vite Configuration (React Compiler Enabled)
├── tsconfig.json                 # TypeScript Configuration
├── tsconfig.app.json             # TypeScript App Config
├── tsconfig.node.json            # TypeScript Node Config
├── eslint.config.js              # ESLint Configuration
├── package.json
├── .env                          # Environment Variables (ห้าม commit)
├── .env.local                    # Environment Variables (Local Override)
├── .gitignore
│
├── public/                       # Static Assets
│
└── src/
    ├── main.tsx                  # Application Entry Point & Route Definitions
    ├── notfound.tsx              # 404 Not Found Page
    ├── css/
    │   └── style.css             # Global Styles
    ├── assets/
    │   └── image/
    │       ├── bannerhome.jpeg   # Application Card Background
    │       ├── logo.png          # Application Logo
    │       ├── logofull.png      # Full Nok Air Logo
    │       ├── logomicrosoft.png # Microsoft Login Button Logo
    │       └── notfound2.png     # 404 Page Image
    │
    └── page/
        ├── index.tsx                         # Login / Authentication Page (Azure AD)
        ├── home.tsx                          # Application Portal Dashboard
        │
        └── component/
            ├── navbar/
            │   ├── navbar.tsx                # Login Page Navigation Bar
            │   └── navbarhome.tsx             # Home Page Navigation Bar (with Logout)
            ├── authguard.tsx                  # Route Guard (JWT Authentication)
            ├── connectdatabase.tsx            # API Base URL & HTTP Calls
            ├── microsoftservice.tsx           # Azure MSAL Configuration
            ├── footer.tsx                    # Page Footer
            ├── sweetalerttwo.tsx              # SweetAlert2 Utilities
            ├── functions.tsx                 # Shared Helper Functions
            └── interfaces.tsx                # TypeScript Interfaces / Types
```

---

## 4. ข้อกำหนดเบื้องต้น (Prerequisites)

| รายการ | เวอร์ชันขั้นต่ำ |
|---|---|
| Node.js | >= 18.x |
| npm | >= 9.x |
| Backend API Server | ต้องรันอยู่ที่ Port 5500 |
| Azure AD App Registration | ต้องมี Client ID และ Tenant ID |

---

## 5. การติดตั้ง (Installation)

```bash
cd REACT_FRONTEND
npm install
```

---

## 6. การตั้งค่า Environment Variables

สร้างไฟล์ `.env` ในโฟลเดอร์ `REACT_FRONTEND/` ตามรูปแบบด้านล่าง:

```env
# Backend API URL
VITE_IPADDRESS = '<backend_api_base_url>'

# Azure AD Configuration
VITE_AZURE_CLIENT_ID = '<azure_app_client_id>'
VITE_AZURE_TENANT_ID = '<azure_tenant_id>'
VITE_AZURE_REDIRECT_URL = '<oauth_callback_url>'
VITE_AZURE_SCOPES = 'User.Read'

# Authentication Tokens
VITE_TOKEN = '<application_token>'
VITE_ACCESSTOKEN = '<access_token>'

# API Endpoints
VITE_LOGIN = '/api/login'
VITE_GET_APPLICATION = '/api/get_application'
```

> **หมายเหตุ:** ตัวแปรที่ขึ้นต้นด้วย `VITE_` จะถูก Expose ให้ Client-side Code เข้าถึงได้ ห้ามใส่ข้อมูลที่เป็นความลับระดับสูง (เช่น Database Password) ในไฟล์นี้

---

## 7. การรันระบบ (Running the Application)

### 7.1 Development Mode

```bash
# Dev Server พร้อม Host Access (Port 5173)
npm run appcenter

# Dev Server มาตรฐาน
npm run dev
```

### 7.2 Production Build

```bash
npm run build
```

ไฟล์ที่ Build จะอยู่ในโฟลเดอร์ `dist/`

### 7.3 คำสั่งทั้งหมด

| คำสั่ง | คำอธิบาย |
|---|---|
| `npm run dev` | เริ่ม Dev Server (Default Vite Port) |
| `npm run appcenter` | เริ่ม Dev Server ที่ Port 5173 พร้อมเปิด Network Access (`--host`) |
| `npm run build` | Compile TypeScript และ Build สำหรับ Production |
| `npm run lint` | ตรวจสอบ Code Quality ด้วย ESLint |
| `npm run preview` | Preview Production Build ในเครื่อง |

---

## 8. ระบบ Routing

ระบบใช้ React Router DOM v7 พร้อม `AuthGuard` สำหรับตรวจสอบสิทธิ์ก่อนเข้าถึงทุกหน้า

| Path | Component | คำอธิบาย |
|---|---|---|
| `/` | `Index` | หน้า Login ผ่าน Microsoft Azure AD |
| `/callback` | `Index` | OAuth Callback หลังจาก Microsoft Authentication |
| `/home` | `Home` | หน้า Application Portal Dashboard |
| `*` | `Notfound` | หน้า 404 Not Found |

---

## 9. ระบบ Authentication

### 9.1 ขั้นตอนการเข้าสู่ระบบ (Login Flow)

```
1. ผู้ใช้เข้าหน้า Login (/)
       │
2. คลิก "Sign in with Microsoft"
       │
3. Redirect ไปยัง Azure AD Login
       │
4. Microsoft ส่ง OAuth Token กลับมาที่ /callback
       │
5. Frontend ส่ง Email + OID ไปยัง Backend API (/api/login)
       │
6. Backend ตรวจสอบพนักงานในฐานข้อมูล
       │
7. ออก JWT Token (หมดอายุ 1 ชั่วโมง) → เก็บใน localStorage
       │
8. Redirect ไปยังหน้า Home (/home)
```

### 9.2 AuthGuard

- ตรวจสอบ JWT Token จาก localStorage ก่อนอนุญาตเข้าถึง Route
- หาก Token หมดอายุหรือไม่ถูกต้อง → Redirect กลับไปหน้า Login
- ป้องกันผู้ใช้ที่ Login แล้วเข้าถึงหน้า Login ซ้ำ

---

## 10. ฟีเจอร์หลัก (Key Features)

| ฟีเจอร์ | รายละเอียด |
|---|---|
| **Microsoft Azure AD SSO** | เข้าสู่ระบบผ่าน Microsoft Account ขององค์กร (Single Sign-On) |
| **JWT Authentication** | ระบบ Route Guard ป้องกันการเข้าถึงโดยไม่ได้รับอนุญาต |
| **Application Portal** | แสดงรายการแอปพลิเคชัน HR ตามสิทธิ์ของผู้ใช้งาน |
| **Role-based Access** | Admin เห็นแอปทั้งหมด, User ทั่วไปเห็นเฉพาะที่มีสิทธิ์ |
| **Application Search** | ค้นหาและกรองแอปพลิเคชันตามชื่อ |
| **Status Filtering** | กรองแอปพลิเคชันตามสถานะ (Active, Testing, Unavailable) |
| **React Compiler** | เปิดใช้งาน React Compiler สำหรับ Automatic Memoization |
| **Responsive UI** | รองรับการใช้งานบนหน้าจอหลายขนาดด้วย Bootstrap |
| **Interactive Cards** | Application Cards พร้อม Hover Animation Effects |
| **Secure Logout** | ยืนยันก่อนออกจากระบบ ล้าง Session Data ทั้งหมด |

---

## 11. Shared Components

| Component | ไฟล์ | คำอธิบาย |
|---|---|---|
| `AuthGuard` | `authguard.tsx` | ตรวจสอบ JWT Token ก่อนอนุญาตเข้าถึง Route |
| `Navbar` | `navbar/navbar.tsx` | แถบนำทางสำหรับหน้า Login |
| `NavbarHome` | `navbar/navbarhome.tsx` | แถบนำทางสำหรับหน้า Home พร้อมปุ่ม Logout |
| `Footer` | `footer.tsx` | ส่วนท้ายหน้า |
| `SweetAlertTwo` | `sweetalerttwo.tsx` | Utility สำหรับ Alert, Loading, Warning, Error Dialogs |
| `MicrosoftService` | `microsoftservice.tsx` | MSAL Configuration สำหรับ Azure AD |

---

## 12. TypeScript Interfaces

### UserItem
```typescript
{
  employee_id, employee_code, employee_email,
  employee_nameen, employee_nameth, employee_position,
  employee_level, employee_status, employee_supervisor,
  employee_usertype, employee_oid, employee_annotation,
  employee_created_at, department_id
}
```

### ApplicationItem
```typescript
{
  application_id, application_name, application_description,
  application_website, group_id, application_status
}
```

---

## 13. สถาปัตยกรรม (Architecture)

```
┌─────────────────────────────────────────┐
│             Browser (Client)             │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │        React Router DOM v7         │  │
│  │  ┌─────────┐                       │  │
│  │  │AuthGuard│── JWT Verification    │  │
│  │  └────┬────┘                       │  │
│  │       │                            │  │
│  │  ┌────┴─────────────────────────┐  │  │
│  │  │     Page Components          │  │  │
│  │  │  ┌────────┐ ┌─────────────┐  │  │  │
│  │  │  │ Navbar │ │ NavbarHome  │  │  │  │
│  │  │  └────────┘ └─────────────┘  │  │  │
│  │  │  ┌─────────────────────────┐ │  │  │
│  │  │  │    Content Area         │ │  │  │
│  │  │  │  (Login / App Portal)   │ │  │  │
│  │  │  └─────────────────────────┘ │  │  │
│  │  └──────────────────────────────┘  │  │
│  └────────────────────────────────────┘  │
│          │                    │           │
│    MSAL (Azure AD)      Axios (HTTP)     │
└──────────┬────────────────┬──────────────┘
           │                │
           ▼                ▼
    Microsoft Azure   Backend API Server
    AD (Login)        (Port 5500)
```

---

> **HR People and Administration**
> Nok Airlines Public Company Limited
>
> ปรับปรุงล่าสุด: พฤษภาคม 2569 (May 2026)
