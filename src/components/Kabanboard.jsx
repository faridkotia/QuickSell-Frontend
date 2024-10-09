import { useEffect, useState } from "react";
import Status from "./StatusOpt";
import User from "./UserOpt";
import Priority from "./PriorityOpt";

function Kabanboard() {
    
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [groupByOption, setGroupByOption] = useState(localStorage.getItem('GroupBy') || 'status');
    const [sortByOption, setSortByOption] = useState(localStorage.getItem('SortBy') || '');
    const [ticketList, setTicketList] = useState([]);
    const [userList, setUserList] = useState([]);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleGroupBySelection = (e) => {
        const selectedGroupBy = e.target.value;
        setGroupByOption(selectedGroupBy);
        localStorage.setItem('GroupBy', selectedGroupBy);
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleSortSelection = (e) => {
        const selectedSortBy = e.target.value;
        setSortByOption(selectedSortBy);
        localStorage.setItem('SortBy', selectedSortBy);
    };

    useEffect(() => {
        const fetchTicketsAndUsers = async () => {
            try {
                const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment', {
                    method: 'GET',
                    credentials: 'include',
                });
                const result = await response.json();
                setTicketList(result.tickets);
                setUserList(result.users);
            } 
            catch (err) {
                console.error(err);
            }
        };
        fetchTicketsAndUsers();
    }, []);

    return (
        <> 
            <div className="header">
                <button className="dropdown-button" onClick={toggleDropdown}>
                    <img src="Display.svg" alt="" />
                    <p>Display</p>
                    <img src="down.svg" alt="" />
                </button>
                {isDropdownVisible && 
                    <div className="dropdown-menu">
                        <div className="dropdown-element">
                            <label>Grouping</label>
                            <select onChange={handleGroupBySelection}>
                                <option value="null">Select</option>
                                <option value="status">Status</option>
                                <option value="user">User</option>
                                <option value="priority">Priority</option>
                            </select>
                        </div>
                        <div className="dropdown-element">
                            <label>Ordering</label>
                            <select onChange={handleSortSelection}>
                                <option value="null">Select</option>
                                <option value="title">Title</option>
                                <option value="priority">Priority</option>
                            </select>
                        </div>
                    </div>
                }
            </div>
            <div className="box">
                {groupByOption === 'status' && <Status tickets={ticketList} sortBy={sortByOption} />}
                {groupByOption === 'user' && <User tickets={ticketList} users={userList} sortBy={sortByOption} />}
                {groupByOption === 'priority' && <Priority tickets={ticketList} sortBy={sortByOption} />}
            </div>
        </>
    );
}

export default Kabanboard;
