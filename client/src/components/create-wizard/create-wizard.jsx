import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import classes from './create-wizard.module.css';
import { useAuth } from '../../auth/auth-provider';
import { fetcher } from '../../helpers/fetcher';

const CreateWizard = () => {
    const auth = useAuth();
    const [inputs, setInputs] = useState([[]]);
    const [extraData, setExtraData] = useState('');
    const [wizardName, setWizardName] = useState('');
    const [currentInput, setCurrentInput] = useState({
        value: 'textbox',
        label: '',
        data: undefined,
    });
    const [page, setPage] = useState(0);

    const handleFormType = (e) => {
        setCurrentInput((prevState) => ({
            ...prevState,
            value: e.target.value,
        }));
    };

    const handleFormLabel = (e) => {
        setCurrentInput((prevState) => ({
            ...prevState,
            label: e.target.value,
        }));
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        setInputs((prevState) => {
            const inputs = [...prevState];
            if (
                ['img', 'checkboxes', 'img-selection'].includes(
                    currentInput.value
                )
            ) {
                currentInput['data'] = extraData;
            }

            inputs[page].push(currentInput);
            return inputs;
        });
        setCurrentInput({
            value: 'textbox',
            label: '',
        });
        setExtraData('');
    };

    const publishWizard = async () => {
        if (!wizardName) {
            alert('Please enter a name for your wizard');
            return;
        }
        if (inputs.some((inputsPage) => inputsPage.length === 0)) {
            alert('Cannot submit form with an empty wizard page');
            return;
        }

        const res = await fetcher('/wizards', 'POST', {
            name: wizardName,
            inputs,
            creator: auth.user.username,
        });

        setPage(0);
        setInputs([[]]);
        setWizardName('');
        if (res.wizardId) alert('Wizard created successfully');
    };

    if (auth.user.type === 'user') {
        return <div><h3>Only wizard creator can create a wizard</h3></div>;
    } else {
        return (
            <main className={classes.root}>
                <h1>Create Wizard</h1>
                <div>
                    Current wizard page: <b> {page + 1}</b> of total{' '}
                    <b>{inputs.length}</b> pages
                </div>

                {inputs[page].length ? (
                    <ul>
                        {inputs[page].map((input, index) => (
                            <li key={index}>
                                {input.value}: {input.label}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>No input yet</div>
                )}

                <br></br>
                <form onSubmit={onFormSubmit}>
                    <div className={classes.formGroup}>
                        <TextField
                            label='Wizard name'
                            required={true}
                            sx={{ margin: '15px 0' }}
                            InputProps={{
                                name: 'wizard-name',
                                id: 'wizard-name',
                                value: wizardName,
                                onChange: (e) => setWizardName(e.target.value),
                            }}
                        />
                        <br></br>
                        <TextField
                            label='Input label'
                            required={true}
                            sx={{ margin: '15px 0' }}
                            InputProps={{
                                name: 'input-label',
                                id: 'input-label',
                                value: currentInput.label,
                                onChange: handleFormLabel,
                            }}
                        />
                        <select
                            value={currentInput.value}
                            onChange={handleFormType}
                        >
                            <option value='textbox'>Textbox</option>
                            <option value='password'>Secured Input</option>
                            <option value='textarea'>
                                Multiline Free Text
                            </option>
                            <option value='img'>Image</option>
                            <option value='checkboxes'>CheckboxList</option>
                            <option value='img-selection'>
                                Image Selection List
                            </option>
                        </select>
                        {['img', 'checkboxes', 'img-selection'].includes(
                            currentInput.value
                        ) && (
                            <>
                                <TextField
                                    label={
                                        currentInput.value === 'img'
                                            ? 'Image URL'
                                            : currentInput.value === 'checkboxes'
                                            ? 'Comma separated labels'
                                            : 'Comma separated image URLs'
                                    }
                                    required={true}
                                    sx={{ margin: '15px 0' }}
                                    InputProps={{
                                        name: 'input-label',
                                        id: 'input-label',
                                        value: extraData,
                                        onChange: (e) =>
                                            setExtraData(e.target.value),
                                    }}
                                />
                            </>
                        )}
                        * For lists, enter comma separated values
                    </div>

                    <Button sx={{ m: 2 }} type='submit' variant='outlined'>
                        Add input to page
                    </Button>
                </form>

                <Button
                    sx={{ m: 2 }}
                    variant='contained'
                    onClick={() =>
                        setPage((prevCount) => {
                            if (page > 0) {
                                return prevCount - 1;
                            }
                            return prevCount;
                        })
                    }
                >
                    Previous Wizard Page
                </Button>
                <Button
                    sx={{ m: 2 }}
                    variant='contained'
                    onClick={() => {
                        setInputs((prevInputs) => [...prevInputs, []]);
                        setPage((prevPage) => prevPage + 1);
                    }}
                >
                    Add Page
                </Button>
                <Button
                    sx={{ m: 2 }}
                    variant='contained'
                    onClick={() =>
                        setPage((prevCount) => {
                            if (prevCount + 1 < inputs.length) {
                                return prevCount + 1;
                            }
                            return prevCount;
                        })
                    }
                >
                    Next Wizard Page
                </Button>
                <br></br>

                <Button
                    sx={{ mt: 2 }}
                    variant='contained'
                    onClick={publishWizard}
                >
                    Publish Wizard
                </Button>
            </main>
        );
    }
};

export default CreateWizard;
