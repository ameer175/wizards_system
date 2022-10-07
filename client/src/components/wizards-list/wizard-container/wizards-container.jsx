import React from 'react';
import { Wizard, useWizard } from 'react-use-wizard';
import stepClasses from './wizard-step.module.css';

const WizardContainer = ({ wizard, submitResults, readonly }) => {
    return (
        <div>
            <hr />
            <h1>{wizard.name}</h1>
            {readonly && <div><b>Filled by:</b> {wizard.filler}</div>}
            <b>Total steps:</b> {wizard.inputs.length}
            <Wizard>
                {wizard.inputs.map((wizardPage, index) => (
                    <WizardStep
                        key={index}
                        wizardPage={wizardPage}
                        step={index + 1}
                        total={wizard.inputs.length}
                        submitResults={submitResults}
                        wizard={wizard.inputs}
                        readonly={readonly}
                    />
                ))}
            </Wizard>
        </div>
    );
};

const WizardStep = ({
    wizardPage,
    step,
    total,
    submitResults,
    wizard,
    readonly,
}) => {
    const { previousStep, nextStep, isFirstStep, isLastStep } = useWizard();

    const verifyStepCompleted = () => {
        return wizard[step - 1] // step is 1 based
            .filter(({ value }) => value !== 'img')
            .every((input) => 'answer' in input);
    };

    const next = async (e) => {
        e.preventDefault();
        if (verifyStepCompleted()) {
            await nextStep();
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <form>
            <br></br>
            <br></br>
            <b>Current step:</b> {step}
            <br></br>
            <>
                {!isFirstStep && (
                    <button onClick={previousStep}>Previous ⏮️</button>
                )}
                {step === total && !readonly && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            submitResults(wizard);
                        }}
                    >
                        Submit wizard ⏮️
                    </button>
                )}
                {!isLastStep && <button onClick={next}>Next ⏭</button>}
            </>
            <br></br>
            <br></br>
            {wizardPage.map((input, inputIndex) => {
                const data = input?.data?.split(',');
                return (
                    <div className={stepClasses.inputGroup} key={inputIndex}>
                        {input.value === 'textbox' && (
                            <>
                                <label
                                    className={stepClasses.label}
                                    htmlFor={`text-input-${inputIndex}`}
                                >
                                    {input.label}
                                </label>
                                <input
                                    id={`text-input-${inputIndex}`}
                                    type='text'
                                    onChange={(e) =>
                                        (wizard[step - 1][inputIndex].answer =
                                            e.target.value)
                                    }
                                    value={readonly ? input.answer : undefined}
                                    disabled={readonly}
                                />
                            </>
                        )}
                        {input.value === 'password' && (
                            <>
                                <label
                                    className={stepClasses.label}
                                    htmlFor={`password-input-${inputIndex}`}
                                >
                                    {input.label}
                                </label>
                                {readonly ? (
                                    <input
                                        type='text'
                                        value={input.answer}
                                        disabled={true}
                                        readOnly
                                    />
                                ) : (
                                    <input
                                        id={`password-input-${inputIndex}`}
                                        type='password'
                                        onChange={(e) =>
                                            (wizard[step - 1][
                                                inputIndex
                                            ].answer = e.target.value)
                                        }
                                    />
                                )}
                            </>
                        )}
                        {input.value === 'textarea' && (
                            <>
                                <label
                                    className={stepClasses.label}
                                    htmlFor={`text-input-${inputIndex}`}
                                >
                                    {input.label}
                                </label>
                                {readonly ? (
                                    <textarea
                                        cols={30}
                                        rows={5}
                                        value={input.answer}
                                        disabled
                                        readOnly
                                    />
                                ) : (
                                    <textarea
                                        cols={30}
                                        rows={5}
                                        id={`text-input-${inputIndex}`}
                                        onChange={(e) =>
                                            (wizard[step - 1][
                                                inputIndex
                                            ].answer = e.target.value)
                                        }
                                    />
                                )}
                            </>
                        )}
                        {input.value === 'img' && (
                            <>
                                <label
                                    className={stepClasses.label}
                                    htmlFor={`img-${inputIndex}`}
                                >
                                    {input.label}
                                </label>
                                <img src={input.data} alt={input.label} />
                            </>
                        )}

                        {input.value === 'img-selection' && (
                            <>
                                <label
                                    className={stepClasses.label}
                                    htmlFor={`img-selection-${inputIndex}`}
                                >
                                    {input.label}
                                </label>
                                {data.map((imgUrl, checkboxIndex) => (
                                    <div
                                        key={checkboxIndex}
                                        className={stepClasses.imgList}
                                    >
                                        {readonly ? (
                                            <input
                                                type='checkbox'
                                                checked={
                                                    input.answer - 1 ===
                                                    checkboxIndex
                                                }
                                                disabled
                                            />
                                        ) : (
                                            <input
                                                type={'checkbox'}
                                                onClick={(e) =>
                                                    (wizard[step - 1][
                                                        inputIndex
                                                    ].answer =
                                                        checkboxIndex + 1)
                                                }
                                            />
                                        )}
                                        <img src={imgUrl} alt={input.label} />
                                    </div>
                                ))}
                            </>
                        )}

                        {input.value === 'checkboxes' && (
                            <>
                                <label
                                    className={stepClasses.label}
                                    htmlFor={`checkboxes-${inputIndex}`}
                                >
                                    {input.label}
                                </label>
                                {data &&
                                    data.map((checkbox, checkboxIndex) => {
                                        return (
                                            <div
                                                key={checkboxIndex}
                                                className={
                                                    stepClasses.checkboxGroup
                                                }
                                            >
                                                {readonly ? (
                                                    <input
                                                        type={'checkbox'}
                                                        checked={
                                                            input.answer - 1 ===
                                                            checkboxIndex
                                                        }
                                                        disabled
                                                    />
                                                ) : (
                                                    <input
                                                        type={'checkbox'}
                                                        onClick={(e) =>
                                                            (wizard[step - 1][
                                                                inputIndex
                                                            ].answer =
                                                                checkboxIndex +
                                                                1)
                                                        }
                                                    />
                                                )}
                                                <label>{checkbox}</label>
                                            </div>
                                        );
                                    })}
                            </>
                        )}
                    </div>
                );
            })}
            <hr />
            <>
                {!isFirstStep && (
                    <button onClick={previousStep}>Previous ⏮️</button>
                )}
                {step === total && !readonly && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            submitResults(wizard);
                        }}
                    >
                        Submit wizard ⏮️
                    </button>
                )}
                {!isLastStep && <button onClick={next}>Next ⏭</button>}
            </>
        </form>
    );
};

export default WizardContainer;
