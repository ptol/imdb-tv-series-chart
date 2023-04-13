import * as $ from 'jquery'
import {Chart} from "./chart"
import {ImdbApi} from "./imdbApi"
import {State} from "./state"

export module ChartComponent {

    const containerId = "tv-ratings-chart"
    const btnId = "tv-ratings-chart-btn"
    const oldPageButtonHtml = `
           <a id="${btnId}" href="#" style="width: 200px;" class="bp_item np_episode_guide"> 
               <div class="bp_content">
                    <div class="bp_description">
                        <div class="bp_heading">Episode Ratings Chart</div>
                    </div>
               </div>
           </a>
        `
  const newPageButtonHtml = `
        <a id="${btnId}" href="#chart" style="margin-right:20px;color:var(--ipt-on-baseAlt-textPrimary-color);text-decoration:underline dashed" role="button"  class="sc-89e7233a-0 jXxVEl">Episode ratings chart</a>`
  const modalHtml = `
            <div id="${containerId}-modal" style="display:none;z-index: 9999; height: 530px; max-width:80%;">
                <div id="${containerId}">
                    <div class="ipc-watchlist-ribbon__icon"  style="margin-top: 230px" role="presentation"><svg class="ipc-loader ipc-loader--circle ipc-watchlist-ribbon__loader" width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg"><g class="ipc-loader__container" fill="currentColor"><circle class="ipc-loader__circle ipc-loader__circle--one" cx="24" cy="9" r="4"></circle><circle class="ipc-loader__circle ipc-loader__circle--two" cx="35" cy="14" r="4"></circle><circle class="ipc-loader__circle ipc-loader__circle--three" cx="39" cy="24" r="4"></circle><circle class="ipc-loader__circle ipc-loader__circle--four" cx="35" cy="34" r="4"></circle><circle class="ipc-loader__circle ipc-loader__circle--five" cx="24" cy="39" r="4"></circle><circle class="ipc-loader__circle ipc-loader__circle--six" cx="13" cy="34" r="4"></circle><circle class="ipc-loader__circle ipc-loader__circle--seven" cx="9" cy="24" r="4"></circle><circle class="ipc-loader__circle ipc-loader__circle--eight" cx="13" cy="14" r="4"></circle></g></svg></div>
                </div>
            </div>
        `


    export function init() {
      const buttonHtml = State.isNewPage ? newPageButtonHtml : oldPageButtonHtml
      if(State.isNewPage){
        $("[data-testid='hero-subnav-bar-left-block']").prepend(buttonHtml)
      }else{
        $(".button_panel.navigation_panel").append(buttonHtml)
      }
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