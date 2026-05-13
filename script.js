// AUTO DATE

const today = new Date().toISOString().split('T')[0];

document.getElementById("todayDate").value = today;

// BILL NUMBER

let billNumber = localStorage.getItem("billNo");

if (!billNumber) {

  billNumber = 1001;

}

else {

  billNumber = parseInt(billNumber) + 1;

}

localStorage.setItem("billNo", billNumber);

document.getElementById("billNo").value = billNumber;

// MAIN CALCULATION

function calculateRow(element) {

  const currentRow = element.closest("tr");

  const type = currentRow.dataset.type;

  // ALL ROWS OF SAME TYPE

  const rows =
    document.querySelectorAll(`tr[data-type="${type}"]`);

  let totalGross = 0;

  rows.forEach(row => {

    const boxes =
      parseFloat(row.querySelector(".boxes").value) || 0;

    const kgs =
      parseFloat(row.querySelector(".kgs").value) || 0;

    totalGross += (boxes * kgs);

  });

  // FIRST ROW

  const firstRow = rows[0];

  const qty =
    parseFloat(firstRow.querySelector(".qty").value) || 0;

  const basicPrize =
    parseFloat(document.getElementById("basicPrize").value) || 0;

  // BASIC SIZES

  const rohuSize =
    parseFloat(document.getElementById("rohuSize").value) || 0;

  const katlaSize =
    parseFloat(document.getElementById("katlaSize").value) || 0;

  const pungusSize =
    parseFloat(document.getElementById("pungusSize").value) || 0;

  const roopchandSize =
    parseFloat(document.getElementById("roopchandSize").value) || 0;

  // GROSS

  const gross = totalGross;

  // -5%

  const minus = gross * 0.05;

  // NET

  const net = gross - minus;

  // AVERAGE

  const avg = qty
    ? Math.floor((gross / qty) * 1000) / 1000
    : 0;

  const avg1000 = avg * 1000;

  let rate = basicPrize;

  // =========================
  // ROHU
  // =========================

  // =========================
// ROHU
// =========================

if (type === "Rohu") {

  // BASE RATE

  rate =
    basicPrize +
    (((avg1000 - 1000) / 2) / 100);

  // PENALTY IF BELOW BASIC SIZE

  if (avg1000 < rohuSize) {

    rate =
      rate -
      ((rohuSize - avg1000) * 0.02);

  }

  // EXTRA PENALTY

  if (avg1000 < 1000) {

    rate =
      rate -
      ((1000 - avg1000) * 0.01);

  }

}

// =========================
// KATLA
// =========================

else if (type === "Katla") {

  // BASE RATE

  rate =
    basicPrize +
    (((avg1000 - 2000) / 2) / 100);

  // PENALTY IF BELOW BASIC SIZE

  if (avg1000 < katlaSize) {

    rate =
      rate -
      ((katlaSize - avg1000) * 0.02);

  }

  // EXTRA PENALTY

  if (avg1000 < 1000) {

    rate =
      rate -
      ((1000 - avg1000) * 0.01);

  }

}

// =========================
// PUNGUS
// =========================

else if (type === "Pungus") {

  // BASE RATE

  rate =
    basicPrize +
    (((avg1000 - 1000) / 2) / 100);

  // PENALTY IF BELOW BASIC SIZE

  if (avg1000 < pungusSize) {

    rate =
      rate -
      ((pungusSize - avg1000) * 0.02);

  }

  // EXTRA PENALTY

  if (avg1000 < 1000) {

    rate =
      rate -
      ((1000 - avg1000) * 0.01);

  }

}

// =========================
// ROOPCHAND
// =========================

else if (type === "RoopChand") {

  // BASE RATE

  rate =
    basicPrize +
    (((avg1000 - 1000) / 2) / 100);

  // PENALTY IF BELOW BASIC SIZE

  if (avg1000 < roopchandSize) {

    rate =
      rate -
      ((roopchandSize - avg1000) * 0.02);

  }

  // EXTRA PENALTY

  if (avg1000 < 1000) {

    rate =
      rate -
      ((1000 - avg1000) * 0.01);

  }

}

  // ROUND RATE

  const roundedRate =
    Math.floor(rate * 100) / 100;

  // TOTAL

  const total = net * roundedRate;

  // UPDATE FIRST ROW

  firstRow.querySelector(".gross").value =
    gross.toFixed(3);

  firstRow.querySelector(".minus").value =
    minus.toFixed(3);

  firstRow.querySelector(".net").value =
    net.toFixed(3);

  firstRow.querySelector(".avg").value =
    avg.toFixed(3);

  firstRow.querySelector(".rate").value =
    roundedRate.toFixed(2);

  firstRow.querySelector(".total").value =
    total.toFixed(2);

  calculateTotals();

}

