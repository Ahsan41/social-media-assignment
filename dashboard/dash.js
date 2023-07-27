import {
    auth,
    db,
    doc,
    getDoc,
    onAuthStateChanged,
    signOut,
    setDoc,
    addDoc,
    collection,
    getDocs
}
from '../firebaseconfig.js'

const postBtn=document.querySelector(`.post-btn`)
const postInputBox = document.getElementById('postInputBox')
console.log(postInputBox)
const postArea = document.querySelector(`.post-area`)

// console.log(postBtn)

getPosts()

let currentLoggedInUser;

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(uid)
        // getUserData(uid)
        currentLoggedInUser = uid
        // // ...
    } else {
        // User is signed out
        // ...
        // console.log("sign out")
        window.location.href = '../login/login.html'
    }
});


postBtn.addEventListener('click', postHandler)


async function postHandler() {
    // console.log(postInputBox.value)
    // console.log(currentLoggedInUser, "==>>currentLoggedInUser")
    try {
        const docRef = await addDoc(collection(db, "posts"), {
            id: currentLoggedInUser,
            postContent: postInputBox.value,
            
          });
          getPosts()
          console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    
}

async function getPosts() {
    postArea.innerHTML = ''
    const querySnapshot = await getDocs(collection(db, "posts"));

    querySnapshot.forEach(async (doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc);
        const { id, postContent } = doc.data()
        console.log(id)
        console.log(postContent)

       

        const authorDetails = await getAuthorData(id)

        
        const postElement = document.createElement('div')
        postElement.setAttribute('class', 'posts')
        const content = `
        <div class="user-profile">
        <img src="../assets/avatar.png" alt="">
        <div>
          <p class="username">${authorDetails?.firstName}</p>
         <span>june 24 2023, 13:40</span>
        </div>
      </div>
      
    <p class="post-text"> ${postContent}</p>
    <img src="../assets/avatar.png" class="post-img">

    <div class="postrow">
      <div class="activity-icons">
          <div><img src="../assets/like thumbsup.png" > 120 </div> 
          <div><img src="../assets/comment.png" > 120 </div> 
          <div><img src="../assets/Share edit.jpg" > 120 </div> 

      </div>
    </div>
                                `
        postElement.innerHTML = content
        // console.log(postElement)
        postArea.appendChild(postElement)

    });
    
}

async function getAuthorData(authorUid) {
    console.log(authorUid, "==>>authorUid")


    const docRef = doc(db, "users", authorUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data()
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}

