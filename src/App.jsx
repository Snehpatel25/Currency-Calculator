import { useEffect, useState } from "react";
import "./App.css";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

const country = ["USD", "EUR", "INR", "GBP", "JPY"];

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [allCurrency, setAllCurrency] = useState([]);

  const currencyInfo = useCurrencyInfo(from);

  useEffect(() => {
    if (currencyInfo.rates) {
      const curr = currencyInfo.rates.map(([code]) => code);
      setAllCurrency(curr);
    }
  }, [currencyInfo]);

  const convert = () => {
    const rateObj = currencyInfo.rates?.find(([code]) => code === to);
    if (rateObj) {
      setConvertedAmount((amount * rateObj[1]).toFixed(2));
    }
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat px-2"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-photo/majestic-mountain-peak-tranquil-winter-landscape-generated-by-ai_188544-15662.jpg?uid=R202399024&ga=GA1.1.468394370.1747631726&w=740')`,
      }}
    >
      <div className="w-full text-white flex flex-col items-center text-center space-y-3 mt-30
      ">
        <h1 className="text-4xl font-bold md:text-5xl drop-shadow-lg">
          Smart & Simple Currency Converter
        </h1>
        <p className="text-base md:text-lg max-w-xl drop-shadow">
          Convert currencies with accurate exchange rates across 100+ countries
        </p>
      </div>

      <div className="w-full ">
        <div className="w-full max-w-md mx-auto border border-gray-300 rounded-xl p-0 mb-40 md:p-6 backdrop-blur-sm bg-white/30 shadow-lg">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-2">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={country}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(val) => setAmount(val)}
              />
            </div>

            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white rounded-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 text-sm transition duration-200 shadow"
                onClick={swap}
              >
                swap
              </button>
            </div>

            <div className="w-full mb-2">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={allCurrency}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 mt-2 rounded-3xl font-semibold transition duration-200 shadow"

            >
              Convert {from.toUpperCase()} To {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
