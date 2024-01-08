import React, { useState, useRef } from 'react';

export default function TextForm(props) {
    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);  
        props.showAlert("Converted to Upper Case", "success");
    }
    const handleLoClick = () => {
        let newText = text.toLowerCase();
        setText(newText);  
        props.showAlert("Converted to Lower Case", "success");
    }
    const handleClClick = () => {
        let newText = '';
        setText(newText);  
        props.showAlert("The text is cleared", "success");
    }
    const handleOnChange = (event) => {
        const newText = event.target.value;
        setText(newText);
        textHistory.current = textHistory.current.slice(0, currentStep.current + 1);
        textHistory.current.push(newText);
        currentStep.current++;
    }
    const handleSpeak = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
        props.showAlert("Text to speech is on", "success");
    }
    const handleStop=()=>{
        window.speechSynthesis.cancel();
        props.showAlert("Text to speech is stopped", "success");
    };
    const handleTitleClick = () => {
        function capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
          }
        const newText = text.split(' ').map(capitalize).join(' ');
        setText(newText);
        props.showAlert("Converted to Title Case", "success");
    };
    const handleUndo = () => {
        if (currentStep.current > 0) {
          currentStep.current--;
          setText(textHistory.current[currentStep.current]);
        }
    };
    const handleRedo = () => {
        if (currentStep.current < textHistory.current.length - 1) {
          currentStep.current++;
          setText(textHistory.current[currentStep.current]);
        }
    };
    const handleCopy=()=>{
        navigator.clipboard.writeText(text);
        props.showAlert("Copied To Clipboard", "success");
    };
    const handleTextStatistics = () => {
        const words = text.split(/\s+/);
        const wordCount = words.length;
        const charCount = text.length;
        const averageWordLength = charCount / wordCount || 0;
        props.showAlert(`Average Word Length: ${averageWordLength.toFixed(2)} characters.`, "success");
    };
    const handleLineFormatting = () => {
        let formattedText = text.replace(/\n/g, " "); // Convert line breaks to spaces
        setText(formattedText);
        props.showAlert("Text line is formatted", "success");
    };
    const handleReverse = () => {
        let reversedText = text.split('').reverse().join('');
        setText(reversedText);
        props.showAlert("The Text is reversed", "success");
    };
    const handleExSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("The extra spaces are cleared", "success");
    };

    const [text, setText] = useState('');
    const textHistory = useRef([text]);
    const currentStep = useRef(0);
    let sec = Math.ceil((text.split(" ").filter((element)=>{return element.length !==0}).length/200)*60);
    let minutes =Math.floor((text.split(" ").filter((element)=>{return element.length !==0}).length/200));
    let seconds = sec % 60;

    return (
        <>
         <div className="container" style={{color: props.mode==='dark'?'white':'black'}}>
            <h1>{props.head}</h1>
            <div className="mb-3">
                <label htmlFor="TheText" className="form-label">The Text :</label>
                <textarea className="form-control" value={text} placeholder="Enter your text" onChange={handleOnChange} style={{backgroundColor: props.mode==='light'?'white':'#21466c', color: props.mode==='dark'?'white':'black'}} id="TheText" rows="11"></textarea>
            </div>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Upper Case</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Lower Case</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleClClick}>Clear Text</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleTitleClick}>Title Case</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleExSpaces}>Remove Extra Spaces</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLineFormatting}>Line Formatting</button>
            <button className="btn btn-primary mx-1 my-1" onClick={handleUndo}>Undo</button>
            <button className="btn btn-primary mx-1 my-1" onClick={handleRedo}>Redo</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleReverse}>Reverse Text</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy Text</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleTextStatistics}>Text Statistics</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleSpeak}>Read It</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleStop}>Stop Reading</button>
            
        </div>
        <div className="container my-2" style={{color: props.mode==='dark'?'white':'black'}}>
            <h3>Your text summary :</h3>
            <p>Words {text.split(/\s+/).filter((element)=>{return element.length !==0}).length} & Characters {text.length}.</p>
            <h3>Preview :</h3>
            <h5>{text.length>0?text:"Write something in the text box to preview."}</h5>
            <p>Estimated reading time: {minutes} minutes and {seconds} seconds(approximately).</p>
        </div>
        </>
     )
}
