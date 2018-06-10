import * as $ from 'jquery'
import {Chart} from "./chart"
import {ImdbApi} from "./imdbApi"
import {State} from "./state"

export module ChartComponent {

    const containerId = "tv-ratings-chart"
    const btnId = "tv-ratings-chart-btn"
    const buttonHtml = `
           <a id="tv-ratings-chart-btn" href="#" style="width: 200px;" class="bp_item np_episode_guide"> 
               <div class="bp_content">
                    <div class="bp_description">
                        <div class="bp_heading">Episode Ratings Chart</div>
                    </div>
               </div>
           </a>
        `
    const modalHtml = `
            <div id="${containerId}-modal" style="display:none;z-index: 9999; height: 530px; max-width:80%;">
                <div id="${containerId}">
                    <div class="loading_spinner" style="margin-top: 230px"></div>
                </div>
            </div>
        `


    export function init() {

        $(".button_panel.navigation_panel").append(buttonHtml)
        $("body").append(modalHtml)

        $("#" + btnId).on("click", async () => {
            ($(`#${containerId}-modal`) as any).modal()
            if (!State.onceOpened) {
                const allSeasons = await ImdbApi.getAllSeasons()
                Chart.draw(containerId, allSeasons)
            }
            State.onceOpened = true

        })

    }
}