
import {db, onAuthStateChanged} from './index.js';

let user = null;
let userId = null;

// document select by id
document.getElementById("whoLogged").addEventListener("click", () => {
    if(user){
        console.log(user.uid);
    } else {
        console.log("No user logged in");
    }
});

onAuthStateChanged(auth, (currentUser) => {
    if(currentUser){
        user = currentUser;
        userId = user.uid;
    }
});

document.getElementById('investmentForm').addEventListener('submit', (e) => {
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

    // Send the transaction to the database:
    db.collection('transactions').add(data)
    .then(() => {
      console.log('Transaction added successfully');
    })
    .catch((error) => {
      console.error('Error adding transaction:', error);
    });
});

