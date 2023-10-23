import React, { useState } from 'react';
import LibraryTableCompleted from '../Components/LibraryTableCompleted';
import LibraryTableInProgress from '../Components/LibraryTableInProgress';
import NavigationBar from '../Components/NavigationBar';
import { Button } from '@mui/material';  // Importing the Material-UI Button component
import '../CSS/general.css';

const Library = () => {
    const [showCompleted, setShowCompleted] = useState(true);

    return (
        <div className='full-screen'>
            <div className='sticky-bar'>
                <NavigationBar />
            </div>
            <div className='libraryTable'>
                {showCompleted ? 
                    <LibraryTableCompleted 
                        showCompleted={showCompleted}
                        setShowCompleted={setShowCompleted}
                    /> 
                    : 
                    <LibraryTableInProgress 
                        showCompleted={showCompleted}
                        setShowCompleted={setShowCompleted}
                    />}
            </div>
        </div>
    );
}

export default Library;

