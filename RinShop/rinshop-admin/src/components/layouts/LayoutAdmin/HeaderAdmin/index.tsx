import { Layout } from 'antd';
import styles from './HeaderAdmin.module.css'
import UserInfo from '../../../UserInfo';
import SearchHeader from '../../../SearchHeader';
const HeaderAdmin = () => {
    const { Header } = Layout;
    return (
        <>
        <Header className={styles.sec_header} >
            <SearchHeader />
            <UserInfo />
        </Header>
        </>
    )
}

export default HeaderAdmin