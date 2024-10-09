import Grouping from "./Grouping";
import { useState, useEffect } from 'react';

function Priority({ tickets, sortBy }) {
    const [priorityGroups, setPriorityGroups] = useState({
        '0': [],
        '1': [],
        '2': [], 
        '3': [],
        '4': []
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

        const updatedPriorityGroups = {};
        Object.keys(priorityGroups).forEach((priority) => {
            updatedPriorityGroups[priority] = sortedTickets.filter((ticket) => ticket.priority.toString() === priority);
        });
        setPriorityGroups(updatedPriorityGroups);
    }, [tickets, sortBy]);

    return (
        <>
            <div className="group">
                {Object.keys(priorityGroups).map((priority, index) => (
                    <Grouping
                        key={index}
                        data={priorityGroups[priority]}
                        group={['priority', priority]}
                    />
                ))}
            </div>
        </>
    );
}

export default Priority;
