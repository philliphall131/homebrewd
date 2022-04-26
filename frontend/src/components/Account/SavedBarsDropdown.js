import { DropdownButton, Dropdown } from 'react-bootstrap';
import BarAPI from '../../utils/bar_utils';

function SavedBarsDropdown(props) {

    return (
        <DropdownButton id="favorite-bars-dropdown" title="My Saved Favorite Bars" variant='warning'>
            {props.userFavBars.map((bar, idx)=>(
                <Dropdown.Item key={`favBars-${idx}`} href={`#/bar/${bar.id}`}>{bar.name}</Dropdown.Item>
            ))}
        </DropdownButton>
  );
}

export default SavedBarsDropdown;