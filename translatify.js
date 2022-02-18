(function() {
    'use strict';

    const lyricsButtonTimer = setInterval(() => {
        const lyricsButton = document.querySelector('button.ZMXGDTbwxKJhbmEDZlYy')
        if(lyricsButton) {
            clearInterval(lyricsButtonTimer)
            if(location.href === 'https://open.spotify.com/lyrics') waitForLyricsContainer()
            lyricsButton.addEventListener('click', () => {
                if(location.href !== 'https://open.spotify.com/lyrics') waitForLyricsContainer()
            })
        }
    }, 500)

    function waitForLyricsContainer() {
        const lyricsContainerTimer = setInterval(() => {
            const lyricsContainer = document.querySelector('.hW9km7ku6_iggdWDR_Lg')
            if(lyricsContainer) {
                clearInterval(lyricsContainerTimer)
                const lyricsSubContainer = lyricsContainer.lastElementChild

                const lyricsProvider = document.querySelector('._T5UDP2tItG9WGdwO5Yi')
                lyricsProvider.innerHTML = `<span id='lyricsTranslation'>Lyrics translation will appear here</span>` + lyricsProvider.innerText
                const lyricsTranslation = document.getElementById('lyricsTranslation')
                lyricsTranslation.style.cssText = `
                    display: block;
                    color: var(--lyrics-color-active);
                    font-size: larger;
                    margin-bottom: 10px;`

                if(lyricsSubContainer.className === 'sBjjiOPNOtqSuitK1cLZ') {
                    // Synced Lyrics
                    new MutationObserver((muts) => {
                        console.log(muts)
                        const lyricsHighlighted = document.getElementsByClassName("Re403AJffPPuZmX7LRJj")[1]
                        getTranslation(lyricsHighlighted.innerText, response => {
                            lyricsTranslation.innerText = response
                        })
                    }).observe(lyricsSubContainer.firstElementChild, {subtree:true, childList:true, attributes:true})
                }
                else if (lyricsSubContainer.className === 'AEfhRyqGa3vzQrgfdwWE') {
                    // Unsynced Lyrics
                    lyricsTranslation.innerText = 'Translation not available for unsynced lyrics yet'
                    // const lyricsLines = Array.from(document.getElementsByClassName('Re403AJffPPuZmX7LRJj'))
                    // console.log(lyricsLines)
                    // lyricsLines.forEach((line) => {
                    //     getTranslation(line.innerText, response => {
                    //         line.innerHTML = line.innerText + `<span style='display:block; font-size:large; letter-spacing: -.04em; opacity: 0.8'>${response}</span>`
                    //     })
                        
                    //     line.style.lineHeight = 'normal'
                    //     line.style.marginBottom = '20px'
                    // })
                }
            }
        }, 500)
    }


    function getTranslation(source_text, callback) {
        const data = JSON.stringify({
            "texts": [`${source_text}`],
            "to": ["en"]
        });
        
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                callback(JSON.parse(this.responseText).translations[0].translated[0])
            }
        });
        
        xhr.open("POST", "https://lecto-translation.p.rapidapi.com/v1/translate/text");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("x-rapidapi-host", "lecto-translation.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", "f1fc7e2de5mshcbe120b234ce144p102281jsnce3958de7035");
        
        xhr.send(data);
    }

})();