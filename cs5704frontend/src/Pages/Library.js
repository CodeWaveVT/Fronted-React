import LibraryTableCompleted from '../Components/LibraryTableCompleted';
import LibraryTableInProgress from '../Components/LibraryTableInProgress';
import NavigationBar from '../Components/NavigationBar';
import React, { useState, useEffect, useRef  } from 'react';
import '../CSS/general.css';

const Library = () => {
    const [showCompleted, setShowCompleted] = useState(true);

    const completedTableRef = useRef();
    const processingTableRef = useRef();

    const handleGetCompletedBook = () => {
        if (completedTableRef.current) {
            completedTableRef.current.childFunction();
        }
    }
    const handleGetProcessingBook = () => {
        if (processingTableRef.current) {
            processingTableRef.current.childFunction();
        }
    }

    useEffect(() => {
        if (showCompleted) {
            handleGetCompletedBook();
        }
        else if (!showCompleted){
            handleGetProcessingBook();
        }
    }, [showCompleted]);

    return (
        <div className='full-screen'>
            <div className='sticky-bar'>
                <NavigationBar />
            </div>
            <div className='libraryTable'>
                {showCompleted ?
                    <LibraryTableCompleted 
                        ref = {completedTableRef}
                        showCompleted={showCompleted}
                        setShowCompleted={setShowCompleted}
                    />
                    :
                    <LibraryTableInProgress 
                        ref = {processingTableRef}
                        showCompleted={showCompleted}
                        setShowCompleted={setShowCompleted}
                    />}
            </div>
        </div>
    );
}

export default Library;

