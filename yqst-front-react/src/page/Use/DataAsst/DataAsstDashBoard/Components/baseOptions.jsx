export default {
  MonthChangeListChart: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['承租数量', '出租数量']
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {show: false},
        data: null,
        name: '月份'
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '承租数量',
        type: 'bar',
        barGap: 0,
        label: false,
        emphasis: {
          focus: 'series'
        },
        data: null
      },
      {
        name: '出租数量',
        type: 'bar',
        label: false,
        emphasis: {
          focus: 'series'
        },
        data: null
      }
    ]
  },
  LesseeEntryExitMonthComparisonListChart: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['承租进场量', '承租退场量']
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {show: false},
        data: null,
        name: '月份'
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '承租进场量',
        type: 'bar',
        barGap: 0,
        label: false,
        emphasis: {
          focus: 'series'
        },
        data: null
      },
      {
        name: '承租退场量',
        type: 'bar',
        label: false,
        emphasis: {
          focus: 'series'
        },
        data: null
      }
    ]
  },
  LessorEntryExitMonthComparisonListChart: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['出租进场量', '出租退场量']
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {show: false},
        data: null,
        name: '月份'
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '出租进场量',
        type: 'bar',
        barGap: 0,
        label: false,
        emphasis: {
          focus: 'series'
        },
        data: null
      },
      {
        name: '出租退场量',
        type: 'bar',
        label: false,
        emphasis: {
          focus: 'series'
        },
        data: null
      }
    ]
  },
  LesseeMonthOnMonthGrowthListChart: {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['承租增长量', '环比增长率']
    },
    xAxis: [
      {
        type: 'category',
        data: null,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '承租增长量',
        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        type: 'value',
        name: '环比增长率(%)',
        axisLabel: {
          formatter: '{value}'
        }
      }
    ],
    series: [
      {
        name: '承租增长量',
        type: 'bar',
        data: null
      },
      {
        name: '环比增长率',
        type: 'line',
        yAxisIndex: 1,
        data: null,
        smooth: true
      }
    ]
  },
  LessorMonthOnMonthGrowthListChart: {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['出租增长量', '环比增长率']
    },
    xAxis: [
      {
        type: 'category',
        data: null,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '出租增长量',
        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        type: 'value',
        name: '环比增长率(%)',
        axisLabel: {
          formatter: '{value}'
        }
      }
    ],
    series: [
      {
        name: '出租增长量',
        type: 'bar',
        data: null
      },
      {
        name: '环比增长率',
        type: 'line',
        yAxisIndex: 1,
        data: null,
        smooth: true
      }
    ]
  }
}