import React from 'react';

const localStorageKey = 'coffee-calculator-known-value';

function Calculator() {
    const [knownValue, setKnownValue] = React.useState<string>('');
    const [ratio] = React.useState<number>(16);

    React.useEffect((): void => {
        if (!localStorage) {
            return;
        }
        const knownValue = localStorage.getItem(localStorageKey) || '';
        setKnownValue(knownValue);
    }, []);

    const water = React.useMemo((): number => {
        const value = Number(knownValue || 0);
        return value * ratio;
    }, [knownValue, ratio]);

    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.currentTarget.value;
        if (localStorage) {
            localStorage.setItem(localStorageKey, value);
        }
        setKnownValue(value);
    }, []);

    return (
        <>
            <div className="card card-body mb-3">
                <label className="h6 text-primary card-title" htmlFor="knownValue">Coffee</label>
                <div className="input-group input-group-lg">
                    <input
                        className="form-control"
                        id="knownValue"
                        placeholder="Coffee"
                        inputMode="decimal"
                        onFocus={e => e.target.select()}
                        onChange={handleChange}
                        value={knownValue}
                    />
                    <span className="input-group-text">g</span>
                </div>
            </div>

            <div className="card card-body">
                <h6 className="card-title text-primary">Water Weight</h6>
                <h1 className="mb-0">
                    {getLabel(water)}
                    <small className="text-muted fw-normal"> grams</small>
                </h1>
            </div>
        </>
    )
}

export default Calculator;

function getLabel(value: number) {
    const number: number = Number(value) || 0;
    const rounded: string = number.toFixed(1);
    return `${Number(rounded).toLocaleString()}`;
}
