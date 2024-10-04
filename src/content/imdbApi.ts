import {Episode, Season} from "./data"
import {State} from "./state"
import _ = require("lodash")

const root = "https://www.imdb.com/"

export module ImdbApi {

    export async function getSeasonData(buildId: string, number: number) {
        const response = await fetch(
        `${root}_next/data/${buildId}/en-US/title/${State.movieId}/episodes.json?season=${number}&tconst=${State.movieId}`)
        const json = await response.json()
        const episodesData: any[] = json.pageProps.contentData.section.episodes.items
        const episodes = episodesData.map((x:any) => {
            const date = x.releaseDate || {}
            return {
                url: `${root}title/${x.id}`,
                title: x.titleText,
                airDate: `${date.day}.${date.month}.${date.year}`,
                rating: x.aggregateRating,
                votes: x.voteCount
            }
        }).filter(x => Boolean(x.rating))
        return {episodes, number}
    }

    export async function getAllSeasons() {
        const buildId = JSON.parse(document.getElementById('__NEXT_DATA__')!.innerText).buildId
        const seasonsCount = State.seasonsCount
        const loadingCount = seasonsCount
        const seasons = await Promise.all(_.range(seasonsCount - loadingCount, seasonsCount).map(i =>
            getSeasonData(buildId, i + 1)
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