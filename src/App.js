import './App.css';
import data from './cofee.json';
import React, { useState } from 'react';
import * as ReactDOM from 'react-dom/client';

function App() {
  /* Преобразуем данные из джсон в объект, далее заполняем массив ингридиентов уникальными значениями */
  let stringData = JSON.stringify(data)
  let objData = JSON.parse(stringData)
  let arrIngridients = [];
  for (let i = 0; i < objData.length; i++) {
    let ingridients = objData[i].ingredients
    arrIngridients.push(ingridients)
}
let title
let description
let urlImage
let allIngridients = arrIngridients.flat();
const makeUniq = (arr) => [...new Set(arr)]
let uniqIngridients = makeUniq(allIngridients) 

/* использую хук useState добавляем в массив выбранные значения элементом в checkbox  */
const [checked, setChecked] = useState([]);
let chosenIngridients
const cofee = document.getElementById('cofee')
const handleCheck = (event) => {
  chosenIngridients = [...checked];
  if (event.target.checked) {
    chosenIngridients = [...checked, event.target.value];
  } else {
    chosenIngridients.splice(checked.indexOf(event.target.value), 1);
  }
  /* сравниваем полученные ингридиенты с рецептами из json, при совпадение возвращаем картинку, название и описание кофе */
  setChecked(chosenIngridients);
  for (let i = 0; i < data.length; i++) {
    if (JSON.stringify(chosenIngridients) == JSON.stringify(data[i].ingredients)) {
        title = (data[i].title)
        description = (data[i].description)
        urlImage =  (data[i].image)
        break
    } else {
    title = 'Кофе не найден'
    description = 'Выберите другие ингридиенты'
    urlImage ='https://thumbs.dreamstime.com/b/%D1%87%D0%B0%D1%88%D0%BA%D0%B0-%D0%BA%D0%BE%D1%84%D0%B5-%D1%81-%D0%B2%D0%BE%D0%BF%D1%80%D0%BE%D1%81%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%BC-%D0%B7%D0%BD%D0%B0%D0%BA%D0%BE%D0%BC-%D0%BD%D0%B0-%D0%BF%D0%B5%D0%BD%D0%B5-%D1%8F-%D0%BB%D1%8E%D0%B1%D0%BB%D1%8E-%D0%BF%D0%B5%D1%80%D0%B5%D1%80%D1%8B%D0%B2-%D1%87%D0%B0%D1%88%D0%BA%D1%83-123415136.jpg'
    }
}
/* Создаем переменную которая будет выводить карточку кофе */
const element = (
  <div>
    <img src={urlImage}></img>
    <h1>{title}</h1>
    <p>{description}</p>
  </div>
);
/* отрисовываем карточку */
ReactDOM.createRoot(cofee).render(element)
};
  return (
    <div>
      <h1>Выберите ингридиенты, по порядку!</h1>
      <form className="ingridients" onChange={handleCheck}>
        {uniqIngridients.map(
          ingridient => <div>
            <input type='checkbox' value={ingridient} />
            {ingridient}
            </div>)}
      </form>
      <div id='cofee' className='cofee'>
      </div>
    </div>
  );
}
export default App;
