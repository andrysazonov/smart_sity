const toDate = function(dateStringRu) {
    splitString = dateStringRu.split(".").map((item) => parseInt(item));
    return new Date(splitString[2], splitString[1] - 1, splitString[0] + 1);
};

module.exports = toDate;