import { ResponsivePie } from '@nivo/pie';
import { useHistory, useParams } from 'react-router-dom';

const MyResponsivePie = ({ data,color }) => {
    const {id} =useParams;
    const history = useHistory();
    console.log(id)
   return( <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.9}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        sortByValue={true}
        colors={{ scheme: color }}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        onClick={(node,event)=> 
        history.push(`/portfolio/${node.data.portfolio_id}/${node.data.label}`)
        
        }
        // console.log(node.data.label)
        // defs={[
        //     {
        //         id: 'dots',
        //         type: 'patternDots',
        //         background: 'inherit',
        //         color: 'rgba(255, 255, 255, 0.3)',
        //         size: 4,
        //         padding: 1,
        //         stagger: true
        //     },
        //     {
        //         id: 'lines',
        //         type: 'patternLines',
        //         background: 'inherit',
        //         color: 'rgba(255, 255, 255, 0.3)',
        //         rotation: -45,
        //         lineWidth: 6,
        //         spacing: 10
        //     }
        // ]}
        // fill={[
        //     data.map((d,index)=>{
        //         return(
        //             {
        //                         match: {
        //                             id: data[index].id
        //                         },
        //                         id: 'dots'
        //                     }
        //         )
        //     })
        // ]}
        // fill={[
        //     {
        //         match: {
        //             id: data[0].id
        //         },
        //         id: 'dots'
        //     },
        //     {
        //         match: {
        //             id: data[2].id
        //         },
        //         id: 'dots'
        //     },
        //     {
        //         match: {
        //             id: data[4].id
        //         },
        //         id: 'dots'
        //     },
        //     {
        //         match: {
        //             id: data[8].id
        //         },
        //         id: 'dots'
        //     },
        //     {
        //         match: {
        //             id: data[6].id
        //         },
        //         id: 'lines'
        //     },
        //     {
        //         match: {
        //             id: data[10].id
        //         },
        //         id: 'lines'
        //     },
        //     {
        //         match: {
        //             id: data[12].id
        //         },
        //         id: 'lines'
        //     },
        //     {
        //         match: {
        //             id: data[13].id
        //         },
        //         id: 'lines'
        //     }
        // ]}
        // legends={[
        //     {
        //         anchor: 'left',
        //         direction: 'column',
        //         justify: false,
        //         translateX: -70,
        //         translateY: 36,
        //         itemsSpacing: 0,
        //         itemWidth: 100,
        //         itemHeight: 30,
        //         itemTextColor: '#999',
        //         itemDirection: 'left-to-right',
        //         itemOpacity: 1,
        //         symbolSize: 18,
        //         symbolShape: 'square',
        //         effects: [
        //             {
        //                 on: 'hover',
        //                 style: {
        //                     itemTextColor: '#000'
        //                 }
        //             }
        //         ]
        //     }
        // ]}
    />)
}

export default MyResponsivePie