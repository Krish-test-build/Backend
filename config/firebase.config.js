const Firebase=require('firebase-admin');

const serviceAccount=require('../drive-841e8-firebase-adminsdk-fbsvc-cae4e466da.json');


const firebase=Firebase.initializeApp({
    credential:Firebase.credential.cert(serviceAccount),
    
})