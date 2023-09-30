import React from 'react';
import LibraryTable from '../Components/LibraryTable';
import NavigationBar from '../Components/NavigationBar';
import '../CSS/general.css';

const Library = () => {
    return (
        <div className='full-screen'>
            <div className='sticky-bar'>
                <NavigationBar />
            </div>
            <div className='sticky-footer'>
                <LibraryTable />
            </div>
        </div>
    );
}

export default Library;
