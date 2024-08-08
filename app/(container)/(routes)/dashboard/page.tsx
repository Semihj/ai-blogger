
import { api } from '@/convex/_generated/api';
import { useClerk } from '@clerk/clerk-react';
import { useQuery } from 'convex/react'
import { format } from 'date-fns';
import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts';

export default function DashboardPage() {

/*   const {user} = useClerk()
  const [series, setSeries] = useState<any>([
    {data:[2]}
  ])
  const dates:any = useQuery(api.functions.getDatesOfTemplates,{
    userId:user?.id
  })
  
  let chartData = 
    [
      { month: 'Jan', value: 0 },
      { month: 'Feb', value: 0 },
      { month: 'Mar', value: 0 },
      { month: 'Apr', value: 0 },
      { month: 'May', value: 0 },
      { month: 'Jun', value: 0 },
      { month: 'Jul', value: 0 },
      { month: 'Aug', value: 0 },
      { month: 'Sep', value: 0 },
      { month: 'Oct', value: 0 },
      { month: 'Nov', value: 0 },
      { month: 'Dec', value: 0 }
    ]


    const handleChartData = () => {
      // Create a new array to avoid mutating the original chartData
      const newChartData = [...chartData];
    
      // Iterate over the dates and increment corresponding values
      dates?.forEach((date) => {
        const month = format(new Date(date), "MMM");
        const index = newChartData?.findIndex(item => item.month === month);
        if (index !== -1) {
          newChartData[index].value += 1;
        }
      });
    
      // Update the chartData state with the new array
      chartData = newChartData
    };
    
  

 
  

  useEffect(() => {
    handleChartData()
    
  }, [chartData,dates])


  const updateSeriesData = () => {
    // Create a copy of chartData to avoid modifying the original
    const copyChartData = chartData;
    const newData = copyChartData.map((data) => data.value);
    setSeries([{
      data:newData
    }])
  };
  
  useEffect(() => {
    updateSeriesData();
  }, [dates]);
  
  useEffect(() => {
   console.log("Changed");
   
  }, [chartData])
  
  
  console.log(chartData);
  
  console.log(series);
  
  
  useEffect(() => {
   if(dates) console.log(format(new Date(dates[0]),"MMM"));
   
  }, [dates]) */
  
  return (
    <div className='w-full h-screen bg-[#040727] flex justify-center items-center text-center ' >
      <h1 className='text-2xl md:text-4xl font-bold text-white text-center  ' ><span className='text-orange-500 ' >Dashboard </span>Page Is Currently Under Development</h1>
    
    </div>
  )
}
