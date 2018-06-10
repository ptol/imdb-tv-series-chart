import {Season} from "./data"
import * as Highcharts from "highcharts"
import {Options} from "highcharts"
import {PageParser} from "./pageParser"
import regression = require('regression')
import _ = require("lodash")

const chartHeight = 500
const seasonColors = [
    "#64dd17",
    "#2f5bea",
    "#ff6c02",
    "#9c27b0",
    "#329fff",
    "#8b4a2e",
    "#9792f8",
    "#e55769"
]

export module Chart {
    function regressionPoints(season: Season) {
        const ratings = season.episodes.map(e => [e.index, e.rating])
        const [m, c] = regression.linear(ratings).equation
        const min = season.episodes[0].index
        const max = _.last(season.episodes)!.index
        return [[min, m * min + c], [max, m * max + c]]
    }

    function regressionChart(season: Season, index: number) {
        if (season.episodes.length == 0) {
            return undefined
        }
        const [[x1, y1], [x2, y2]] = regressionPoints(season)
        const options = {
            type: 'line',
            data: [[x1, y1], [x2, y2]],
            showInLegend: false,
            enableMouseTracking: false,
            marker: {
                enabled: false
            },
            color: seasonColors[index % seasonColors.length]
        }
        return options
    }

    function seasonChart(season: Season, index: number) {

        const options = {
            type: 'scatter',
            name: `Season ${season.number}`,
            data: season.episodes.map((episode, i) => {
                return {
                    tooltip: `
                        S${season.number}, Ep${i + 1}: <strong>${episode.title}</strong> <br/>
                        Air: <strong>${episode.airDate}</strong><br/>
                        Rating: <strong>${episode.rating}</strong> ${episode.votes}<br/>
                    `,
                    url: episode.url,
                    x: episode.index,
                    y: episode.rating
                }
            }),
            marker: {
                symbol: 'circle',
                radius: 3
            },
            point: {
                events: {
                    click: function (x: any) {
                        console.log(x.point)
                        if (x.point.url)
                            window.open(x.point.url)
                    }
                }
            },
            color: seasonColors[index % seasonColors.length],
            tooltip: {
                headerFormat: '',
                pointFormat: '{point.tooltip}'
            }
        }


        return options

    }

    export function draw(containerId: string, seasons: Season[]) {

        const seasonCharts = seasons.map((season, i) => seasonChart(season, i))
        const regressionCharts = _.compact(seasons.map((season, i) => regressionChart(season, i)))

        const options: Options = {
            chart: {
                height: chartHeight
                // backgroundColor:'rgba(255, 255, 255, 0.0)'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    animation: false
                }
            },

            xAxis: {
                visible: false
            },
            yAxis: {
                max: 10,
                title: {
                    text: ''
                }
            },
            title: {
                text: PageParser.getTitle()
            },
            series: seasonCharts.concat(regressionCharts as any)
        }

        Highcharts.chart(containerId, options)

    }
}


