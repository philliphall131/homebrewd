import Owner from "./Owner";
import NotAnOwner from "./NotAnOwner";

function OwnerSection(props) {

    return (
        <div>
            {props.user.bar 
                ? <Owner user={props.user} setUser={props.setUser}/>
                : <NotAnOwner />
            }
        </div>
  );
}

export default OwnerSection;