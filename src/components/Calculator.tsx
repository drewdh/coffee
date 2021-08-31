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
        <div className="w-100">
            <h2 className="text-center mt-3 mb-4">Coffee calculator</h2>
            <p className="text-white-50 small mb-4 text-center">Calculates water needed to make pour-over coffee based on coffee weight. Uses a 16:1 ratio.</p>
            <h5 className="text-center">Coffee</h5>
            {Boolean(recentValues.length) && (
                <div className="mb-3 d-flex justify-content-center">
                    {recentValues.map((value, index) => (
                        <button
                            className="btn btn-sm btn-light me-1"
                            key={index}
                            onClick={() => setKnownValue(value)}
                            style={{cursor: 'pointer', width: '33%'}}
                        >
                            {getLabel(value)}g
                        </button>
                    ))}
                </div>
            )}
            <div className="form-floating mb-5 mw-100">
                <input
                    id="knownValue"
                    className="form-control form-control-lg mw-100"
                    placeholder="Coffee weight (g)"
                    inputMode="decimal"
                    onChange={handleChange}
                    value={knownValue}
                />
                <label htmlFor="knownValue">Coffee weight (g)</label>
            </div>

            {knownValue && Number(knownValue) > 0 && (
                <>
                    <h5 className="text-center">Method</h5>

                    <table className="table">
                        <thead>
                        <tr>
                            <th>Step</th>
                            <th className="text-end">Add water</th>
                            <th className="text-end">Total water</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Bloom</td>
                            <td className="text-end">+{getLabel(knownValue)}g</td>
                            <td className="text-end">{getLabel(knownValue)}g</td>
                        </tr>
                        <tr>
                            <td>Pour 1</td>
                            <td className="text-end">+{getLabel((water - Number(knownValue))/3)}g</td>
                            <td className="text-end">{getLabel(((water - Number(knownValue))/3) + Number(knownValue))}g</td>
                        </tr>
                        <tr>
                            <td>Pour 2</td>
                            <td className="text-end">+{getLabel((water - Number(knownValue))/3)}g</td>
                            <td className="text-end">{getLabel(((water - Number(knownValue))/3)*2 + Number(knownValue))}g</td>
                        </tr>
                        <tr>
                            <td>Pour 3</td>
                            <td className="text-end">+{getLabel((water - Number(knownValue))/3)}g</td>
                            <td className="text-end">{getLabel(((water - Number(knownValue))/3)*3 + Number(knownValue))}g</td>
                        </tr>
                        </tbody>
                    </table>
                </>
            )}

            {/*<p>Bloom with {getLabel(knownValue)}g water.</p>*/}
            {/*<p>Add {getLabel((water - Number(knownValue))/3)}g water for a total water weight of {getLabel(((water - Number(knownValue))/3) + Number(knownValue))}g.</p>*/}
            {/*<p>Add {getLabel((water - Number(knownValue))/3)}g water for a total water weight of {getLabel(((water - Number(knownValue))/3)*2 + Number(knownValue))}g.</p>*/}
            {/*<p>Add {getLabel((water - Number(knownValue))/3)}g water for a total water weight of {getLabel(((water - Number(knownValue))) + Number(knownValue))}g.</p>*/}


            {/*<div className="card">*/}
            {/*    <h6 className="card-body mb-0 border-bottom">Water</h6>*/}
            {/*<ul className="list-group list-group-flush">*/}
            {/*    <li className="list-group-item justify-content-between d-flex align-items-center">*/}
            {/*        <div>*/}
            {/*            <div className="fw-bolds">Bloom</div>*/}
            {/*            <span className="text-muted">*/}
            {/*                <small>*/}
            {/*                    Add {getLabel(knownValue)}g water*/}
            {/*                </small>*/}
            {/*            </span>*/}
            {/*        </div>*/}
            {/*        <div className="text-end">*/}
            {/*            <div>{getLabel(knownValue)}g total</div>*/}
            {/*        </div>*/}
            {/*    </li>*/}
            {/*    <li className="list-group-item justify-content-between d-flex align-items-center">*/}
            {/*        <div>*/}
            {/*            <div className="fw-bolds">Pour 1</div>*/}
            {/*            <span className="text-muted">*/}
            {/*                <small>*/}
            {/*                    Add {getLabel((water - Number(knownValue))/3)}g water*/}
            {/*                </small>*/}
            {/*            </span>*/}
            {/*        </div>*/}
            {/*        <div className="text-end">*/}
            {/*            <div>{getLabel(((water - Number(knownValue))/3) + Number(knownValue))}g total</div>*/}
            {/*        </div>*/}
            {/*    </li>*/}
            {/*    <li className="list-group-item justify-content-between d-flex align-items-center">*/}
            {/*        <div>*/}
            {/*            <div className="fw-bolds">Pour 2</div>*/}
            {/*            <span className="text-muted">*/}
            {/*                <small>*/}
            {/*                    Add {getLabel((water - Number(knownValue))/3)}g water*/}
            {/*                </small>*/}
            {/*            </span>*/}
            {/*        </div>*/}
            {/*        <div className="text-end">*/}
            {/*            <div>{getLabel(((water - Number(knownValue))/3)*2 + Number(knownValue))}g total</div>*/}
            {/*        </div>*/}
            {/*    </li>*/}
            {/*    <li className="list-group-item justify-content-between d-flex align-items-center">*/}
            {/*        <div>*/}
            {/*            <div className="fw-bolds">Pour 2</div>*/}
            {/*            <span className="text-muted">*/}
            {/*                <small>*/}
            {/*                    Add {getLabel((water - Number(knownValue))/3)}g water*/}
            {/*                </small>*/}
            {/*            </span>*/}
            {/*        </div>*/}
            {/*        <div className="text-end">*/}
            {/*            <div>{getLabel(((water - Number(knownValue))) + Number(knownValue))}g total</div>*/}
            {/*        </div>*/}
            {/*    </li>*/}
            {/*</ul>*/}
            {/*</div>*/}
            {/*<div className="card card-body">*/}
            {/*    <h6 className="card-title">Water Weight</h6>*/}
            {/*    <h1 className="mb-0">*/}
            {/*        {getLabel(water)}*/}
            {/*        <small className="text-muted fw-normal"> grams</small>*/}
            {/*    </h1>*/}
            {/*</div>*/}
        </div>
    )
}

export default Calculator;

function getLabel(value: number | string) {
    const number: number = Number(value) || 0;
    const rounded: string = number.toFixed(1);
    return `${Number(rounded).toLocaleString()}`;
}
