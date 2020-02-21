"use strict";

let header = `
  <div class="container">
        
    <a href="../index.html">
      <img class="logo" src="../images/logo/logo-light.svg" alt="logo">
    </a>

    <span class="header__phone"><a href="tel:+79853588877">+7 985 358 8877</a></span>

    <a href="mailto:ivan@kapustyanskiy.ru">
      <div class="header__email">
        <img src="../images/header/email-header.png" alt="email">
        <span>ivan@kapustyanskiy.ru</span>
      </div>
    </a>

    <div class="panel__socials">
      <a href="https://www.facebook.com/profile.php?id=100007684937493" target="_blank"><img src="../images/header/facebook-header.jpg" alt="facebook"></a>
      <a href="https://www.instagram.com/ivankapustyanskiy/" target="_blank"><img src="../images/header/instagram-header.jpg" alt="instagram"></a>
      <a href="skype:i.kapustyanskiy"><img src="../images/header/skype-header.jpg" alt="skype"></a>
      <a href="https://www.youtube.com/channel/UCDOzzawwihThV5oLp632Wbg/featured?view_as=subscriber" target="_blank"><img src="../images/header/youtube-header.jpg" alt="youtube"></a>
    </div>

    <div class="header__button">
      <span>перезвоните мне</span>
    </div>

  </div>
`;

let menuHeader = `
  <div class="container">
    <ul>
      <a href="../pages/service.html">
        <li class="menu__service">услуги</li>
      </a>
      <a href="../pages/about-me.html">
        <li class="menu__about-me">обо мне</li>
      </a>
      <a href="../pages/mass-media.html">
        <li class="menu__mass-media">в сми</li>
      </a>
      <a href="../pages/video.html">
        <li class="menu__video">видео</li>
      </a>
      <a href="../pages/faq.html">
        <li class="menu__faq">faq</li>
      </a>
      <a href="#">
        <li class="dzen-holder">Яндкс
          <img src="../images/menu/ya-dzen-light.png" alt="yandex dzen">
          <img src="../images/menu/ya-dzen-dark.png" alt="yandex dzen dark">
        </li>
      </a>
      <a href="../pages/contacts.html">
        <li class="menu__contacts">контакты</li>
      </a>
    </ul>
  </div>
`;

let consultation = `
  <div class="container">
    <div>    
      <a name="consultation"></a>    
      <img src="../images/consultation/consultation-image.jpg" alt="consultation-image">
      
      <div>
        <h2>Запишитесь<br>на персональную консультацию</h2>
        <h6>Получите ответы на самые важные<br>финансовые вопросы</h6>
        
        <form id="consultationForm">
          <input type="text" name="name" placeholder="Как Вас зовут?">
          <input type="email" name="email" placeholder="Ваш e-mail">
          <input type="text" name="text" placeholder="Какой у вас вопрос?">

          <div class="link-banner" id="launchConsultation">
            <span>записаться на консультацию</span>
            <img src="../images/banners/arrow-next-white.png" alt="arrow-next">
          </div>

        </form>
      </div>
    </div>
  </div>
`;

let menuFooter = `
  <div class="container">
    <ul>
      <a href="../pages/service.html">
        <li class="menu__service">услуги</li>
      </a>
      <a href="../pages/about-me.html">
        <li class="menu__about-me">обо мне</li>
      </a>
      <a href="../pages/mass-media.html">
        <li class="menu__mass-media">в сми</li>
      </a>
      <a href="../pages/video.html">
        <li class="menu__video">видео</li>
      </a>
      <a href="../pages/faq.html">
        <li class="menu__faq">faq</li>
      </a>
      <a href="#">
        <li class="dzen-holder">Яндкс<img src="../images/menu/ya-dzen-dark.png" alt="yandex dzen"></li>
      </a>
      <a href="../pages/contacts.html">
        <li class="menu__contacts">контакты</li>
      </a>
    </ul>
  </div>
`;

let footer = `
  <div class="container">      
    <div class="first-floor">
      <div>
        <a href="../index.html"><img class="logo" src="../images/logo/logo-dark.svg" alt="logo"></a>
        <p class="copyright">&#169; 2016 Все права защищены</p>
      </div>

      <div class="services">
          <h5>Услуги</h5>
        <div>          
          <p>Индивидуальные консультации</p>
          <p>Личный финансовый план</p>
          <p>Индивидуальное сопровождение<br>клиента</p>
        </div>
        <div>
          <p>Второе мнение</p>
          <p>Разработка индивидуального<br>решения</p>
        </div>
      </div>

      <div class="subscribe">
        <div>
          <img src="../images/footer/envelope.png" alt="envelope icon">
          <div>
            <h5>Подпишитесь на рассылку</h5>
            <p>Будьте в курсе наших новостей</p>
          </div>
        </div>

        <form>
          <input type="email" placeholder="Ваш e-mail" id="subscribe-email">
          <div class="link-banner"  id="subscribe-button">
            <img src="../images/banners/arrow-next-white.png" alt="arrow-next">
          </div>
        </form>            
      </div>
    </div>

    <div class="second-floor">
      <p>Содержание сайта не является индивидуальной инвестиционной рекомендацией, упомянутые на сайте или в процессе оказания сотрудниками консалтинговой компании<br>
        информационно-аналитических услуг. Финансовые инструменты не могут не соответствовать вашему инвестиционному профилю. </p>
    </div>
  </div>
`;

document.querySelector("header").insertAdjacentHTML("afterBegin", header);
document.querySelector(".menu--header").insertAdjacentHTML("afterBegin", menuHeader);
document.querySelector(".consultation").insertAdjacentHTML("afterBegin", consultation);
document.querySelector(".menu--footer").insertAdjacentHTML("afterBegin", menuFooter);
document.querySelector("footer").insertAdjacentHTML("afterBegin", footer);


