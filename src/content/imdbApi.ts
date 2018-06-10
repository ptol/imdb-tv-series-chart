import {HtmlParser} from "./htmlParser"
import {Episode, Season} from "./data"
import {State} from "./state"
import _ = require("lodash")

const root = "https://www.imdb.com/title/"

export module ImdbApi {

    export async function getSeasonData(number: number) {
        const response = await fetch(root + `${State.movieId}/episodes/_ajax?season=${number}`)
        const html = await response.text()
        return {...HtmlParser.parseSeason(html), number}
    }

    export async function getAllSeasons() {
        const seasonsCount = State.seasonsCount
        const loadingCount = seasonsCount
        const seasons = await Promise.all(_.range(seasonsCount - loadingCount, seasonsCount).map(i =>
            getSeasonData(i + 1)
        ))
        let index = 0
        return seasons.map(data => {
            const season: Season = {
                number: data.number,
                episodes: data.episodes.map(x => {
                    const episode: Episode = {...x, index}
                    index += 1
                    return episode
                })
            }
            return season
        })

    }
}