import { useState } from 'react'
import './App.css'
import { useRef } from 'react';

function App() {

  const [calc, setCalc] = useState("0");
  const [result, setResult] = useState("0");
  const lastCalc = useRef("0");

  const checkPrevPunctuation = (string) => {
    if(!string) return
    for(let i = string.length-1; i>=0; i--){
      if(!isNaN(string[i])){
        continue;
      } else{
        if(string[i] == "."){
          return true;
        } else{
          return false;
        }
      }
    }
  }

  const handleInput = (event) => {
    const input=event.target.value;
    const isSymbol = (symbol) => {
      return(isNaN(symbol));
    }
    const myInput = isSymbol(input) ? "symbol" : "number"
    switch(myInput){

      case "symbol":
        if(input == "AC") {
          setCalc("0");
          setResult("0")
          lastCalc.current = "0";
        } else if(input == "."){
          setCalc(prevCalc => 
            prevCalc == "0" ? prevCalc+input
            : isSymbol(prevCalc[prevCalc.length-1]) ? prevCalc 
            : checkPrevPunctuation(prevCalc) ? prevCalc 
            : prevCalc+input
          )
        } else if(input == "=" && !isNaN(calc[calc.length-1])){
          if(lastCalc.current == "0" || !isNaN(calc[0])){
            lastCalc.current = calc;
            setResult(eval(calc));
            setCalc("0")
          } else {
            lastCalc.current = "("+lastCalc.current + ")" + calc;
            setResult(lastCalc.current +" = "+eval(lastCalc.current))
            setCalc("0");
          }
        }else{
          setCalc(prevCalc => 
            prevCalc == "0" 
            ? lastCalc.current == 0
            ? prevCalc
            : input 
            : isSymbol(prevCalc[prevCalc.length-1]) 
            ? prevCalc
            : prevCalc+input)
        }
        break;

      case "number":
        if(input == "0"){
          setCalc(prevCalc => prevCalc[prevCalc.length-1] == 0 && prevCalc.length <= 1 ? "0" : prevCalc+input)
        } else {
          setCalc(prevCalc => prevCalc[prevCalc.length-1] == 0 && prevCalc.length <= 1  ? input : prevCalc+input);
        }
    }
  }

  return (
    <main className='bg-secondary'>
      <div className="container calc-container bg-primary">
        <h1 className='text-center pt-3'>QUEHASIO</h1>
        <div className="text-container pt-3 pe-3 ps-3">
          <div className="row preview d-flex justify-content-end bg-black rounded-top">
            <p className='text-end text-white result-text'>{result.length > 18 ? "..."+result.slice(result.length - 18) : result}</p>      
          </div>

          <div className="row result d-flex justify-content-end bg-black mb-3 rounded-bottom">
            <p id="display" className='text-end text-white calc-text'>{calc.length > 18 ? "..."+calc.slice(result.length - 18) : calc}</p>
          </div>
        </div>

        <div className="button-container ps-4 pb-4 pe-4">

          <div className="row buttons-first">
            <button id="clear" onClick={handleInput} value="AC" className="col-6 btn btn-outline-primary bg-white">
              AC
            </button>
            <button id="divide" onClick={handleInput} value="/" className="col-3 btn btn-outline-primary bg-white">
              /
            </button>
            <button id="multiply" onClick={handleInput} value="*" className="col-3 btn btn-outline-primary bg-white">
              ×
            </button>
          </div>

          <div className="row buttons-second">
            <button id="seven" onClick={handleInput} value="7" className="col-3 btn btn-outline-primary bg-white">
              7
            </button>
            <button id="eight" onClick={handleInput} value="8" className="col-3 btn btn-outline-primary bg-white">
              8
            </button>
            <button id="nine" onClick={handleInput} value="9" className="col-3 btn btn-outline-primary bg-white">
              9
            </button>
            <button id="subtract" onClick={handleInput} value="-" className="col-3 btn btn-outline-primary bg-white">
              -
            </button>
          </div>

          <div className="row buttons-third">
            <button id="four" onClick={handleInput} value="4" className="col-3 btn btn-outline-primary bg-white">
              4
            </button>
            <button id="five" onClick={handleInput} value="5" className="col-3 btn btn-outline-primary bg-white">
              5
            </button>
            <button id="six" onClick={handleInput} value="6" className="col-3 btn btn-outline-primary bg-white">
              6
            </button>
            <button id="add" onClick={handleInput} value="+" className="col-3 btn btn-outline-primary bg-white">
              +
            </button>
          </div>

          <div className="row buttons-fourthfifth">
            <div className="col-9">
              <div className="row buttons-fourth">
                <button id="one" onClick={handleInput} value="1" className="col-4 btn btn-outline-primary bg-white">
                  1
                </button>
                <button id="two" onClick={handleInput} value="2" className="col-4 btn btn-outline-primary bg-white">
                  2
                </button>
                <button id="three" onClick={handleInput} value="3" className="col-4 btn btn-outline-primary bg-white">
                  3
                </button>
              </div>
              <div className="row buttons-fifth">
                <button id="zero" onClick={handleInput} value="0" className="col-8 btn btn-outline-primary bg-white">
                  0
                </button>
                <button id="decimal" onClick={handleInput} value="." className="col-4 btn btn-outline-primary bg-white">
                  .
                </button>
              </div>
            </div>

            <div className="col-3">
              <div className="row h-100">
                <button id="equals" onClick={handleInput} value="=" className="col button-equal btn btn-outline-primary bg-white">
                  =
                </button>
              </div>
            </div>
          </div>
        </div>


      </div>
    </main>
  )
}

export default App
