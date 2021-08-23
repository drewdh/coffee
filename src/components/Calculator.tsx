import React from 'react';

const localStorageKey = 'coffee-calculator-known-value';
const recentValuesLimit = 3;

function Calculator() {
    const [recentValues, setRecentValues] = React.useState<string[]>([]);
    const [knownValue, setKnownValue] = React.useState<string>('');
    const [ratio] = React.useState<number>(16);

    React.useEffect((): void => {
        if (!localStorage) {
            return;
        }
        const recentValuesItem = localStorage.getItem(localStorageKey) || '';
        try {
            const parsedRecentValues = JSON.parse(recentValuesItem);
            if (Array.isArray(parsedRecentValues)) {
                const validValues = parsedRecentValues.filter(value => !isNaN(value));
                setRecentValues(validValues);
            }
        } catch (e) {}
    }, []);

    const water = React.useMemo((): number => {
        return Number(knownValue) * ratio;
    }, [knownValue, ratio]);

    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.currentTarget.value;
        if (isNaN(Number(value))) {
            return;
        }
        setKnownValue(value);
        if (!localStorage) {
            return;
        }
        const newRecentValues = [value, ...recentValues]
            .filter((value, index, self) => self.indexOf(value) === index)
            .slice(0, recentValuesLimit);
        localStorage.setItem(localStorageKey, JSON.stringify(newRecentValues));
    }, [recentValues]);

    return (
        <>
            <h3>Coffee</h3>
            <div className="card card-body mb-3">
                <label className="h6 card-title" htmlFor="knownValue">Coffee</label>
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

                {Boolean(recentValues.length) && (
                    <div className="mt-3">
                        <h6>Recents</h6>
                        {recentValues.map((value, index) => (
                            <button
                                className="btn btn-secondary rounded-pill me-2 px-3"
                                key={index}
                                onClick={() => setKnownValue(value)}
                                style={{cursor: 'pointer'}}
                            >
                                {getLabel(value)}g
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <h3>Water</h3>
            <ul className="list-group">
                <li className="list-group-item justify-content-between d-flex align-items-center">
                    <div>
                        <div className="fw-bolds">Bloom</div>
                        <span className="text-muted">
                            <small>
                                Add {getLabel(knownValue)}g water
                            </small>
                        </span>
                    </div>
                    <div className="text-end">
                        <div>{getLabel(knownValue)}g total</div>
                    </div>
                </li>
                <li className="list-group-item justify-content-between d-flex align-items-center">
                    <div>
                        <div className="fw-bolds">Pour 1</div>
                        <span className="text-muted">
                            <small>
                                Add {getLabel((water - Number(knownValue))/3)}g water
                            </small>
                        </span>
                    </div>
                    <div className="text-end">
                        <div>{getLabel(((water - Number(knownValue))/3) + Number(knownValue))}g total</div>
                    </div>
                </li>
                <li className="list-group-item justify-content-between d-flex align-items-center">
                    <div>
                        <div className="fw-bolds">Pour 2</div>
                        <span className="text-muted">
                            <small>
                                Add {getLabel((water - Number(knownValue))/3)}g water
                            </small>
                        </span>
                    </div>
                    <div className="text-end">
                        <div>{getLabel(((water - Number(knownValue))/3)*2 + Number(knownValue))}g total</div>
                    </div>
                </li>
                <li className="list-group-item justify-content-between d-flex align-items-center">
                    <div>
                        <div className="fw-bolds">Pour 2</div>
                        <span className="text-muted">
                            <small>
                                Add {getLabel((water - Number(knownValue))/3)}g water
                            </small>
                        </span>
                    </div>
                    <div className="text-end">
                        <div>{getLabel(((water - Number(knownValue))) + Number(knownValue))}g total</div>
                    </div>
                </li>
            </ul>
            {/*<div className="card card-body">*/}
            {/*    <h6 className="card-title">Water Weight</h6>*/}
            {/*    <h1 className="mb-0">*/}
            {/*        {getLabel(water)}*/}
            {/*        <small className="text-muted fw-normal"> grams</small>*/}
            {/*    </h1>*/}
            {/*</div>*/}
        </>
    )
}

export default Calculator;

function getLabel(value: number | string) {
    const number: number = Number(value) || 0;
    const rounded: string = number.toFixed(1);
    return `${Number(rounded).toLocaleString()}`;
}
