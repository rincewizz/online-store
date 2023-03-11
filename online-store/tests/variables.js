const html = `
<header class="header">
<div class="container header__container">
    <div class="header__logo logo">Online store</div>
    <div class="header__search">
        <input class="header__input-search search" type="search" name="" id="" placeholder="Поиск товара" autofocus autocomplete="off">
    </div>
    <div class="header__cart">
        <div class="header__cart-element cart">
            <div class="cart__icon">
                <span class="cart__count"></span>
            </div>
        </div>
    </div>
</div>
</header>

<main class="main">
<div class="container">
    <h1 class="main__title">Электронные книги</h1>
</div>

<div class="container main__container">            
    <div class="main__sidebar filters">
        <h3>Фильтры по значению</h3>
        <div class="filters__item filter filter--manufacturer">
            <div class="filter__title">Производитель:</div>
            <div class="filter__wrap">
                <label class="filter__label">
                    <input class="filter__checkbox" type="checkbox" name="manufacturer" value="Amazon" id="amazon">
                    <img class="filter__img" src="./assets/img/logos/amazon.jpg" alt="Amazon" title="Amazon">
                </label>
                <label class="filter__label">
                    <input class="filter__checkbox" type="checkbox" name="manufacturer" value="PocketBook" id="">
                    <img class="filter__img" src="./assets/img/logos/pocketbook.jpg" alt="PocketBook" title="PocketBook">
                </label>
                <label class="filter__label">
                    <input class="filter__checkbox" type="checkbox" name="manufacturer" value="Onyx" id="">
                    <img class="filter__img" src="./assets/img/logos/onyx.jpg" alt="Onyx" title="Onyx">
                </label>
            </div>                   
            
        </div>
        <div class="filters__item filter filter--diagonal">
            <div class="filter__title">Диагональ:</div>
            <div class="filter__wrap">
                <label class="filter__label">
                    <input class="filter__checkbox" type="checkbox" name="diagonal" value="6" id="">
                    <div class="filter__btn">6"</div>
                </label>
                <label class="filter__label">
                    <input class="filter__checkbox" type="checkbox" name="diagonal" value="6.8" id="">
                    <div class="filter__btn">6.8"</div>
                </label>
                <label class="filter__label">
                    <input class="filter__checkbox" type="checkbox" name="diagonal" value="7.8" id="">
                    <div class="filter__btn">7.8"</div>
                </label>
                <label class="filter__label">
                    <input class="filter__checkbox" type="checkbox" name="diagonal" value="10.3" id="">
                    <div class="filter__btn">10.3"</div>
                </label>
                <label class="filter__label">
                    <input class="filter__checkbox" type="checkbox" name="diagonal" value="13.3" id="">
                    <div class="filter__btn">13.3"</div>
                </label>
            </div>
        </div>
        <div class="filters__item filter filter--color">
            <div class="filter__title">Цвет:</div>
            <div class="filter__wrap">
                <label class="filter__label">
                    <input class="filter__checkbox" type="checkbox" name="color" value="black" id="">
                    <div class="filter__btn filter__btn--black"></div>
                </label>
                <label class="filter__label">
                    <input class="filter__checkbox" type="checkbox" name="color" value="white" id="">
                    <div class="filter__btn filter__btn--white"></div>
                </label>
                <label class="filter__label">
                    <input class="filter__checkbox" type="checkbox" name="color" value="green" id="">
                    <div class="filter__btn filter__btn--green"></div>
                </label>
                <label class="filter__label">
                    <input class="filter__checkbox" type="checkbox" name="color" value="red" id="">
                    <div class="filter__btn filter__btn--red"></div>
                </label>
            </div>
        </div>
        <div class="filters__item filter filter--popular">
            <label><span class="filter__title">Популярные:</span> <input class="filter__input-checkbox" type="checkbox"></label>
        </div>

        <h3>Фильтры по диапазону</h3>
        <div class="filters__item filter filter--stock">
            <div class="filter__title">Количество на складе:</div>
            <div class="filter__wrap filter__wrap--range">
                <input class="filter__input" type="number" name="" id="stock-from">
                <input class="filter__input" type="number" name="" id="stock-to">
                <div class="filter__range stock-range"></div>
            </div>
        </div>
        <div class="filters__item filter filter--year">
            <div class="filter__title">Год выхода на рынок:</div>
            <div class="filter__wrap filter__wrap--range">
                <input class="filter__input" type="number" name="" id="year-from">
                <input class="filter__input" type="number" name="" id="year-to">
                <div class="filter__range year-range"></div>
            </div>
        </div>
        <div class="filters__clears">
            <button class="clear-btn clear-btn--filters">Сброс фильтров</button>
            <button class="clear-btn clear-btn--cart">Сброс корзины</button>
        </div>

    </div>
    <div class="main__content">
        <div class="sorts">
            <span class="sorts__title"> Сортировать: </span>
            <select class="sort" name="sort" id="">
                <option value="name_asc">По названию, по возрастанию</option>
                <option value="name_desc">По названию, по убыванию</option>
                <option value="year_asc">По году, по возрастанию</option>
                <option value="year_desc">По году, по убыванию</option>
                <option value="count_asc">По количеству, по возрастанию</option>
                <option value="count_desc">По количеству, по убыванию</option>
            </select>
            
        </div>
        <div class="products">

        </div>

    </div>
</div>

</main>
<footer class="footer">
<div class="container footer__container">
    <div class="footer__logo">
        <a href="https://rs.school/js/" target="_blank"><img class="footer__logo-img" src="./assets/img/rs_school_js.svg" alt="rs school"></a>
    </div>
    <div class="footer__year">
        2022
    </div>
    <div class="footer__github">
        <a href="https://github.com/rincewizz" target="_blank"><img class="footer__github-img" src="./assets/img/github.svg" alt="github"></a>
    </div>
</div>

</footer>


<div class="message">
<div class="message__content">Извините, все слоты заполнены</div>
</div>
`;

module.exports.html = html;