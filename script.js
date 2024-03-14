
// Function to fetch the top 100 cryptocurrencies from the server
async function fetchTop100Cryptos() {
  try {
    const response = await fetch('http://localhost:3000/api/latest-listings'); // Replace with your server endpoint
    const data = await response.json();
    console.log('Fetched data:', data); // Log the fetched data
    console.log('Type of data:', typeof data); // Log the type of data
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
// Function to display the list of cryptocurrencies
function displayCryptoList(data) {
  const cryptoList = data.data; // Extract the array of cryptocurrencies from the 'data' property
  const cryptoListElement = document.getElementById('crypto-list');
  cryptoListElement.innerHTML = '';
  cryptoList.forEach(crypto => {
    const listItem = document.createElement('li');
    listItem.textContent = `${crypto.name} (${crypto.symbol}): $${crypto.quote.USD.price.toFixed(2)}`;
    cryptoListElement.appendChild(listItem);
  });
}

// Fetch and display the top 100 cryptocurrencies when the page loads
window.onload = async function() {
  const cryptoList = await fetchTop100Cryptos();
  displayCryptoList(cryptoList);
};

