function search_do(content, keyWord) {
    var keyWordArr = keyWord.replace(/[\s]+/g, ' ').split(' ');
    var re;
    for (var n = 0; n < keyWordArr.length; n++) {
        //re = new RegExp(">[\s\S]*?"+keyWordArr[n]+"[\s\S]*?<\S","gmi");
        re = new RegExp("" + keyWordArr[n] + "", "gmi");
        content = content.replace(re, '<span style="color:red;font-weight: bold;">' + keyWordArr[n] + '</span>');
    }
    return content;
}