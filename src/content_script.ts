import * as $ from 'jquery'
import 'jquery-modal'
import {ChartComponent} from "./content/chartComponent"
import {State} from "./content/state"
import {PageParser} from "./content/pageParser"
import "jquery-modal/jquery.modal.min.css"
import {NewPageParser} from "./content/newPageParser";

$(() => {

    function getMovieId() {
        const url = window.location.href
        const extractId = /title\/(.*)\//
        return extractId.exec(url)![1]
    }

    function isNewPage(){
        return !!document.getElementsByTagName("h1")[0].className
    }

    State.isNewPage = isNewPage()
    State.movieId = getMovieId()

    const parser = State.isNewPage ? NewPageParser : PageParser
    const count = parser.getSeasonsCount()
    const title = parser.getTitle()
    if (count) {
        State.seasonsCount = count
        State.title = title
        ChartComponent.init()
    }
})