// TOTALS

function calculateTotals() {

  let total = 0;

  const types =
    ["Rohu", "Katla", "Pungus", "RoopChand"];

  types.forEach(type => {

    const row =
      document.querySelector(`tr[data-type="${type}"]`);

    if (row) {

      total +=
        parseFloat(row.querySelector(".total").value) || 0;

    }

  });

  // EXTRA ROWS

  document.querySelectorAll(".extra-charge-row")
    .forEach(row => {

      const amount =
        parseFloat(
          row.querySelector(".extra-amount").innerText
        ) || 0;

      const operation = row.dataset.operation;

      if (operation === "minus") {

        total -= amount;

      }

      else {

        total += amount;

      }

    });

  document.getElementById("grandTotal").innerText =
    total.toFixed(2);

}

// RECALCULATE

function recalculateAllRows() {

  const types =
    ["Rohu", "Katla", "Pungus", "RoopChand"];

  types.forEach(type => {

    const row =
      document.querySelector(`tr[data-type="${type}"]`);

    if (row) {

      calculateRow(row);

    }

  });

}

// ADD FISH ROW

function addFishRow(type) {

  const tbody =
    document.querySelector("#billTable tbody");

  const rows =
    tbody.querySelectorAll(`tr[data-type="${type}"]`);

  const lastRow = rows[rows.length - 1];

  const newRow =
    document.createElement("tr");

  newRow.setAttribute("data-type", type);

  newRow.innerHTML = `

    <td></td>

    <td>
      <input type="text"
        value="${type}"
        readonly>
    </td>

    <td>
      <input type="number"
        class="boxes"
        oninput="calculateRow(this)">
    </td>

    <td>
      <input type="number"
        class="kgs"
        oninput="calculateRow(this)">
    </td>

    <td colspan="6"
      style="background:#f5f5f5;">

      Additional ${type} Row

    </td>

    <td>

      <button class="remove-row-btn"
        onclick="removeFishRow(this)">

        Remove

      </button>

    </td>

  `;

  lastRow.after(newRow);

  updateSerialNumbers();

}

// REMOVE FISH ROW

function removeFishRow(button) {

  const row =
    button.closest("tr");

  row.remove();

  recalculateAllRows();

  updateSerialNumbers();

}

// ADD EXTRA ROW

function addDeductionRow(type) {

  const footer =
    document.getElementById("tableFooter");

  const grossRow =
    document.getElementById("grandTotalRow");

  // TOTAL GROSS

  let totalGross = 0;

  const fishTypes =
    ["Rohu", "Katla", "Pungus", "RoopChand"];

  fishTypes.forEach(type => {

    const row =
      document.querySelector(`tr[data-type="${type}"]`);

    if (row) {

      totalGross +=
        parseFloat(row.querySelector(".gross").value) || 0;

    }

  });

  let amount = 0;

  let operation = "minus";

  // RITU COMMISSION

  if (type === "Ritu Commission") {

    amount = totalGross * 0.25;

    operation = "minus";

  }

  // CM

  else if (type === "CM") {

    amount = totalGross * 0.95 * 0.25;

    operation = "plus";

  }

  const row =
    document.createElement("tr");

  row.classList.add("extra-charge-row");

  row.dataset.operation = operation;

  row.innerHTML = `

    <td colspan="8">

      ${type}

    </td>

    <td colspan="2">

      ${operation === "minus" ? "-" : "+"}

    </td>

    <td>

      <span class="extra-amount">

        ${amount.toFixed(2)}

      </span>

      <button class="remove-row-btn"
        onclick="removeExtraRow(this)"
        style="margin-left:10px;">

        Remove

      </button>

    </td>

  `;

  footer.insertBefore(row, grossRow);

  calculateTotals();

}

// REMOVE EXTRA ROW

function removeExtraRow(button) {

  const row =
    button.closest("tr");

  row.remove();

  calculateTotals();

}

// SERIAL NUMBERS

function updateSerialNumbers() {

  document.querySelectorAll("#billTable tbody tr")
    .forEach((row, index) => {

      row.cells[0].innerText = index + 1;

    });

}