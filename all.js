// 撈json資料
var xhr = new XMLHttpRequest()
xhr.open('post', 'http://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true)
xhr.setRequestHeader('Content-type', 'application/json')
xhr.send()
console.log(xhr)
xhr.onload = function () {
    console.log(xhr)
    var data = JSON.parse(xhr.responseText)
    console.log(data)

    var datalen = data.result.records.length
    var selectid = document.querySelector('.select')
    var title = document.querySelector('.title')
    var container2 = document.querySelector('.container2')
    var nav = document.querySelector('nav')
    var selectnew = document.createElement('option')

    // 下拉選單
    var ZoneList = []
    for (var i = 0; i < datalen; i++) {
        ZoneList.push(data.result.records[i].Zone)
    }
    var Zone = []
    ZoneList.forEach(function (value) {
        if (Zone.indexOf(value) == -1) {
            Zone.push(value)
        }
    })
    console.log(Zone)
    var Zonelen = Zone.length
    for (var i = 0; i < Zonelen; i++) {
        var selectnew = document.createElement('option')
        selectnew.textContent = Zone[i]
        selectnew.setAttribute('class', 'option')
        selectnew.setAttribute('value', Zone[i])
        selectid.appendChild(selectnew)
    }

    // 內容更新
    function updatelist(e) {
        var select = e.target.value
        var Zonestr = ''
        var boxstr = ''
        for (var i = 0; i < datalen; i++) {
            if (select == data.result.records[i].Zone) {
                Zonestr = data.result.records[i].Zone
                boxstr += '<div class="box"><img src = "' + data.result.records[i].Picture1 + '" class="picture1"><h3 class = "name">' + data.result.records[i].Name + '</h3><h5 class="Zone">' + data.result.records[i].Zone + '</h5 ><div class = "text"><p class = "time">' + data.result.records[i].Opentime + '</p><p class="addr">' + data.result.records[i].Add + '</p><p class = "tel">' + data.result.records[i].Tel + '</p><p class="tag">' + data.result.records[i].Ticketinfo + '</p></div></div>'
            }
        }
        title.innerHTML = Zonestr
        container2.innerHTML = boxstr
    }




    // 監聽
    selectid.addEventListener('change', updatelist, false)
    nav.addEventListener('click', updatelist, false)

}
