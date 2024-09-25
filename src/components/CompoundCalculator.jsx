import React, { useEffect, useState } from "react";
import { LineChart, Line, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import CompoundInput from "./CompoundInput";

const CompoundCalculator = () => {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(12);
  const [timePeriod, setTimePeriod] = useState(15);
  const [inputMonthly, setInputMonthly] = useState(1000);
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    let result = principal;
    const newData = [{ BELOPP: result, år: 0 }];
    
    for (let i = 0; i < timePeriod; i++) {
      result = result * (1 + (rate / 100));

      for (let j = 0; j < 12; j++) {
        result += inputMonthly * Math.pow(1 + rate / 100, (12 - j) / 12);
      }  
      newData.push({ BELOPP: result, år: i + 1 });
    }
  
    const slutvärde = newData[newData.length - 1].BELOPP;
    const totaltSparande = principal + (inputMonthly * 12) * timePeriod;
    const intjänadRänta = slutvärde - totaltSparande;
  
    const newResult = {
      intjänadRänta: Math.round(intjänadRänta),
      totaltSparande: Math.round(totaltSparande),
      slutvärde: Math.round(slutvärde),
    };
  
    console.log(newResult.intjänadRänta);
    setResult(newResult);
    setData(newData);
  }, [principal, rate, timePeriod, inputMonthly]);
  const handleSliderChange = (setter) => (event, newValue) => {
    setter(newValue);
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value === "" ? "" : Number(event.target.value));
  };

  return (
    <div className="calc-body">
      <div className="calc-header">
        <p style={{lineHeight: 1.68}}>
          Vår ränta på ränta-kalkylator hjälper dig att beräkna hur mycket ditt
          sparande kan växa över tid. Du kan justera avkastningen,
          startkapitalet, månadssparandet och tidsperioden för att se vilken
          effekt det har på ditt sparande.
        </p>
      </div>
      <div className="calc-graph">
        <ResponsiveContainer className="responsive-chart">
          <LineChart className="chart" data={data}>
            <Line
              type="monotone"
              dataKey="BELOPP"
              stroke="#ffffff"
              strokeWidth={1}
            />
            <YAxis
              padding={{ top: 11 }}
              width={90}
              tick={{ fill: "#ffffff" }}
              type={"number"}
              tickFormatter={(value) =>
                value < 999999
                  ? Math.round(value / 1000).toLocaleString() + " TKR"
                  : (value / 1000000).toFixed(2).toLocaleString() + " MKR"
              }
              tickMargin={10}
              fontFamily="bebas-neue-pro"
              fontWeight={400}
            />
            <Tooltip
              formatter={(value) =>
                value < 999999
                  ? Math.round(value / 1000).toLocaleString() + " TKR"
                  : (value / 1000000).toFixed(2).toLocaleString() + " MKR"
              }
              labelFormatter={(value) => "ÅR " + value}
              contentStyle={{
                backgroundColor: "#fffffff, 0.8",
                color: "#ffffff",
                border: "none",
                borderRadius: 7,
                textAlign: "left",
                fontFamily: "bebas-neue-pro",
                fontSize: 14,
                fontWeight: 300,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="calc-input">
        <CompoundInput
          getter={rate}
          setter={setRate}
          handleSlider={handleSliderChange}
          handleInput={handleInputChange}
          title="Avkastning per år"
          min={1}
          max={50}
          step={1}
          unit="%"
        />
        <CompoundInput
          getter={principal}
          setter={setPrincipal}
          handleSlider={handleSliderChange}
          handleInput={handleInputChange}
          title="Startkapital"
          min={1000}
          max={100000}
          step={500}
          unit="kr"
        />
        <CompoundInput
          getter={inputMonthly}
          setter={setInputMonthly}
          handleSlider={handleSliderChange}
          handleInput={handleInputChange}
          title="Månadssparande"
          min={100}
          max={20000}
          step={100}
          unit="kr"
        />
        <CompoundInput
          getter={timePeriod}
          setter={setTimePeriod}
          handleSlider={handleSliderChange}
          handleInput={handleInputChange}
          title="Tidsperiod"
          min={1}
          max={40}
          step={1}
          unit="år"
        />
      </div>
      <div className="calc-result">
        <p className="result-container">
          SLUTVÄRDE ÅR {timePeriod} <br />
          <p className="result">
            {result.slutvärde?.toLocaleString('sv-SE') + " KR"}
          </p>
        </p>
        <p className="result-container">
          FÖRVÄNTAD AVKASTNING <br />
          <p className="result">
            {result.intjänadRänta?.toLocaleString('sv-SE') + " KR"}
          </p>
        </p>
        <p className="result-container">
          TOTALT SPARANDE <br />
          <p className="result">
            {result.totaltSparande?.toLocaleString() + " KR"}
          </p>
        </p>
      </div>
      <div className="disclaimer">
        Hänsyn har inte tagits till eventuella skatter eller inflation.
      </div>
    </div>
  );
};

export default CompoundCalculator;
