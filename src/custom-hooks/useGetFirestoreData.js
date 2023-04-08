import React, {useState, useEffect} from 'react'
import {db} from '../firebaseConfig'
import {collection, getDocs, onSnapshot  } from 'firebase/firestore'


const useGetFirestoreData = (collectionName) => {

    const [firestoreData, setFirestoreData] = useState([])
    const collectionRef = collection(db, collectionName )
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getData = async () => {
            await onSnapshot(collectionRef, (snapshot) => {
                setFirestoreData(snapshot.docs.map(doc => ({...doc.data(), id :doc.id })))
                setLoading(false)
            })
        }

        getData()
        console.log("UseGetFirestoreData 222222")
    },[])

    return [
        firestoreData, 
        loading
    ]
}
export default useGetFirestoreData







