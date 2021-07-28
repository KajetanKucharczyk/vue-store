import Vue from "vue"

Vue.filter("formatPrice", (price, currency = "zł") => {

    let aPrice = (100 * price).toFixed(0).split("").reverse()
    let aString = ""

    aPrice.forEach((element, key) => {
        aString += element
        if(key == 1)                      aString += ","
        if(key > 1 && (key + 2) % 3 == 0) aString += " "
    })

    return aString.split("").reverse().join('') + " " + currency
})