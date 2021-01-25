import React from 'react';

const Filter = ({change, search}) => {
    return (
            <div>
                <form onSubmit={search}>
                    <div>
                        filter form with <input onChange={change}/>
                        {/* <button type="submit">Search</button> */}
                    </div>
                </form>
            </div>
        )
}

export default Filter;