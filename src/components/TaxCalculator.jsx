import React from "react";
import { useState, useEffect } from "react";
import classNames from 'classnames';
import '../App.css'
import Cleave from "cleave.js/react";
import { FAQs, IncomeIntervals, taxRates} from "./Data";

const TaxCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [expenses, setExpenses] = useState("");
  const [shortTerm, setShortTerm] = useState(false);
  const [longTerm, setLongTerm] = useState(false);
  const [taxIndex, setTaxIndex] = useState(0);
  const [capitalGains, setCapitalGains] = useState(0);
  const [longTermDiscount, setLongTermDiscount] = useState(0);
  const [netCapitalGains, setNetCapitalGains] = useState(0);
  const [taxToPay, setTaxToPay] = useState(0);

  const getNumericValue = (formattedValue) => {
    return parseFloat(formattedValue.replace(/,/g, ""));
  };
  const handlePurchasePrice = (e) => {
    setPurchasePrice(e.target.value);
  }
  const handleSalePrice = (e) => {
    setSalePrice(e.target.value)
  }
  const handleExpenses = (e) => {
    setExpenses(e.target.value)
  }
  const handleTaxIndex = (e) => {
    setTaxIndex(parseInt(e.target.value));
    calculateTaxes();  
  }

  useEffect(() => {
    if (taxIndex === 0) {
      setTaxToPay(0);
    } else if (taxIndex === 1) {
      if (shortTerm) {
        let x = 19 * capitalGains / 100
        setTaxToPay(x);
      } else {
        let x = 19 * longTermDiscount / 100
        setTaxToPay(x);
      }
    } else if (taxIndex === 2) {
      if (shortTerm) {
        let x = 32.5 * capitalGains / 100
        setTaxToPay(x);
      } else {
        let x = 32.5 * longTermDiscount / 100
        setTaxToPay(x);
      }
    } else if (taxIndex === 3) {
      if (shortTerm) {
        let x = 37 * capitalGains / 100
        setTaxToPay(x);
      } else {
        let x = 37 * longTermDiscount / 100
        setTaxToPay(x);
      }
    } else if (taxIndex === 4) {
      if (shortTerm) {
        let x = 45 * capitalGains / 100
        setTaxToPay(x);
      } else {
        let x = 45 * longTermDiscount / 100
        setTaxToPay(x);
      }
    }
  },[longTerm, shortTerm, netCapitalGains, longTermDiscount, taxIndex, capitalGains])

  const calculateTaxes = () => {

    if (purchasePrice !== "" && salePrice !== "" && expenses !== "") {
      let saleprice = getNumericValue(salePrice);
      let purchaseprice = getNumericValue(purchasePrice);
      let expenseprice = getNumericValue(expenses);
      setCapitalGains((saleprice - purchaseprice) - expenseprice);
      if (capitalGains > 0) {
        setLongTermDiscount(capitalGains / 2);
      }

      if (longTerm) {
        setNetCapitalGains((capitalGains - longTermDiscount));
      } else {
        setNetCapitalGains(capitalGains);
      }
    }
  }

  return (
    <>
      <div className="frame">
        <div className="frame-wrapper">
          <div className="div">
            <p className="text-wrapper">Free Crypto Tax Calculator Australia</p>
            <div className="div-2">
              <div className="div-3">
                <div className="div-4">
                  <div className="text-wrapper-2">Financial Year</div>
                  <div className="div-wrapper">
                    <div className="frame-wrapper-2">
                      <div className="div-5">
                        <div className="text-wrapper-3">
                          FY 2023-24
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="div-4">
                  <div className="text-wrapper-2">Country</div>
                  <div className="div-6">
                    <div className="frame-wrapper-3">
                      <div className="div-7">
                        <div className="div-8">
                          <img
                            className="emojione-flag-for"
                            alt="Emojione flag for"
                            src='./Images/Australia_flag.svg'
                          />
                          <div className="text-wrapper-4">
                            Australia
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hr" />
              <div className="div-9">
                <div className="div-10">
                  <p className="text-wrapper-5">Enter purchase price of Crypto</p>
                  <div className="div-wrapper-2">
                    <div className="text-wrapper-3">$ <Cleave className="input" options={{ numeral: true }} value={purchasePrice} onChange={(e) => handlePurchasePrice(e)} /></div>
                  </div>
                </div>
                <div className="div-10">
                  <p className="text-wrapper-5">Enter sale price of Crypto</p>
                  <div className="div-wrapper-2">
                    <div className="text-wrapper-3">$  <Cleave className="input" options={{ numeral: true }} value={salePrice} onChange={(e) => handleSalePrice(e)} /></div>
                  </div>
                </div>
              </div>
              <div className="div-9">
                <div className="div-10">
                  <div className="text-wrapper-5">Enter your Expenses</div>
                  <div className="div-wrapper-2">
                    <div className="text-wrapper-3">$ <Cleave className="input" options={{ numeral: true }} value={expenses} onChange={(e) => handleExpenses(e)} /></div>
                  </div>
                </div>
                <div className="div-10">
                  <div className="text-wrapper-6">Investment Type</div>
                  <div className="div-11">
                    <div className="div-12">
                      <div className={classNames('component', { 'component-active': shortTerm })} onClick={() => { setShortTerm(true); setLongTerm(false);}}>
                        <div className={classNames('trading', { 'trading-active': shortTerm })}>Short Term</div>
                        {shortTerm && <img className="img" alt="Tick" src='./Images/Tick.svg' />}
                      </div>
                      <div className="element-months">&lt; 12 months</div>
                    </div>
                    <div className="div-12">
                      <div className={classNames('component-2', { 'component2-active': longTerm })} onClick={() => { setLongTerm(true); setShortTerm(false);}}>
                        <div className={classNames('trading-2', { 'trading2-active': longTerm })}>Long Term</div>
                        {longTerm && (<img className="img-2" alt="Tick" src="./Images/Tick.svg" />)}
                      </div>
                      <div className="element-months">&gt; 12 Months</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="div-13">
                <div className="div-10">
                  <div className="text-wrapper-6">Select Your Annual Income</div>
                  <div className="div-14" onClick={() => calculateTaxes()}>
                    <div className="text-wrapper-7">
                      <select className="text-wrapper-7 sel" onChange={(e) => handleTaxIndex(e)} >

                        {
                          IncomeIntervals.map((income) => {
                            return (
                              <>
                                <option key={income.id} value={income.id}>{income.data}</option>
                              </>
                            )
                          })
                        }
                      </select>
                    </div>
                    <div className="emojione-flag-for">
                    </div>
                  </div>
                </div>
                <div className="div-15">
                  <div className="text-wrapper-8">Tax Rate</div>
                  <div className="p" >{taxRates[taxIndex]}</div>
                </div>
              </div>
              {longTerm && (<div className="div-9">
                <div className="div-10">
                  <div className="text-wrapper-5">Capital gains amount</div>
                  <div className="div-wrapper-2">
                    <div className="text-wrapper-3">$  <Cleave className="input" options={{ numeral: true }} value={capitalGains} disabled /></div>
                  </div>
                </div>
                <div className="div-10">
                  <div className="text-wrapper-5">Discount for long term gains</div>
                  <div className="div-wrapper-2">
                    <div className="text-wrapper-3">$   <Cleave className="input" options={{ numeral: true }} value={(capitalGains >= 0) ? netCapitalGains : 0} disabled />

                      { }</div>
                  </div>
                </div>
              </div>)}
              <div className="div-16">
                <div className="div-17">
                  <p className="text-wrapper-9">Net Capital gains tax amount</p>
                  <div className="text-wrapper-10">${(netCapitalGains >= 0 && !isNaN(netCapitalGains)) ? netCapitalGains : 0}</div>
                </div>
                <div className="div-18">
                  <p className="text-wrapper-9">The tax you need to pay*</p>
                  <div className="text-wrapper-11">${(taxToPay >= 0 && !isNaN(taxToPay)) ? taxToPay : 0}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="frame">
        <div className="frame-wrapper">
          <p className="text-wrapper">Frequently Asked Questions</p>
          <div>
            {FAQs.map((e) => {
              return (
                <>
                  <p key={e.id} className="text-wrapper-small">{e.id}.&nbsp;{e.question}</p>
                  <p className="">{e.answer}</p>
                </>
              )

            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default TaxCalculator;