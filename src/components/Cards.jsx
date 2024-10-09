import { useState, useEffect } from 'react';

function Cards({ ticket }) {
    const [ticketId, setTicketId] = useState('9');
    const [userAvatar, setUserAvatar] = useState('grey-dot.svg');
    const [currentStatus, setCurrentStatus] = useState('To-do.svg');
    const [ticketTitle, setTicketTitle] = useState('Implement Email Notification System');
    const [priorityImage, setPriorityImage] = useState('No-priority.svg');
    const [ticketTag, setTicketTag] = useState('Feature Request');

    const statusImagePaths = {
        "Todo": "To-do.svg",
        "In progress": "in-progress.svg",
        "Backlog": "Backlog.svg",
        "Done": "Done.svg",
        "Cancelled": "Cancelled.svg"
    };
    
    const priorityImagePaths = {
        0: "No-priority.svg",
        1: "low.svg",
        2: "medium.svg",
        3: "high.svg",
        4: "UrgentPrioritycolour.svg"
    };

    useEffect(() => {
        // console.log(ticket);
        setTicketId(ticket.id);
        setUserAvatar(ticket.userId);
        setCurrentStatus(statusImagePaths[ticket.status]);
        setTicketTitle(ticket.title);
        setPriorityImage(priorityImagePaths[ticket.priority]);
        setTicketTag(ticket.tag[0]);
    }, [ticket]);

    return (
        <>
            <div className="card">
                <div className="card-head">
                    <p>{ticketId}</p>
                    {userAvatar && <img src={userAvatar} alt="" />}
                </div>
                <div className="card-description">
                    {currentStatus && <img src={currentStatus} alt="" />}
                    {ticketTitle && <p>{ticketTitle}</p>}
                </div>
                <div className="card-bottom">
                    {priorityImage && <img id='bottom-img' src={priorityImage} alt="" />}
                    <div className="card-req">
                        {ticketTag && <img src='grey-dot.svg' alt="" />}
                        {ticketTag && <p>{ticketTag}</p>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cards;
