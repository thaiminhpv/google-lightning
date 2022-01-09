const rush_trigger = 'u';

let previous = true;
let rush = false;
let queue = []

// create numbers
function showNumbers() {
    let array = document.querySelectorAll('div.yuRUbf>a,div.r>a');
    for (let i = 0; i < array.length; i++) {
        let positionHolder = document.createElement("span");
        positionHolder.style.position = "relative";
        let counter = document.createElement("h1");
        counter.innerHTML = (i + 1).toString();
        counter.style.position = "absolute";
        counter.style.right = "30px";
        counter.style.top = "30px";
        counter.style.fontSize = "25px";
        positionHolder.appendChild(counter);
        array[i].prepend(positionHolder);
    }
}

function openLinkByShortcut(key) {
    // main function
    let position = parseInt(key) - 1
    console.log(key);
    console.log(position);
    let all_link = document.querySelectorAll('div.yuRUbf>a,div.r>a');
    if (!(key === rush_trigger)) {
        console.log('open in current tab');
        all_link[position].click()
    } else {
        //rush open new tab
        console.log('opening in new tab');
        rush = true

        // start listening
        function rushing(e) {
            if (!rush) return;
            // rush
            let item = parseInt(e.key) - 1;
            console.log('inserting item: ' + item);
            queue.push(item)
            console.log('current queue: ' + queue)
        }

        document.addEventListener('keypress', rushing)

        // end
        setTimeout(() => {
            console.log('timeout!')
            console.log('current queue: ' + queue)
            document.removeEventListener('keypress', rushing)
            console.log('listener removed')
            queue.forEach((item) => {
                console.log('opening link ' + all_link[item]);
                try {
                    window.open(all_link[item].getAttribute('href'), '_blank'); // .focus();
                } catch (e) {}
            })
            queue = []
            console.log('queue cleared');
            rush = false
        }, 1000)
    }
}

(function () {
    //window.onload = showNumbers
    setTimeout(showNumbers, 400)

    document.addEventListener('keypress', (e) => {
        if (rush) return;
        if (e.key === "q" && !previous) {
            previous = true;
        } else if (e.key === "=" && [...document.querySelectorAll(".hdtb-mitem")].filter((e) => e.innerText === "Hình ảnh" || e.innerText === "Images")[0] !== undefined) {
            // go to 'image'
            [...document.querySelectorAll(".hdtb-mitem")].filter((e) => e.innerText === "Hình ảnh" || e.innerText === "Images")[0].children[0].click()
        } else if (e.key === "-" && document.getElementsByClassName('NZmxZe')[0] !== undefined) {
            // go to 'all'
            document.getElementsByClassName('NZmxZe')[0].click()
        } else if (previous) {
            openLinkByShortcut(e.key)
        }
    });
})();
