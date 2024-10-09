import Cards from './Cards.jsx';
import { useState, useEffect } from 'react';

function Grouping({ data, group }) {
    const [iconImage, setIconImage] = useState('grey-dot.svg');
    const [groupName, setGroupName] = useState('Sumit');
    const [itemCount, setItemCount] = useState('0');

    const statusImagePaths = {
        "Todo": "To-do.svg",
        "In progress": "in-progress.svg",
        "Backlog": "Backlog.svg",
        "Done": "Done.svg",
        "Cancelled": "Cancelled.svg"
    };

    const priorityImagePaths = {
        '0': "No-priority.svg",
        '1': "low.svg",
        '2': "medium.svg",
        '3': "high.svg",
        '4': "UrgentPrioritycolour.svg"
    };

    const priorityLabels = {
        '0': "No Priority",
        '1': "Low",
        '2': "Medium",
        '3': "High",
        '4': "Urgent"
    };

    const userLabels = {
        'usr-1': "Anoop Sharma",
        'usr-2': "Yogesh",
        'usr-3': "Shankar Kumar",
        'usr-4': "Ramesh",
        'usr-5': "Suresh"
    };

    useEffect(() => {
        if (group[0] === 'status') {
            setIconImage(statusImagePaths[group[1]]);
            setGroupName(group[1]);
        } else if (group[0] === 'priority') {
            setIconImage(priorityImagePaths[group[1]]);
            setGroupName(priorityLabels[group[1]]);
        } else if (group[0] === 'user') {
            setGroupName(userLabels[group[1]]);
        }
        setItemCount(data.length ? data.length : '0');
    }, [data]);

    return (
        <>
            <div className="column">
                <div className="column-head">
                    <div className="column-head-left">
                        {iconImage && <img src={iconImage} alt="" />}
                        {groupName && <p>{groupName}</p>}
                        {itemCount && <p>{itemCount}</p>}
                    </div>
                    <div className="column-head-right">
                        <img src="add.svg" alt="" />
                        <img src="3dotmenu.svg" alt="" />
                    </div>
                </div>
                <div className="column-element">
                    {data.map((ticket, index) => (
                        <Cards ticket={ticket} key={index} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Grouping;
