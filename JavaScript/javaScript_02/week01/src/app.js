"use strict";

// exercise 1
let favouriteBooks = [
  `the_priory_of_the_orange_tree`,
  `bow_before_the_elf_queen`,
  `forged_by_magic`,
  `the_forsaken_king`,
  `pride_a_sinful_empire_duet`,
  `the_power_of_myth`,
  `the_wealth_of_nations`,
  `the_second_blind_son`,
  `dragon_mine`,
  `from_now_until_forever`,
];

// exersize 2
// console.log(favouriteBooks);

// exercise 3

// function getfavouriteBooks(books) {
//   const list = document.createElement("ul");
//   document.body.appendChild(list);

//   for (let i = 0; i < books.length; i++) {
//     let listItem = document.createElement("li");
//     listItem.innerHTML = books[i];
//     list.appendChild(listItem);
//   }
// }

// getfavouriteBooks(favouriteBooks);

// exercise 4
const booksInfo = {
  the_priory_of_the_orange_tree: [
    "The Priory of the Orange Tree",
    "English",
    "Samantha Shannon",
  ],
  bow_before_the_elf_queen: [
    "Bow Before the Elf Queen",
    "Spanish",
    "J.M. Kearl",
  ],
  forged_by_magic: ["Forged by Magic", "English", "Jenna Wolfhart"],
  the_forsaken_king: ["The Forsaken King", "German", "Penelope Barsetti"],
  pride_a_sinful_empire_duet: [
    "Pride: A Sinful Empire Duet",
    "Spanish",
    "Eva Charles",
  ],
  the_power_of_myth: ["The Power of Myth", "Romanian", "Joseph Campbell"],
  the_wealth_of_nations: ["The Wealth of Nations", "Spanish", "Adam Smith"],
  the_second_blind_son: ["The Second Blind Son", "English", "Amy Harmon"],
  dragon_mine: ["Dragon Mine", "English", "Donna Grant"],
  from_now_until_forever: ["From Now Until Forever", "English", "Alexa Rivers"],
};
function showFavouriteBooks(listOfBooks, listOfBooksInfo) {
  const myFavouriteBooks = {};

  for (let i of listOfBooks) {
    myFavouriteBooks[i] = {
      title: listOfBooksInfo[i][0],
      language: listOfBooksInfo[i][1],
      author: listOfBooksInfo[i][2],
    };
  }

  return myFavouriteBooks;
}
showFavouriteBooks(favouriteBooks, booksInfo);

// exercise 5
function displayFavouriteBooks(books) {
  const list = document.createElement("ul");
  document.body.appendChild(list);

  for (let i in books) {
    let listItem = document.createElement("li");
    list.appendChild(listItem);

    let title = document.createElement("h1");
    title.innerHTML = ` ${books[i].title}`;

    let language = document.createElement("p");
    language.innerHTML = ` ${books[i].language}`;

    let author = document.createElement("a");
    author.href = `#`;
    author.innerHTML = ` ${books[i].author}`;

    listItem.appendChild(title);
    listItem.appendChild(language);
    listItem.appendChild(author);
    listItem.id = `${i}`;
  }
}

displayFavouriteBooks(showFavouriteBooks(favouriteBooks, booksInfo));

// exercise 6  - Beautify your html page with css (use the style.css file for that).

// exercise 7
function covers(favouriteBooks) {
  let bookCovers = {};
  for (let i of favouriteBooks) {
    bookCovers[i] = `../img/${i}.jpg`;
  }
  return bookCovers;
}
covers(favouriteBooks);

function setImages(obj) {
  // const arrayOfBooks = Object.keys(covers(favouriteBooks));
  let listItems = document.querySelectorAll("li");
  let images = [];
  for (let key in obj) {
    let img = document.createElement("img");
    img.src = obj[key];
    img.alt = key;
    images.push(img);
  }
  for (let item of listItems) {
    for (let img of images) {
      if (item.id === img.alt) {
        item.insertBefore(img, item.children[0]);
      }
    }
  }
}

setImages(covers(favouriteBooks));
