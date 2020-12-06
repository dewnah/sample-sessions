import React, { useState, useRef } from 'react';
import instruments from './data/instruments';
import genres from './data/genres';
import sample from 'lodash/sample';
import isNumber from 'lodash/isNumber';
import random from 'lodash/random';
import './App.scss';

const App = () => {
    const [genre, setGenre] = useState();
    const [instrument, setInstrument] = useState();
    const [pageNumber, setPageNumber] = useState();
    const [sampleNumber, setSampleNumber] = useState();
    const inputRef = useRef();

    const renderStepOne = () => {
        return (
            <div className="step-one">
                <div className="genre">
                    <span className="label">Genre</span>
                    <p className="result">{genre}</p>
                </div>
                <div className="instrument">
                    <span className="label">Instrument</span>
                    <p className="result">{instrument}</p>
                </div>
            </div>
        );
    };

    const submitForm = (event) => {
        event.preventDefault();

        const samplesPerPage = 50;

        const value = parseInt(inputRef?.current?.value);

        if (value && isNumber(value)) {
            const numberOfPages = Math.ceil(value / samplesPerPage);
            const samplesOnLastPage =
                value % samplesPerPage !== 0 ? value % samplesPerPage : 50;

            const newPageNumber = random(1, numberOfPages);

            setPageNumber(newPageNumber);
            setSampleNumber(
                newPageNumber === numberOfPages
                    ? random(1, samplesOnLastPage)
                    : random(1, 50)
            );
        }
    };

    const start = () => {
        setGenre(sample(genres));
        setInstrument(sample(instruments));
    };

    const renderHowManySamples = () => {
        return (
            <form onSubmit={(e) => submitForm(e)} className="samples-form">
                <label htmlFor="num-results">
                    Enter the number of sample results
                </label>
                <input name="num-results" type="number" ref={inputRef}></input>
            </form>
        );
    };

    const renderStepTwo = () => {
        let result = renderHowManySamples();

        if (pageNumber && sampleNumber) {
            result = (
                <div className="sample">
                    <span className="label">Your Sample</span>
                    <p className="result">
                        Page {pageNumber}
                        <br />
                        Sample {sampleNumber}
                    </p>
                </div>
            );
        }
        return <div className="step-two">{result}</div>;
    };

    const renderStart = () => {
        return (
            <div className="start">
                <button onClick={() => start()}>Start</button>
            </div>
        );
    };

    const getSpliceURL = () => {
        const format = (string) => {
            return string.toLowerCase().replace(/ /g, '-');
        };

        return `https://splice.com/sounds/search?instrument=${instrument}&sound_type=sample&genre=${format(
            genre
        )}${pageNumber ? `&page=${pageNumber}` : ''}`;
    };

    const renderGenerator = () => {
        if (!genre && !instrument) {
            return <div className="generator">{renderStart()}</div>;
        } else {
            return (
                <>
                    <div className="generator">
                        {renderStepOne()}
                        {renderStepTwo()}
                    </div>
                    <a
                        href={getSpliceURL()}
                        target="_blank"
                        rel="noreferrer"
                        className="link"
                    >
                        View Samples on Splice
                    </a>
                </>
            );
        }
    };

    return (
        <div className="App">
            <div className="generator-wrapper">{renderGenerator()}</div>
        </div>
    );
};

export default App;
