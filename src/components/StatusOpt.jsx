import Grouping from "./Grouping";
import { useState, useEffect } from 'react';

function Status({ tickets, sortBy }) {
    const [statusGroups, setStatusGroups] = useState({
        "Done": [],
        "Todo": [],
        "Backlog": [],
        "In progress": [], 
        "Cancelled": []
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

        const updatedStatusGroups = {};
        Object.keys(statusGroups).forEach((status) => {
            updatedStatusGroups[status] = sortedTickets.filter((ticket) => ticket.status === status);
        });
        setStatusGroups(updatedStatusGroups);
    }, [tickets, sortBy]);
    
    return (
        <>
            <div className="group">
                {Object.keys(statusGroups).map((status, index) => (
                    <Grouping
                        key={index}
                        data={statusGroups[status]}
                        group={['status', status]}
                    />
                ))}
            </div>
        </>
    );
}

export default Status;
