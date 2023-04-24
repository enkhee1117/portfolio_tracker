
import {app, onAuthStateChanged, auth} from './index.js';
import { getFirestore, collection, addDoc, getDocs, doc, onSnapshot, query } from 'firebase/firestore';
// import { format, parseISO } from 'date-fns';

// ------------ Firestore ------------ //
const db = getFirestore(app);

let user = null;
let userId = null;
const transactions = [];

onAuthStateChanged(auth, (currentUser) => {
    if(currentUser){
        user = currentUser;
        userId = user.uid;
        listenToTransactionsChange();
        // renderInvestmentChart(transactions);
    } else {
      user = null;
      userId = null;
    }
});

document.getElementById('investmentForm').addEventListener('submit',async (e) => {
    e.preventDefault();
  
    const market = document.getElementById('market').value;
    const transactionType = document.getElementById('transactionType').value;
    const investmentType = document.getElementById('investmentType').value;
    const transactionAmount = parseFloat(document.getElementById('transactionAmount').value);
    const transactionFee = parseFloat(document.getElementById('transactionFee').value);
    const platform = document.getElementById('platform').value;
    const pricePaid = parseFloat(document.getElementById('pricePaid').value);
  
    const transactionDate = new Date().toISOString();
    const totalInvestmentAmount = (pricePaid * transactionAmount) + transactionFee;
  
    const data = {
      market,
      transactionType,
      investmentType,
      transactionAmount,
      transactionFee,
      platform,
      pricePaid,
      transactionDate,
      totalInvestmentAmount
    }

    // SEND THE Transaction TO THE DATABASE:
    if (userId){
      try {
        const docRef = await addDoc(collection(db,"users", userId, "transactions"), data);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      console.log("No user logged in");
    }
    
});

// Table Headers
const tableHeaders = [
  "market",
  "transactionType",
  "investmentType",
  "transactionAmount",
  "transactionFee",
  "platform",
  "pricePaid",
  "transactionDate",
  "totalInvestmentAmount"
];

const buildTransactionTable = (transaction) => {
  const tableBody = document.getElementById("transactionTableBody");
  const tableRow = document.createElement("tr");
  tableHeaders.forEach((header) => {
    const tableData = document.createElement("td");
    tableData.innerText = transaction[header];
    tableRow.appendChild(tableData);
  });
  // Add row to the table:
  tableBody.appendChild(tableRow);
};

const listenToTransactionsChange = async () => {
  if(userId){
    const transactionsRef = collection(db, "users", userId, "transactions");
    onSnapshot(transactionsRef, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New Transaction: ", change.doc.data());
          transactions.push(change.doc.data());
          buildTransactionTable(change.doc.data());
        }
        if (change.type === "modified") {
          console.log("Modified Transaction: ", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed Transaction: ", change.doc.data());
        }
      });
    });
  } else {
    console.log("No user logged in");
  }
}

// Render charts: Problem with the imports. 
// function renderInvestmentChart(data) {
//   const ctx = document.getElementById('investmentChart').getContext('2d');

//   const chartData = data.map(item => ({
//     x: parseISO(item.transactionDate),
//     y: item.totalInvestmentAmount
//   }));

//   const investmentChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//       datasets: [
//         {
//           label: 'Total Investment Amount',
//           data: chartData,
//           backgroundColor: 'rgba(75, 192, 192, 0.2)',
//           borderColor: 'rgba(75, 192, 192, 1)',
//           borderWidth: 2,
//           tension: 0.1
//         }
//       ]
//     },
//     options: {
//       plugins: {
//         tooltip: {
//           callbacks: {
//             title: function (context) {
//               const date = context[0].parsed.x;
//               return date ? dateFns.format(date, 'PP') : '';
//             }
//           }
//         }
//       },
//       scales: {
//         x: {
//           type: 'time',
//           adapters: {
//             date: {
//               date: dateFns,
//               locale: 'en-US'
//             }
//           },
//           time: {
//             unit: 'day'
//           },
//           title: {
//             display: true,
//             text: 'Date'
//           }
//         },
//         y: {
//           title: {
//             display: true,
//             text: 'Total Investment Amount'
//           }
//         }
//       }
//     }
//   });
// }

