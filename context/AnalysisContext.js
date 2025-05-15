import React, { createContext, useContext, useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import firebase from 'firebase/compat/app';

const AnalysisContext = createContext();

export const AnalysisProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);

  const addEntry = (entry) => {
    setEntries((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...entry,
        date: entry.date || new Date().toLocaleDateString()
      }
    ]);
  };

  
  const fetchEntries = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const snapshot = await db
      .collection('analysis_reports')
      .where('uid', '==', user.uid)
      .get();

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    setEntries(data);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <AnalysisContext.Provider value={{ entries, addEntry }}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => useContext(AnalysisContext);
