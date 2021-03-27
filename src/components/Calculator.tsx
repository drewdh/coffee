import React from 'react';

enum Measurement {
    GroundCoffee = 'ground',
    BrewedCoffee = 'brewed',
    Water = 'water',
}

const measurementOptions = [
    {
        id: Measurement.GroundCoffee,
        label: 'Ground coffee',
    },
    {
        id: Measurement.BrewedCoffee,
        label: 'Brewed coffee',
        disabled: true,
    },
    {
        id: Measurement.Water,
        label: 'Water',
    },
];

function Calculator() {
    const unit = 'g';
    const [measurement, setMeasurement] = React.useState<Measurement>(Measurement.GroundCoffee);
    const [knownValue, setKnownValue] = React.useState<string>('');
    const [ratio] = React.useState<number>(16);

    const water = React.useMemo((): number => {
        let water = 0;
        const value = Number(knownValue);
        if (measurement === Measurement.Water) {
            water = value;
        } else if (measurement === Measurement.GroundCoffee) {
            water = value * ratio;
        }
        return water;
    }, [knownValue, measurement, ratio]);

    const coffee = React.useMemo((): number => {
        let coffee = 0;
        const value = Number(knownValue);
        if (measurement === Measurement.GroundCoffee) {
            coffee = value;
        } else if (measurement === Measurement.Water) {
            coffee = Number((value / ratio).toPrecision(1));
        }
        return coffee;
    }, [knownValue, measurement, ratio]);

    return (
        <>
            <div className="mb-3">
                <label className="form-label">Measurement</label>
                {measurementOptions.map(option => (
                    <div className="form-check" key={option.id}>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="knownMeasurement"
                            onChange={e => setMeasurement(e.currentTarget.value as Measurement)}
                            id={option.id}
                            disabled={option.disabled}
                            checked={measurement === option.id}
                            value={option.id}
                        />
                        <label className="form-check-label" htmlFor={option.id}>
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>

            <div className="mb-3">
                <label className="form-label" htmlFor="knownValue">Known value</label>
                <div className="input-group">
                    <input
                        className="form-control"
                        id="knownValue"
                        inputMode="decimal"
                        onFocus={e => e.target.select()}
                        onChange={e => setKnownValue(e.currentTarget.value)}
                        value={knownValue}
                    />
                    <span className="input-group-text">g</span>
                </div>
            </div>

            <hr/>

            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between">
                    <span>Ground coffee</span>
                    <span>{getLabel(coffee, unit)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span>Water weight after bloom</span>
                    <span>{getLabel(coffee, unit)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span>Water weight after pour 1</span>
                    <span>{getLabel(((water - coffee) * (1/3)) + coffee, unit)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span>Water weight after pour 2</span>
                    <span>{getLabel(((water - coffee) * (2/3)) + coffee, unit)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span>Water weight after pour 3</span>
                    <span>{getLabel(((water - coffee) * (3/3)) + coffee, unit)}</span>
                </li>
            </ul>
        </>
    )
}

export default Calculator;

function getLabel(value: number, unit: string) {
    return `${Number(value.toFixed(1)).toLocaleString()}${unit}`;
}
