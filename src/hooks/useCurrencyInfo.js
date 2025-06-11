import { useEffect, useState } from "react";

// Example: currency = "USD", "INR", "EUR", etc.
function useCurrencyInfo(currency) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/multi_base_currency_data.json")
      .then((res) => res.json())
      .then((res) => {
        const selected = res[currency.toUpperCase()] || [];
        setData(selected);
        // console.log(selected);
        
      });
  }, [currency]);
  console.log(data);
  return data;
}

export default useCurrencyInfo;
