import React, { createContext, useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../Config/Firebase';
import { useTonAddress } from '@tonconnect/ui-react';

export const UserDataContext = createContext();

export function UserDataProvider({ children }) {
    const [userPoints, setUserPoints] = useState(0);
    const [completedActions, setCompletedActions] = useState([]);
    const userFriendlyAddress = useTonAddress();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userRef = doc(firestore, "userPoints", userFriendlyAddress);
                const docSnap = await getDoc(userRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUserPoints(data.points || 0);
                    setCompletedActions(data.completedActions || []);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (userFriendlyAddress) {
            fetchUserData();
        }
    }, [userFriendlyAddress]);

    console.log(userPoints, "userPoints")
    console.log(completedActions, "completedActions")

    return (
        <UserDataContext.Provider value={{ userPoints, setUserPoints, completedActions, setCompletedActions }}>
            {children}
        </UserDataContext.Provider>
    )
}
