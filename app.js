function pallindrome(str) {
  const reverse = str.split("").reverse().join("");
  return str === reverse;
  //   if (str === reverse) {
  //     return true;
  //   } else {
  //     return false;
  //   }
}

function convertDateToStr(date) {
  let dateStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();
  return dateStr;
}

function getAllDateFormats(date) {
  console.log("hi");
  let dateStr = convertDateToStr(date);
  console.log(dateStr);
  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
  let listOfPalindromes = getAllDateFormats(date);

  let flag = false;

  for (var i = 0; i < listOfPalindromes.length; i++) {
    if (pallindrome(listOfPalindromes[i])) {
      flag = true;
      break;
    }
  }
  console.log(flag);

  return flag;
}

function isLeapYear(year) {
  //   if ((0 == year % 4 && 0 != year % 100) || 0 == year % 400) {
  //     return true;
  //   } else {
  //     return false;
  //   }

  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  let ctr = 0;
  let nextDate = getNextDate(date);

  while (1) {
    ctr++;
    var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}

let dateInputRef = document.querySelector("#bday-input");
let showBtnRef = document.querySelector("#show-btn");
let resultRef = document.querySelector("#result");

function clickHandler(e) {
  let bdayStr = dateInputRef.value;

  if (bdayStr !== "") {
    let listOfDate = bdayStr.split("-");

    let date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };

    let isPalindrome = checkPalindromeForAllDateFormats(date);

    if (isPalindrome) {
      resultRef.innerText = "Yay! your birthday is a palindrome!! 🥳🥳";
    } else {
      let [ctr, nextDate] = getNextPalindromeDate(date);

      resultRef.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! 😔`;
    }
  }
}

showBtnRef.addEventListener("click", clickHandler);
