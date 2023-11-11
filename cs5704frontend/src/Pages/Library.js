import React, { useState, useEffect, useRef } from 'react';
import LibraryTableCompleted from '../Components/LibraryTableCompleted';
import LibraryTableInProgress from '../Components/LibraryTableInProgress';
import NavigationBar from '../Components/NavigationBar';
import '../CSS/general.css';

const Library = () => {
    // Initialize showCompleted state from localStorage
    const [showCompleted, setShowCompleted] = useState(() => {
        const saved = localStorage.getItem('showCompleted');
        return saved !== null ? JSON.parse(saved) : true;
    });

    const completedTableRef = useRef();
    const processingTableRef = useRef();

    const handleGetCompletedBook = () => {
        if (completedTableRef.current) {
            completedTableRef.current.childFunction();
        }
    };

    const handleGetProcessingBook = () => {
        if (processingTableRef.current) {
            processingTableRef.current.childFunction();
        }
    };

    useEffect(() => {
        if (showCompleted) {
            handleGetCompletedBook();
        } else {
            handleGetProcessingBook();
        }

        localStorage.setItem('showCompleted', JSON.stringify(showCompleted));
    }, [showCompleted]);

    return (
        <div className='full-screen'>
            <div className='sticky-bar'>
                <NavigationBar />
            </div>
            <div className='libraryTable'>
                {showCompleted ?
                    <LibraryTableCompleted
                        ref={completedTableRef}
                        showCompleted={showCompleted}
                        setShowCompleted={setShowCompleted}
                    />
                    :
                    <LibraryTableInProgress
                        ref={processingTableRef}
                        showCompleted={showCompleted}
                        setShowCompleted={setShowCompleted}
                    />
                }
            </div>
        </div>
    );
}

export default Library;


