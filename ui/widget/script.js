function lookupAssessment() {
    const opaId = document.getElementById('opa-id').value.trim();
    if (!opaId) {
      alert("Please enter a valid OPA ID.");
      return;
    }
  
    // 🧪 Mock data - swap with real API later
    const mockData = {
      years: [2022, 2023],
      values: [46000, 152000],
      breakdown: [
        {
          year: 2023,
          market: 152000,
          land: 30400,
          improvement: 121600,
          exemptLand: 0,
          exemptImprovement: 0
        },
        {
          year: 2022,
          market: 46000,
          land: 6900,
          improvement: 39100,
          exemptLand: 0,
          exemptImprovement: 0
        }
      ]
    };
  
    renderChart(mockData.years, mockData.values);
    renderTable(mockData.breakdown);
  }
  
  function renderChart(labels, data) {
    const ctx = document.getElementById('valuation-chart')?.getContext('2d');
  
    if (!ctx) {
      const container = document.getElementById('valuation-chart-container');
      container.innerHTML = '<canvas id="valuation-chart"></canvas>';
    }
  
    if (window.chartInstance) window.chartInstance.destroy();
  
    window.chartInstance = new Chart(
      document.getElementById('valuation-chart'),
      {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Assessed Market Value',
            data,
            borderColor: '#0072ce',
            backgroundColor: 'rgba(0, 114, 206, 0.1)',
            fill: true,
            tension: 0.2
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: false }
          }
        }
      }
    );
  }
  
  function renderTable(data) {
    const container = document.getElementById('valuation-table-container');
    let html = `<table>
      <thead>
        <tr>
          <th>Year</th><th>Market Value</th><th>Taxable Land</th><th>Taxable Improvement</th>
          <th>Exempt Land</th><th>Exempt Improvement</th>
        </tr>
      </thead>
      <tbody>`;
  
    data.forEach(row => {
      html += `<tr>
        <td>${row.year}</td>
        <td>$${row.market.toLocaleString()}</td>
        <td>$${row.land.toLocaleString()}</td>
        <td>$${row.improvement.toLocaleString()}</td>
        <td>$${row.exemptLand.toLocaleString()}</td>
        <td>$${row.exemptImprovement.toLocaleString()}</td>
      </tr>`;
    });
  
    html += `</tbody></table>`;
    container.innerHTML = html;
  }
  