import * as $ from 'jquery'
import 'jquery-modal'
import {ChartComponent} from "./content/chartComponent"
import {State} from "./content/state"
import {PageParser} from "./content/pageParser"
import "jquery-modal/jquery.modal.min.css"

$(() => {
    State.movieId = PageParser.getMovieId()
    const count = PageParser.getSeasonsCount()
    if (count) {
        State.seasonsCount = count
        ChartComponent.init()
    }
})

