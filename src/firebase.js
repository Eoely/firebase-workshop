import { initializeApp } from 'firebase/app'
import { deleteField, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

/*
Importér de metodene du trenger fra Firestore

*/
import { addDoc, collection, getDoc, doc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

/* Fyll inn firebase config tilhørende ditt Firebase-prosjekt */
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBoioBlbjrCePGZZrv39leRNxS8p228icY",
    authDomain: "bekk-workshop-7ed4c.firebaseapp.com",
    projectId: "bekk-workshop-7ed4c",
    storageBucket: "bekk-workshop-7ed4c.appspot.com",
    messagingSenderId: "761769805031",
    appId: "1:761769805031:web:4db9c52ddefd86049ace42",
    measurementId: "G-YDB3KRHX43"
};

/* Utkommenter disse når firebase config er satt opp */
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

const createQuestion = (question) => {
    // Legg til spørsmål i Firestore. Denne metoden kalles fra komponenten src/Containers/Question.js 

    /* 
        Følg enten dokumentasjonen her https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
        eller se løsningsforslag https://github.com/bekk/firebase-workshop/blob/main/_L%C3%B8sningsforslag_/Del%202%20-%20Firestore/README.md#legge-til-et-dokument-i-databasen
       
        Etter at du har lagt til kode her for å legge til spørsmålet i Firestore, 
        sjekk din Firestore for å se om spørsmålet har blitt lagt til.
    */

    /**
     * Collection specifies the path to the "questions" section within 
     * the general firestore "db"
     * addDoc adds the question to the path
     * "..." is the spread operator allowing sending in a single
     * iterable argument, in this case an object with 2 elements"questions"
     * This argument allows you to automatically send in all elements in the object
     * automatically
     */
    addDoc(collection(db, "questions"), {
        ...question,
    });
};

const getQuestion = (id) => {
    // Hent spøsmål fra Firestore
    // https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document

    //Need to return value
    const questionRef = doc(db, "questions", id);
    return getDoc(questionRef);
}

const updateQuestion = (question, id) => {
    // Oppdatér spøsmål i Firestore
    // https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
    //Assuming the param "question" is a object containting all values in updated question
    //Use spread operator to send all values
    updateDoc(doc(db, "questions", id), { ...question });
}

const deleteQuestion = (id) => {
    // Slett spøsmål i Firestore med id
    // https://firebase.google.com/docs/firestore/manage-data/delete-data#delete_documents
    deleteDoc(doc(db, "questions", id));
}

const getQuestions = () => {
    // Hent all spørsmål 
    // https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
    return getDocs(collection(db, "questions"));
}

const createQuiz = () => {
    // Lag en quiz med spørsmål fra Firestore
}

const registerWithEmailAndPassword = async (name, email, password) => {
    // Registrer en bruker med epost og passord
    // https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            alert(errorCode,errorMessage)
        });
}

const signInWithGoogle = async () => {
    // Registring og innlogging med Google Provider
    // https://firebase.google.com/docs/auth/web/google-signin#handle_the_sign-in_flow_with_the_firebase_sdk

    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const res = await signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log("Bruker innlogget med google");
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(errorCode,errorMessage);
            // ...
        });
}

const logInWithEmailAndPassword = async (email, password) => {
    // Logg inn med epost og passord
    // https://firebase.google.com/docs/auth/web/password-auth#sign_in_a_user_with_an_email_address_and_password

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("Bruker innlogget med epost og passord")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage)
        });
};

const logOut = async () => {
    // Metode for å logge ut
    // https://firebase.google.com/docs/auth/web/password-auth#next_steps
}


const sendPasswordReset = async (email) => {
    // Send mail for å resette passord
    // https://firebase.google.com/docs/auth/web/manage-users#send_a_password_reset_email
    await sendPasswordReset(auth,email)
    .then(()=> {
        console.log("Email er sendt :)");
    })
    .catch((error)=> {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
    // try {
    //     await sendPasswordResetEmail(auth, email);
    //   } catch (err) {
    //     console.error(err);
    //   }
};

export {
    createQuestion,
    getQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestions,
    createQuiz,
    registerWithEmailAndPassword,
    signInWithGoogle,
    logInWithEmailAndPassword,
    logOut,
    sendPasswordReset
};

