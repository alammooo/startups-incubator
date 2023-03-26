function formatCurrency(money) {
    return `Rp. ${money.toLocaleString("id-ID")},00`
}

function getTheYear(date){
    return date.getFullYear()
}


module.exports = {
    formatCurrency , getTheYear 
} 