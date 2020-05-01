<template lang="">
    <div class="echart-wrap">
       <div id="myChart" :style="{float:'left' ,width: '300px', height: '300px'}"></div>
     <echart classify="oneCircle" :dataArray="oneCircleEchart" :style="{float:'left',width: '300px', height: '300px'}"></echart>
    </div>
</template>
<script>
import echart from "../../components/echarts/echart";
export default {
  name: "console",
  components: {
    echart
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      oneCircleEchart: [
        { name: "路飞", value: 10000 },
        { name: "索隆", value: 6181 },
        { name: "弗兰奇", value: 1000 },
        { name: "香吉士", value: 4181 },
        { name: "乔巴", value: 5600 },
        { name: "娜美", value: 6171 },
        { name: "罗宾", value: 6270 },
        { name: "乌索普", value: 4532 },
        { name: "布鲁克", value: 8052 },
        { name: "甚平", value: 9054 }
      ]
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "在Vue中使用echarts" },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.echart-wrap{
    width: 600px;
    margin: 0 auto;
}
</style>