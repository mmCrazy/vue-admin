<template lang="">
    <div class="echart-wrap">
       <div class="margin" id="myChart" :style="{float:'left' ,width: '500px', height: '300px' }"></div>
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
    dataValue(arr, value) {
      let data = [];
      for (let i in arr) {
        data.push(arr[i][value]);
      }
      return data;
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表

      myChart.setOption({
        title: { text: "海贼王战力值" },
        tooltip: {},
        xAxis: {
          data: this.dataValue(this.oneCircleEchart, "name")
        },
        yAxis: {},
        series: [
          {
            name: "战力",
            type: "bar",
            data: this.dataValue(this.oneCircleEchart, "value"),
            itemStyle: {
              normal: {
                color: function(params) {
                  // build a color map as your need.
                  var colorList = [
                    "#6481f1",
                    "#53efa8",
                    "#ffde00",
                    "#ff7e6b",
                    "#b696ff",

                    "#13cefa",
                    "#6e8dff",
                    "#53efa8",
                    "#ffde00",
                    "#ff7e6b",

                    "#D7504B",
                    "#C6E579",
                    "#F4E001",
                    "#F0805A",
                    "#26C0C0"
                  ];

                  return colorList[params.dataIndex];
                }, //以下为是否显示，显示位置和显示格式的设置了
                label: {
                  show: true,
                  position: "top",
                  //formatter: '{c}'
                  formatter: "{b}\n{c}"
                }
              }
            }
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.echart-wrap {
  width: 900px;
  margin: 80px auto;
}
.margin {
    margin-right: 30px;
}
</style>