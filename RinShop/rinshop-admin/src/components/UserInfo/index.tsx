import { Link } from 'react-router-dom';
import { Popover, Space, Avatar, Button  } from 'antd';
import { UserOutlined,LogoutOutlined } from '@ant-design/icons';
import useAuth from '../../hooks/useAuth'; 
import styles from "./UserInfo.module.css"
const UserInfo = () => {
    const { user, logout } = useAuth();
    const content = (
        <div className={styles.box_open_userinfo}>
            <div className={styles.user_info_item}>
                <p className={styles.user_avatar}>
                    <Avatar>
                        {user?.last_name}     
                    </Avatar>
                </p>
                <p className={styles.user_info}>
                    <span className={styles.user_name}>{user?.first_name} {user?.last_name}</span>
                    <span className={styles.user_email}>{user?.email}</span>
                </p>
            </div>
            <Button className={styles.user_profile}><UserOutlined /> Profile</Button>
            <Button className={styles.user_logout} onClick={logout}><LogoutOutlined /> Logout</Button>
        </div>
    );
    return (
        <>
            {
                user ? (
                    <Popover content={content} title="" trigger="click">
                        <div role="button" tabIndex={0}  className={styles.user_info_item}>
                            <p className={styles.user_avatar}>
                                <Avatar>
                                    {user.last_name}     
                                </Avatar>
                            </p>
                            <p className={styles.user_info}>
                                <span className={styles.user_name}>{user.first_name} {user.last_name}</span>
                            </p>
                        </div>
                    </Popover>
                ): (
                    <Space wrap size={16}>
                        <Link to={"/login"}>
                            Login
                        </Link>
                    </Space>
                )
            }
            
        </>
    )
}

export default UserInfo