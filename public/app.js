
    import {auth, app, db, getFirestore, collection, addDoc, setDoc, doc, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from './firebaseconfig.js'




// pehle sare element get kre ge 




// get elements from HTML\\

  
                                        
const firstName = document.querySelector("#firstName") ;
// console.log(firstName) ;
 const surName = document.querySelector("#surName") ;
// console.log(surName) ;
const signUpEmail = document.querySelector("#email-MobNum") ;
// console.log(signUpEmail) ;
const userMobNum = document.querySelector("#userMobNum") ;
// console.log(userMobNum) ;
const signUpPassword = document.querySelector("#new-Password") ;
// console.log(signUpPassword) ;
const genderMale = document.querySelector("#gender-male")
// console.log(genderMale)
const genderFemale = document.querySelector("#gender-female")
// console.log(genderFemale)
const genderCustom = document.querySelector("#gender-custom")
// console.log(genderCustom)
const signUpDate = document.querySelector("#date")
// console.log(signUpDate)
const signUpMonth = document.querySelector("#month")
// console.log(signUpMonth)
const signUpYear = document.querySelector("#year")
// console.log(signUpYear)
const signupBtn = document.querySelector("#signup-btn")
// console.log(signupBtn)

// YE SHOW PASSWORD ICON KA HAI!
const showPasswordBtn = document.querySelector("#showPassword")
// console.log(showPasswordBtn)

// YE  OVERLAY HATAnay ki id ko bula na 
const overlay = document.querySelector("#staticBackdrop")
// console.log(overlay) 

// loginbtn elements

const loginEmailAddress = document.querySelector("#loginEmailAddress")
//   console.log(loginEmailAddress)
const loginPassword = document.querySelector("#loginPassword")
  //   console.log(loginPassword)
const loginBtn = document.querySelector("#loginBtn")
  //   console.log(loginBtn)


//   empty array for local storage


// UserDataInArray = JSON.parse(localStorage.getItem("userdata")) ||[] ; 

// work for dates 

let signUpdate;

function getDateHandler(date){
    console.log(date , "checking")
    // signUpdate = date;
    signUpDate.innerHTML = date;
}

let signUpmonth;

function getMonthHandler(month) {
    console.log(month, "monthHandler working")
    signUpMonth.innerHTML = month;
    signUpmonth = month
}

let signUpyear;

function getYearHandler(year) {
    console.log(year, "yearHandler working")
    signUpYear.innerHTML = year;
    signUpyear = year

}
function getGenderHandler(gender) {
    console.log(gender, "genderHandler working")
    signUpgender = gender
}

loginBtn.addEventListener(`click`, loginHandler )

// function login(){
//     if(!loginEmailAddress.value || !loginPassword.value) {
//         return alert("please type or write Email && password to login")
//     }
//     const userFound = UserDataInArray.filter((user) => {

//         console.log("user Email filter value",user.signUpEmail)
//         return user.signUpEmail === loginEmailAddress.value
//     })
    
//     if(!userFound.length) return alert("This user is not registered , kindly create account first ")


//     console.log( loginPassword.value,"login password  ")
//     console.log( userFound.signUpPassword,"from local storage")

//     if(userFound[0].signUpPassword === loginPassword.value){
//         alert("Welcome To login")

//         localStorage.setItem("loginUser", JSON.stringify(userFound[0]))

//         window.location.href ="./dashborad/dashboard.html";
//     }else{
//         alert("password is incorrect")
//     }
// }







// signup btn work
signupBtn.addEventListener(`click`, signup)

// function signup (){

//     const userFound = UserDataInArray.filter((user)=>{
//         console.log("user email in our email; input", signUpEmail.value)
//        return user.signUpEmail == signUpEmail.value
//     })
    
//     if(userFound.length) return alert("Email Address already in use")

//     // console.log("user mil gaya ",userFound)

//     overlay.classList.toggle('show')

//     if(firstName.value !== "" && surName.value !== "" && signUpEmail.value !== "" && signUpPassword !== "" && userMobNum !== "" && signUpdate !== undefined && signUpmonth !== undefined && signUpyear !== undefined && signUpgender !== undefined) {
//         if(signUpPassword.value.length < 8) return  alert("Password kam sai kam 8 characters ka dalo");

        
//         const objects ={
//             firstName : firstName.value,
//             surName : surName.value,
//             signUpEmail : signUpEmail.value,
//             userMobNum : userMobNum.value,
//             signUpPassword : signUpPassword.value,
//             gender : signUpgender,
//             userDate : new Date (`${signUpyear}-${signUpmonth}-${signUpdate}`)
//         }
//         // console.log(objects)

//         UserDataInArray.push(objects)
//         // console.log(UserDataInArray)

//        localStorage.setItem("UsersData",JSON.stringify(UserDataInArray))
//         alert("Thanks For Connecting Us ")
        
//         firstName.value = ""
//         surName.value = ""
//         signUpEmail.value = ""
//         userMobNum.value = "" 
//         signUpPassword.value = ""
//         signUpDate.innerHTML  = "Date"
//         signUpMonth.innerHTML = "Month" 
//         signUpYear.innerHTML  = "Year"

//     }else {
//         alert("Please Fill all fields To connect us")  
//     }
//     window.location.href="./dashboard.dasjboard.html"
// }

function loginHandler() {
    signInWithEmailAndPassword(auth, loginEmailAddress.value, loginPassword.value)
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

async function signup() {
    try {
        const response = await createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPassword.value)

        console.log(response, "==>>response")

        if (response.user) {
            addUserHandler(response.user.uid)
        }
    } catch (error) {
        console.log(error)
    }
}



async function addUserHandler(uid) {
    try {
        const response = await setDoc(doc(db, "users", uid), {
            firstName: firstName.value,
            lastName: surName.value,
            email: signUpEmail.value,
            mobileNumber: userMobNum.value,
            password:signUpPassword.value 
        //  userDateofbirth : new Date (`${signUpYear}-${signUpMonth}-${signUpDate}`),
        //  gender:signUpgender,

        });

        window.location.href = '.././login/index.html'
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}






