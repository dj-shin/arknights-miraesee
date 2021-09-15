import React, {useState} from "react";
import permit from '../resources/icons/Headhunting_Permit.png';
import originium from '../resources/icons/Pure_Originium.png';
import orundum from '../resources/icons/Orundum.png';
import './Header.scss';

interface ResourceEditorProps {
    icon: string;
    name: string;
    amount: number;
}
const ResourceEditor: React.FunctionComponent<ResourceEditorProps> = (props) => {
    const [amount, setAmount] = useState(props.amount);
    return (
        <div className="resource-editor">
            <div className="container">
                <img src={props.icon} alt={props.name}/>
                <span className="amount">{amount}</span>
                <button onClick={() => setAmount(amount + 1)}>+</button>
            </div>
        </div>
    );
}

const Header: React.FunctionComponent = () => {
    return (
        <div id="header">
            <div id="title">미래시</div>
            <div id="resource">
                <ResourceEditor name="cards" amount={9} icon={permit}/>
                <ResourceEditor name="originium" amount={10} icon={originium}/>
                <ResourceEditor name="orundum" amount={2800} icon={orundum}/>
            </div>
        </div>
    );
}
export default Header;
