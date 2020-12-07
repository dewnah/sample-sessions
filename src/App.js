import React, { useState, useEffect } from 'react';
import sample from 'lodash/sample';
import instruments from './data/instruments';
import genres from './data/genres';
import './App.scss';

const App = () => {
    const [genre] = useState(sample(genres));
    const [instrument] = useState(sample(instruments));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 600);
    }, []);

    const getSpliceUrl = (type) => {
        let url = 'https://splice.com/sounds';

        if (type === 'instrument') {
            url += `/search?instrument=${instrument?.key}&sort=random`;
        } else if (type === 'genre') {
            url += `/genres/${genre?.key}?sort=random`;
        } else {
            url += `/search?instrument=${instrument?.key}&sound_type=sample&genre=${genre?.key}&sort=random`;
        }

        return url;
    };

    const renderResult = (label, value) => {
        return (
            <a
                className={`results--category ${label.toLowerCase()}`}
                href={getSpliceUrl(label.toLowerCase())}
                target="_blank"
                rel="noreferrer"
            >
                <span className="label">{label}</span>
                <p className="value">
                    <span className="value--text">{value}</span>
                </p>
            </a>
        );
    };

    return (
        <div className="app">
            <div className={`container ${loading ? 'loading' : ''}`}>
                <div className="results">
                    {renderResult('Genre', genre?.label)}
                    {renderResult('Instrument', instrument?.label)}
                </div>
                <a
                    className="results--link"
                    href={getSpliceUrl()}
                    target="_blank"
                    rel="noreferrer"
                >
                    <span>View Samples</span>
                </a>
            </div>
        </div>
    );
};

export default App;
