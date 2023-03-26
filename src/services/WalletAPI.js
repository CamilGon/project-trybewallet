const fetchCoins = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencyList = response.json();
  return currencyList;
};

export default fetchCoins;
