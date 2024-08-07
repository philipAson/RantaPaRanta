import React, { useEffect, useState } from "react";
import { LineChart, Line, YAxis, Tooltip } from "recharts";
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
      result = (result + inputMonthly * 12) * (1 + rate / 100);
      result = Math.round(result);
      newData.push({ BELOPP: result, år: i + 1 });
    }
    const slutvärde = newData[newData.length - 1].BELOPP;
    const totaltSparande = principal + inputMonthly * 12 * timePeriod;
    const intjänadRänta = slutvärde - totaltSparande;

    const newResult = {
      intjänadRänta: intjänadRänta,
      totaltSparande: totaltSparande,
      slutvärde: slutvärde,
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
        <p>
          Vår ränta på ränta-kalkylator hjälper dig att beräkna hur mycket ditt
          sparande kan växa över tid. Du kan justera räntan, startkapitalet,
          månadssparandet och tidsperioden för att se hur ditt sparande kan
          växa.
        </p>
      </div>
      <div className="calc-graph">
        <LineChart width={500} height={295} data={data}>
          <Line
            type="monotone"
            dataKey="BELOPP"
            stroke="#ffffff"
            strokeWidth={1}
          />
          <YAxis
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
      </div>
      <div className="calc-input">
      <CompoundInput
                  getter={rate}
                  setter={setRate}
                  handleSlider={handleSliderChange}
                  handleInput={handleInputChange}
                  title="Ränta per år"
                  min={1}
                  max={100}
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
                  max={50}
                  step={1}
                  unit="år"
                />
      </div>
      <div className="calc-result">
        <p className="result-container">
          SLUTVÄRDE ÅR {timePeriod} <br />
          <p className="result">{result.slutvärde?.toLocaleString()} kr</p>
        </p>
        <p className="result-container">
          INTJÄNAD RÄNTA <br />
          <p className="result">{result.intjänadRänta?.toLocaleString()} kr</p>
        </p>
        <p className="result-container">
          TOTALT SPARANDE <br />
          <p className="result">{result.totaltSparande?.toLocaleString()} kr</p>
        </p>
      </div>
    </div>
  );
};

export default CompoundCalculator;
