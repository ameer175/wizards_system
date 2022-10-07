import { useEffect } from 'react';
import { useAuth } from './auth/auth-provider';
import Home from './components/home/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import classes from './app.module.css';
import Login from './components/login/login';
import CreateWizard from './components/create-wizard/create-wizard';
import TopBar from './components/top-bar/top-bar';
import WizardsList from './components/wizards-list/wizards-list';

function App() {
    const { setUser } = useAuth();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, [setUser]);

    return (
        <div className={classes.root}>
            <BrowserRouter>
                <TopBar />
                <Routes>
                    <Route path='/' exact element={<Home />} />
                    <Route path='/wizards-list' element={<WizardsList />} />
                    <Route
                        path='/wizards-list/:wizardId'
                        element={<WizardsList />}
                    />
                    <Route path='/login' element={<Login />} />
                    <Route path='/create-wizard' element={<CreateWizard />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
