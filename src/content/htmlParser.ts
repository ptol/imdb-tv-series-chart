import * as $ from 'jquery'
import {Episode} from "./data"
import {Omit} from "utility-types"
import _ = require("lodash")

export module HtmlParser {
    export function parseSeason(html: string) {
        const $season = $.parseHTML(html)
        const $episodes = $(".list_item", $season)
        const episodes = _.compact($episodes.toArray().map(x => parseEpisode($(x))))
        const season = {
            episodes
        }
        return season
    }

    function parseEpisode($episode: JQuery) {
        const rating = parseFloat($episode.find(".ipl-rating-star .ipl-rating-star__rating:first").text())
        if (_.isFinite(rating) && rating > 0) {
            const airDate = $episode.find("div.airdate").text()
            const link = $episode.find(".info strong:first a")
            const title = link.text()
            const url = link.attr("href")!
            const votes = $episode.find(".ipl-rating-star__total-votes").text()
            const episode: Omit<Episode, "index"> = {
                airDate,
                title,
                votes,
                url,
                rating
            }
            return episode
        }
        return undefined
    }


}

