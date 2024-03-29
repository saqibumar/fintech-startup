import React from 'react';

const Iframe = ({ source }) => {

    if (!source) {
        return <div>Loading...</div>;
    }

    const src = source;    
    return (
        // basic bootstrap classes. you can change with yours.
        <div className="col-md-12">
            <div className="emdeb-responsive">
                <iframe src={src} title='rw'></iframe>
            </div>
        </div>
    );
};

export default Iframe;