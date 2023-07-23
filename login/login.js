import {app, db, auth, signInWithEmailAndPassword} from '../firebaseconfig.js'

const loginEmail = document.querySelector('#loginEmailAddress')
const loginPassword = document.querySelector('#loginPassword')

const loginBtn = document.querySelector('#loginBtn')
console.log(loginBtn)

// loginBtn.addEventListener('click', loginHandler)

loginBtn.addEventListener(`click`, loginHandler )


function loginHandler() {
    console.log(loginEmail.value)
    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            if(user) {
                window.location.href = '.././dashboard/dasjboard.html'
            }
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, )
        });
}