const options = {
  method: 'GET',
  headers: {
      'x-rapidapi-key': '8ba7ead721msh2c060117739468dp11a49cjsn82c8bb70fd1c',
      'x-rapidapi-host': 'vin-lookup2.p.rapidapi.com'
  }
};

async function fetchVehicleData() {
  const vinInput = document.getElementById("vin");
  const vin = vinInput.value.trim();
  const url = `https://vin-lookup2.p.rapidapi.com/vehicle-lookup?vin=${vin}`;

  try {
      const response = await fetch(url, options);
      if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      console.log(result);

      // Use spans for CSS styling
      const formattedResult = `
        <span class="label">Make:</span> <span class="value">${result.make}</span>
        <span class="label">Model:</span> <span class="value">${result.model}</span>
        <span class="label">Trim:</span> <span class="value">${result.trim}</span>
        <span class="label">Year:</span> <span class="value">${result.year}</span>
        <span class="label">Weight:</span> <span class="value">${result.weight} lbs</span>
        <span class="label">Average Trade-in Value:</span> <span class="value">$${result.average_trade_in}</span>
      `;

      document.getElementById('result').innerHTML = formattedResult;
  } catch (error) {
      console.error(error);
      document.getElementById('result').textContent = `Error: ${error.message}`;
  }
}
