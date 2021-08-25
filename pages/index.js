import styles from '../styles/Home.module.css'
import Users from "../components/Users";
import axios from 'axios';
const drawerWidth = 100;

export default function Home({ users }) {
    return (
        <div className={styles.container}>
            <Users users={users}/>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const users = await axios.get('http://localhost:3000/user/');
    return {
        props: {
            users: users.data
        }
    }
}
