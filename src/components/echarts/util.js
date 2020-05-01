import echarts from 'echarts';

const colorList = ['#6481F1','#4CDA99','#F0CA00','#FF7362','#A689EC','#12BCE4'];

export default (el, classify, ...arg) => {
  const instance = echarts.init(el);
  instance.setOption(allOptions[`${classify}Options`](...arg)) ;
  return instance ;
}
const allOptions = {
  // 环形图
  oneCircleOptions: (dataArray, type, unit, innerText) => {
    return {
      color: colorList,
      series: [{
        type: 'pie',
        radius: ['50', '70'],
        center: ['50%', '50%'],
        avoidLabelOverlap: true,
        data: dataArray,
        startAngle: 120,
        label: {
          formatter: (params) => (params.data.name + params.data.value),
          fontSize: 12
        }
      }],
      graphic: {
        type: 'text',
        left: 'center',
        top: 'center',
        z: 2,
        style: {
          text: innerText,
          fill: '#fff',
          textAlign: 'center',
          font: '2rem'
        }
      }
    };
  }
}