exports.transUrl = (until , str,plus) => {
    str = str.substring(str.indexOf("publicimages" +1));
    console.log(str);
    str = plus+str;
    return str;
};

exports.replaceAll = (str, searchStr, replaceStr) => {
    return str.split(searchStr).join(replaceStr); 
}