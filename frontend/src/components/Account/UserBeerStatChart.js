import { Chart } from "react-google-charts";

function UserBeerStatChart(props) {
    
    const formatLiquid = (num, type)=>{
        if (type == 1){
            return (num/12).toFixed(2)
        } else if (type == 2){
            return (num/128).toFixed(2)
        }
    }
    const data = props.userStats.map((stat)=>([stat.name, (stat.sum/12), "#ffc107", Math.round(stat.sum/12)]))
    data.unshift(["Beer", "Pints",{role:"style"}, { role: 'annotation' }])
      
    const options = {
        title: "iM NoT dRUnK, yEr DruNk",
        hAxis: {
            title: "Beers by keg",
        },
        vAxis: {
            title: "Pints Drunk",
            minValue: 0,
        },
        legend: { position: "none" },
        backgroundColor: "#c5c5c5"
    };

    return (
            <Chart
                className="stat-chart"
                chartType="ColumnChart"
                height={300}
                data={data}
                options={options}

            />
  );
}

export default UserBeerStatChart;