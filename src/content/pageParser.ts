import * as $ from "jquery"
import {State} from "./state"

export module PageParser {

    export function getMovieId() {
        const url = window.location.href
        const extractId = /title\/(.*)\//
        return extractId.exec(url)![1]
    }

    export function getSeasonsCount() {
        const url = `/title/${State.movieId}/episodes`
        const countText = $(`.seasons-and-year-nav a[href^='${url}']:first`).text()
        if (countText) {
            return parseInt(countText)
        }
        return undefined
    }


    export function getTitle() {
        return $(".title_wrapper h1").text()
    }
}