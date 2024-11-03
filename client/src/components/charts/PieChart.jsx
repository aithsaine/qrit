import Chart from "react-apexcharts";

const PieChart = (props) => {
  const { series, options } = props;

  return (
    <div className="relative w-full"> {/* Make sure the container is full width */}
      <Chart
        options={{
          ...options,
          colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'], // Customize colors
          dataLabels: {
            enabled: false, // Disable data labels
          },
          legend: {
            show: false, // Hide legend
          },
          tooltip: {
            theme: 'dark', // Tooltip theme
            style: {
              fontSize: '14px',
              color: '#fff',
              background: '#333',
            },
          },
          
plotOptions: {
  pie: {
    startAngle: 0,
    endAngle: 360,
    expandOnClick: true,
    offsetX: 0,
    offsetY: 0,
    customScale: 1,
    dataLabels: {
        offset: 0,
        minAngleToShowLabel: 10
    }, 
    donut: {
      size: '65%',
      background: 'transparent',
      labels: {
        show: false,
        name: {
          show: true,
          fontSize: '22px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 600,
          color: undefined,
          offsetY: -10,
          formatter: function (val) {
            return val
          }
        },
        value: {
          show: true,
          fontSize: '16px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 400,
          color: undefined,
          offsetY: 16,
          formatter: function (val) {
            return val
          }
        },
        total: {
          show: false,
          showAlways: false,
          label: 'Total',
          fontSize: '22px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 600,
          color: '#373d3f',
          formatter: function (w) {
            return w.globals.seriesTotals.reduce((a, b) => {
              return a + b
            }, 0)
          }
        }
      }
    },      
  }
}
        }}
        type="pie"
        series={series}
      />
    </div>
  );
};

export default PieChart;
