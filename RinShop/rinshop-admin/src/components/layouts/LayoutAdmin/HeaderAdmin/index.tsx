import { Layout } from 'antd';
import styles from './HeaderAdmin.module.css'
import UserInfo from '../../../UserInfo';
const HeaderAdmin = () => {
    const { Header } = Layout;
    return (
        <>
        <Header className={styles.sec_header} >   
            <p>search</p>
            <UserInfo />
        </Header>
        </>
    )
}

export default HeaderAdmin