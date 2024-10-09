import Grouping from "./Grouping";
import { useState, useEffect } from 'react';

function User({ tickets, sortBy }) {
    const [userGroups, setUserGroups] = useState({
        'usr-2': [],
        'usr-4': [],
        'usr-1': [],
        'usr-3': [],
        'usr-5': [],
    });

    useEffect(() => {
        const sortedTickets = [...tickets].sort((a, b) => {
            if (sortBy === 'priority') {
                return b.priority - a.priority;
            } 
            else if (sortBy === 'title') {
                return a.title.localeCompare(b.title); 
            }
            return 0;
        });
        const updatedUserGroups = {};
        Object.keys(userGroups).forEach((userId) => {
            updatedUserGroups[userId] = sortedTickets.filter((ticket) => ticket.userId === userId);
        });
        setUserGroups(updatedUserGroups);
    }, [tickets, sortBy]);

    return (
        <>
            <div className="group">
                {Object.keys(userGroups).map((userId, index) => (
                    <Grouping
                        key={index}
                        data={userGroups[userId]}
                        group={['user', userId]}
                    />
                ))}
            </div>
        </>
    );
}

export default User;
