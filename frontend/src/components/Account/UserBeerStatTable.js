import { Table } from "react-bootstrap";

function UserBeerStatTable(props) {
    
    const formatLiquid = (num, type)=>{
        if (type == 1){
            return (num/12).toFixed(2)
        } else if (type == 2){
            return (num/128).toFixed(2)
        }
    }

    return (
        <>
            <Table responsive>
                <thead>
                    <tr>
                    <th className="stat-table-1">Beer</th>
                    <th className="stat-table-2">Pints</th>
                    <th className="stat-table-3">Gallons</th>
                    </tr>
                </thead>
                <tbody>
                    { props.userStats.map((stat, idx)=>(
                        <tr key={`stat-table-${idx}`}>
                            <td className="stat-table-1">{stat.name}</td>
                            <td className="stat-table-2">{formatLiquid(stat.sum, 1)}</td>
                            <td className="stat-table-3">{formatLiquid(stat.sum,2)}</td>
                        </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
  );
}

export default UserBeerStatTable;