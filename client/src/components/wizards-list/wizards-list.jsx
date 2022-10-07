import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { fetcher } from '../../helpers/fetcher';
import WizardContainer from './wizard-container/wizards-container';
import classes from './wizards-list.module.css';
import { useAuth } from '../../auth/auth-provider';

const WizardsList = () => {
    const auth = useAuth();
    const [wizards, setWizards] = useState([]);
    const [selectedWizard, _setSelectedWizard] = useState();
    const [results, setResults] = useState([]);
    const [selectedResult, setSelectedResult] = useState();
    const { wizardId } = useParams();
    const navigate = useNavigate();

    const setSelectedWizard = useCallback(
        (wizard) => {
            navigate('/wizards-list/' + wizard._id);
            _setSelectedWizard(wizard);
        },
        [navigate]
    );

    const isReadonly = () =>
        auth.user.type === 'wizard_creator' || auth.user.type === 'admin';

    const deleteWizard = async () => {
        const res = await fetcher(`/wizards/${selectedWizard._id}`, 'DELETE');
        if (res._id) {
            alert('Deleted successfully');
            setWizards(
                wizards.filter((wizard) => wizard._id !== selectedWizard._id)
            );
            setSelectedWizard(undefined);
        }
    };

    useEffect(() => {
        const fetchWizards = async () => {
            const wizards = await fetcher('/wizards', 'GET');
            setWizards(wizards);
            if (wizardId) {
                setSelectedWizard(wizards.find((w) => w._id === wizardId));
            }
        };
        if (auth.user) {
            fetchWizards();
        }
    }, [auth.user, wizardId, setSelectedWizard]);

    const getResults = async (wizard) => {
        const results = await fetcher(
            `/wizards/results/${wizard.creator}/${wizard.name}`,
            'GET'
        );
        setResults(results);
        return results.length;
    };

    const submitResults = async (results) => {
        const res = await fetcher('/wizards/submit', 'POST', {
            name: selectedWizard.name,
            creator: selectedWizard.creator,
            inputs: results,
            filler: auth.user.username,
        });
        if (res.status === 200) {
            alert('Your results have been submitted');
        }
    };
    return (
        <div className={classes.root}>
            {!auth.user ? (
                <div><h3>You must be logged in to view wizards!!</h3></div>
            ) : (
                <>
                <div><h3>Select Wizard:</h3></div>
                    {wizards.map((wizard, index) => (
                        
                        <li
                            key={index}
                            onClick={() => {
                                setSelectedResult(undefined);
                                setSelectedWizard(wizard);
                                if (isReadonly()) {
                                    getResults(wizard);
                                }
                            }}
                        >
                            <b>{wizard.name}</b>
                        </li>
                    ))}
                    <br></br>
                    {selectedWizard && !isReadonly() && (
                        <WizardContainer
                            wizard={selectedWizard}
                            submitResults={submitResults}
                        />
                    )}
                    {selectedWizard && isReadonly() && (
                        <>
                            <hr></hr>
                            <h4>Options:</h4> {' '}
                            <span
                                className={classes.deleteWizard}
                                onClick={deleteWizard}
                            >
                                <h4>Delete Wizard</h4>
                            </span>
                            <br />
                            <br />
                            <div><h3>Users who filled the wizard:</h3></div>
                            <ul>
                                {results.length ? (
                                    results.map((result, i) => (
                                        <li
                                            key={i}
                                            onClick={() =>
                                                setSelectedResult(result)
                                            }
                                        >
                                        <h4>{result.filler}</h4> 
                                        </li>
                                    ))
                                ) : (
                                    <div>
                                        <h4>No users have filled this wizard yet</h4>
                                    </div>
                                )}
                            </ul>
                        </>
                    )}
                    {selectedResult && (
                        <WizardContainer
                            wizard={selectedResult}
                            readonly={true}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default WizardsList;
