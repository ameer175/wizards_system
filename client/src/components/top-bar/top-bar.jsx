import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/auth-provider';
import classes from './top-bar.module.css';

export default function TopBar() {
    const auth = useAuth();
    const location = useLocation();
    let currentTab = location.pathname;

    if (currentTab.includes('/wizards-list')) {
        currentTab = '/wizards-list';
    }

    const handleLogout = async () => {
        await auth.signOut();
    };

    return (
        <div className={classes.root}>
            <Tabs textColor='inherit' value={currentTab}>
                <Tab label='Home' value='/' to='/' component={Link} />
                <Tab
                    label='Wizards List'
                    value='/wizards-list'
                    to='/wizards-list'
                    component={Link}
                />
                <Tab
                    label='Create Wizard'
                    value='/create-wizard'
                    to='/create-wizard'
                    component={Link}
                />
                {auth.user ? (
                    <Tab label='Logout' value='/login' onClick={handleLogout} />
                ) : (
                    <Tab
                        label='Login'
                        value='/login'
                        to='/login'
                        component={Link}
                    />
                )}
            </Tabs>
        </div>
    );
}
