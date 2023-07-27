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
const userNameOnDashboard = document.querySelector(`.userNameOnDashboard`)
const emailAddresOnDashboard = document.querySelector(`.emailAddresOnDashboard`)
const dashBoardpp = document.querySelector('.dashboardPP')
const uploadImage = document.querySelector(`.upload-image`) 


// console.log(postBtn)

getPosts()

let currentLoggedInUser;

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(uid)
        getUserData(uid)
        currentLoggedInUser = uid
        // // ...
    } else {
        // User is signed out
        // ...
        // console.log("sign out")
        window.location.href = '../login/login.html'
    }
});

let ppOfLoggedInUser

async function getUserData(uid){
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            const {  firstName, email , profilePicture} = docSnap.data()
            ppOfLoggedInUser = profilePicture
            console.log(profilePicture, "==>>profilePicture")
            emailAddresOnDashboard.textContent = email || 'No email updated'
            userNameOnDashboard.textContent= firstName
            // lastNameHTML.textContent = lastName
            dashBoardpp.src = profilePicture || '../assets/user.jpg'
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    } catch (error) {
        console.log(error, "==>>error in get User Data")
    }
}



postBtn.addEventListener('click', postHandler)


async function postHandler() {
    // console.log(postInputBox.value)
    // console.log(currentLoggedInUser, "==>>currentLoggedInUser")


    const file = uploadImage.files[0]

    // Create the file metadata
    /** @type {any} */
    const metadata = {
        contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);


    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                console.log('File available at', downloadURL);

                try {
                    const response = await addDoc(collection(db, "posts"), {
                        postContent: postInputBox.value,
                        authorId: currentLoggedInUser,
                        postImageUrl: downloadURL
                    });

                    // console.log(response.id)
                    getPosts()
                } catch (e) {
                    console.error("Error adding document: ", e);
                }


            });
        }
    );
    
}

async function getPosts() {
    postArea.innerHTML = ''
    const querySnapshot = await getDocs(collection(db, "posts"));

    querySnapshot.forEach(async (doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc);
        const { id, postContent ,postImageUrl} = doc.data()
        console.log(id)
        console.log(postContent)

       

        const authorDetails = await getAuthorData(id)

        
        const postElement = document.createElement('div')
        postElement.setAttribute('class', 'posts')
        const content = `
        <div class="user-profile">
        <img src=${ppOfLoggedInUser} alt="">
        <div>
          <p class="username">${authorDetails?.firstName}</p>
         <span>june 24 2023, 13:40</span>
        </div>
      </div>
      
    <p class="post-text"> ${postContent}</p>
    <img src=${postImageUrl} class="post-img">

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


// getPosts()
