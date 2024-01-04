/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */




/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

// Возьмите свой код из предыдущей практики


'use strict';

document.addEventListener('DOMContentLoaded', () => { // Что бы избежать ошибок при непоследовательной загрузке сайта. DOMContentLoaded – браузер полностью загрузил HTML, было построено DOM-дерево, но внешние ресурсы, такие как картинки <img> и стили, могут быть ещё не загружены. Вместо document можно использовать window;
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const adv = document.querySelectorAll('.promo__adv img'),
          poster = document.querySelector('.promo__bg'),
          genre = poster.querySelector('.promo__genre'),
          movieList = document.querySelector('.promo__interactive-list'),
          addForm = document.querySelector('form.add'),
          addInput = addForm.querySelector('.adding__input'),
          checkbox = addForm.querySelector('[type="checkbox"]');

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`; // Обрезать строку от 0 индекса до 22 (не включая);
            }

            if (favorite) {
                console.log("Добавляем любимый фильм");
            }
            
            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);

            createMovieList(movieDB.movies, movieList);
        }

        event.target.reset(); // Очистить события (элементы на которых произошли действия) (форму);
    });
    
        const deleteAdv = (arr) => {
            arr.forEach(item => {
                item.remove();
            });
        };
    
        
        const makeChanges = () => {
            genre.textContent = 'ДРАМА';
            poster.style.backgroundImage = 'url("../img/bg.jpg")';
        };
        
        
        const sortArr = (arr) => {
            arr.sort();
        };
    
        
        function createMovieList (films, parent) {
            parent.innerHTML = ''; // Очистка элемента;
            sortArr(films);
            films.forEach((film, i) => {
                parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                <div class="delete"></div>
                </li>
                `;
            });

            document.querySelectorAll('.delete').forEach((btn, i) => {
                btn.addEventListener('click', () => {
                    btn.parentElement.remove(); 
                    movieDB.movies.splice(i,  1); // Метод который вырезает определенный элемент с массива. Первый параметр говорит под каким индексом нужно удалить элемент, а второй параметр сколько элементов нужно удалить после выбранного, в первом параметре, элементов;
                    createMovieList(films, parent);
                });
            });
        }
        
        deleteAdv(adv) ;
        makeChanges();
        createMovieList(movieDB.movies, movieList);
});

// Мой вариант выполнения заданий:

//   add = document.querySelector('.add'),
//         input = add.querySelector('.adding__input'),
//         approveBtn = add.querySelector('button'),
//         checkboxInput = add.querySelector('input[type="checkbox"]');

// approveBtn.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     if (input.value === '') {
    //         return approveBtn;
    //     } else if (input.value !== '') {
    //         checkboxInput.checked ? (console.log("Добавляем любимый фильм"), checkboxInput.checked = false) : null;
    //         const addedSlicedMovieNameToList = input.value.length > 23 ? movieDB.movies.push(input.value.slice(0, 21) + '...') : movieDB.movies.push(input.value);
    //         input.value = '';
    //         let createdMovieNameItem = document.createElement('li');
    //         let addedToBottomMovieNameItem = document.querySelector('.promo__interactive-list').append(createdMovieNameItem);
    //         createdMovieNameItem.className = 'promo__interactive-item';
    //         createdMovieNameItem.innerHTML = movieDB.movies[movieDB.movies.length - 1];
    //         return addedSlicedMovieNameToList;
    //     }
    // });