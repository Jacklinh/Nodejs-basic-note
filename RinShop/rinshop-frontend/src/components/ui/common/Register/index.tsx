
'use client';
import { GrUserAdmin  } from "react-icons/gr";
import { RiArrowDropDownLine } from "react-icons/ri";
import { UserOutlined,LogoutOutlined } from '@ant-design/icons';
import Link from 'next/link';
import useAuth from "@/hooks/useAuth";
import { Popover, Button  } from 'antd';
const Register = () => {
    const { user,logout } = useAuth();
    const content = (
        <div className='popover_user'>
            <Button><UserOutlined /> Thông tin cá nhân</Button>
            <Button onClick={logout}><LogoutOutlined /> Thoát</Button>
        </div>
    );
    return (
        <>
            {
                user ? (
                    <Popover content={content} title="" trigger="click">
                        <p className="register_name">
                            {user.fullName} <RiArrowDropDownLine />
                        </p>
                    </Popover>
                    
                ): (
                    <p className="header_icon_register">
                        <Link href='/login'>
                            <GrUserAdmin />
                        </Link>
                    </p>
                )
            }
        </>
    )
}

export default Register