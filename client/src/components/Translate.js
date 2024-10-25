// Translate.js

import React, { useEffect } from "react";
import countries from "./data.js";


const Translate = () => {
    useEffect(() => {
        const fromText = document.querySelector(".from-text");
        const toText = document.querySelector(".to-text");
        const exchageIcon = document.querySelector(".exchange");
        const selectTag = document.querySelectorAll("select");
        const icons = document.querySelectorAll(".row i");
        const translateBtn = document.querySelector("button");
        selectTag.forEach((tag, id) => {
            for (let country_code in countries) {
                let selected =
                    id === 0
                        ? country_code === "en-GB"
                            ? "selected"
                            : ""
                        : country_code === "hi-IN"
                            ? "selected"
                            : "";
                let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
                tag.insertAdjacentHTML("beforeend", option);
            }
        });

        exchageIcon.addEventListener("click", () => {
            console.log("helo");
            let tempText = fromText.value;
            let tempLang = selectTag[0].value;
            console.log(tempText);
            console.log(tempLang);
            fromText.value = toText.value;
            toText.value = tempText;
            selectTag[0].value = selectTag[1].value;
            selectTag[1].value = tempLang;
        });

        fromText.addEventListener("keyup", () => {
            if (!fromText.value) {
                toText.value = "";
            }
        });

        translateBtn.addEventListener("click", async () => {
            let text = fromText.value.trim();
            let translateFrom = selectTag[0].value;
            let translateTo = selectTag[1].value;
            if (!text) return;
            toText.setAttribute("placeholder", "Translating...");
            try {
                const response = await
                    fetch(`http://localhost:5000/?text=${text}&source=${translateFrom}&target=${translateTo}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const translatedText = await response.text();
                toText.value = translatedText;
                toText.setAttribute("placeholder", "Translation");
            } catch (error) {
                console.error("Fetch error:", error);
                toText.setAttribute("placeholder", "Error in translation");
            }
        });


        icons.forEach((icon) => {
            icon.addEventListener("click", ({ target }) => {
                if (!fromText.value || !toText.value) return;
                if (target.classList.contains("fa-copy")) {
                    if (target.id === "from") {
                        navigator.clipboard.writeText(fromText.value);
                    } else {
                        navigator.clipboard.writeText(toText.value);
                    }
                } else {
                    let utterance;
                    if (target.id === "from") {
                        utterance = new SpeechSynthesisUtterance(fromText.value);
                        utterance.lang = selectTag[0].value;
                    } else {
                        utterance = new SpeechSynthesisUtterance(toText.value);
                        utterance.lang = selectTag[1].value;
                    }
                    speechSynthesis.speak(utterance);
                }
            });
        });
    }, []);
    return (
        <>
            <div className="above-container ">
                <img
                    src={"data:image/jpeg;base64,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"}
                    className="above-container-content"
                    alt="translation-logo"
                />
                <h1 className="above-container-content">Translate</h1>
            </div>

            <div className="container">
                <div className="wrapper">
                    <div className="text-input">
                        <textarea
                            spellCheck="false"
                            className="from-text"
                            placeholder="Enter text"
                        ></textarea>
                        <textarea
                            spellCheck="false"
                            readOnly
                            disabled
                            className="to-text"
                            placeholder="Translation"
                        ></textarea>
                    </div>
                    <ul className="controls">
                        <li className="row from">
                            <div className="icons">
                                <i id="from" className="fas fa-volume-up"></i>
                                <i id="from" className="fas fa-copy"></i>
                            </div>
                            <select></select>
                        </li>
                        <li className="exchange">
                            <i className="fas fa-exchange-alt"></i>
                        </li>
                        <li className="row to">
                            <select></select>
                            <div className="icons">
                                <i id="to" className="fas fa-volume-up"></i>
                                <i id="to" className="fas fa-copy"></i>
                            </div>
                        </li>
                    </ul>
                </div>
                <button>Translate Text</button>
            </div>
        </>
    );
};

export default Translate;
