import { useParams } from "react-router-dom";
import { useEffect } from "react";

function BeerInfoPage(props) {
  const params = useParams()
  let barId = params.barID

  useEffect(() => {
    props.setBar(barId)
    return () => props.setBar(null)
  }, [barId]);
  
  return (
    <div>
        Some additional beer info
    </div>
  );
}

export default BeerInfoPage;