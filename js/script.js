document.addEventListener('DOMContentLoaded', function() {
//режим
  const chart = document.querySelector('.header__openTime');
  const window = document.querySelector('.header__chart');

  chart.addEventListener('mouseover', function() {
    window.classList.add('active');
  })
  chart.addEventListener('mouseout', function() {
    window.classList.remove('active');
  })
  
  // Калькулятор
  const calk = document.querySelector('.header__calculator');
  const links = document.querySelector('.header__links');

  calk.addEventListener('click', () => {
    links.classList.toggle('active');
  })
  document.addEventListener('click', function(event) {
    if (!event.target.contains(links) && !calk.contains(event.target) && calk !== event.target && !links.contains(event.target) && links !== event.target) {
        links.classList.remove('active');
    }
  });

    // Timer

    const deadline = '2023-09-15';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );
  
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
  
    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }
  
    function setClock(selector, endtime) {
  
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
  
        updateClock();
  
        function updateClock() {
            const t = getTimeRemaining(endtime);
  
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
  
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
  
    setClock('.timer', deadline);



    //telefone

      const inputTel = document.querySelector('.content__mod');

      [].forEach.call( document.querySelectorAll('.tel'), function(input) {
      var keyCode;
      function mask(event) {
          
          event.keyCode && (keyCode = event.keyCode);
          var pos = this.selectionStart;
          if (pos < 3) event.preventDefault();
          var matrix = "+7 (___) ___ ____",
              i = 0,
              def = matrix.replace(/\D/g, ""),
              val = this.value.replace(/\D/g, ""),
              new_value = matrix.replace(/[_\d]/g, function(a) {
                  return i < val.length ? val.charAt(i++) || def.charAt(i) : a
              });
          i = new_value.indexOf("_");
          if (i != -1) {
              i < 5 && (i = 3);
              new_value = new_value.slice(0, i)
          }
          var reg = matrix.substr(0, this.value.length).replace(/_+/g,
              function(a) {
                  return "\\d{1," + a.length + "}"
              }).replace(/[+()]/g, "\\$&");
          reg = new RegExp("^" + reg + "$");
          if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
          if (event.type == "blur" && this.value.length < 5)  this.value = ""
      }
  
      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false)
  
    });
  
    //gamburger

    const hamburger = document.querySelector('.menu__hamburger');
    const list = document.querySelector('.menu__products');
    const footer = document.querySelector('.footer');
    const footerMobile = document.querySelector('.footer__mobile');
    hamburger.addEventListener('click', (e) => {
        list.classList.toggle('active');
        footer.classList.toggle('hide');
        footerMobile.classList.toggle('active');
        hamburger.classList.toggle('menu__hamburger_active');
    })

    //Валидация

    

    function validation(form) {
        let result = true;

       const allInputs = form.querySelectorAll('input');
       for (const input of allInputs) {
        console.log(input.getAttribute('type'),input.value);
        switch (input.getAttribute('type')) {
            case 'tel': 
                if (input.value.length < 17) {
                    result = false;
                }
        }
        // if (input.value == "" || input.value < 10) {
        //     result = false
        //     console.log('ошибка поля');
        // } else console.log('dct');
       }

        return result;
    }


    document.getElementById('add-form').addEventListener('submit', function(event) {
        event.preventDefault();
        if (!validation(this)) {
            inputTel.classList.add('content__mod_error');
           } else {
            inputTel.classList.remove('content__mod_error');
           }
      
    })


    inputTel.querySelector('input').addEventListener('change', function() {
        if (!validation(this.closest('form'))) {
            inputTel.classList.add('form__mod_error');
           } else {
            inputTel.classList.remove('form__mod_error');
           }
    })
});