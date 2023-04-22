import { signUp, signIn, signOutUser, onAuthStateChanged, auth, app } from './index.js';
//------------ Authentication ------------//
let user = null;

const userEmail = document.querySelector('#userEmail');
const userPassword = document.querySelector('#userPassword');

// Hide Authentication if user is signed in
onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
        console.log("User is signed in");
        console.log(currentUser);
        user = currentUser;
        document.querySelector("#loginSection").style.display = "none";
        document.querySelector("#logoutSection").style.display = "block";
    } else {
        console.log("User is signed out");
        user = null;
        document.querySelector("#loginSection").style.display = "block";
        document.querySelector("#logoutSection").style.display = "none";
    }
});


document.querySelector('#signUpButton').addEventListener('click', () => {
    console.log("SIGN UP BUTTON CLICKED");
    signUp(userEmail.value, userPassword.value)
    .then((userCredential) => {
        user = userCredential.user;
        console.log(user);
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage, "Error Code: ", errorCode);
    });
});
document.querySelector("#signInButton").addEventListener('click', () => {
    console.log("SIGN IN BUTTON CLICKED");
    signIn(userEmail.value, userPassword.value)
    .then((userCredential) => {
        user = userCredential.user;
        console.log(user);
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage, "Error Code: ", errorCode);
    });
})
document.querySelector("#signOutButton").addEventListener('click', async () => {
    await signOutUser();
    user = null;
    console.log("User signed out");
})
