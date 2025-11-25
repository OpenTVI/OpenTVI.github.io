(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

/*     $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 800, 'easeInOutExpo');
        return false;
    }); */

    $('.back-to-top').click(function () {
    let distance = $(window).scrollTop();
    let duration = Math.min(800, distance * 1.5); // 最大3秒

    $('html, body').animate({scrollTop: 0}, duration);
});

// background scroll fade-out effect
window.addEventListener("scroll", function () {
    const hero = document.querySelector(".hero-header");
    const maxScroll = 400; // 控制淡出距离，可微调
    const scrollY = window.scrollY;

    let opacity = 1 - scrollY / maxScroll;
    opacity = Math.max(opacity, 0); // 不让负值出现

    hero.style.setProperty("--overlay-opacity", opacity);
});

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    // news container
    
    
})(jQuery);

/* news-cards.js - paste at the end of your main js file or include after DOM ready */
(function () {
  // graceful early exit if no grid
  const grid = document.querySelector('.news-grid');
  if (!grid) return;

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Add simple hover/focus behaviors and keyboard accessibility
  const cards = Array.from(document.querySelectorAll('.news-card'));

  // click-to-open on whole card
  cards.forEach(card => {
    const link = card.dataset.link || card.querySelector('.news-cta')?.href;
    if (link) {
      card.addEventListener('click', (e) => {
        // avoid opening if user clicked the internal anchor (which has its own target)
        const targetTag = e.target.tagName.toLowerCase();
        if (targetTag === 'a' || targetTag === 'button') return;
        window.open(link, '_blank', 'noopener');
      });
    }

    // keyboard: Enter/Space opens
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const href = card.dataset.link || card.querySelector('.news-cta')?.href;
        if (href) window.open(href, '_blank', 'noopener');
      }
    });

    // hover & focus classes
    card.addEventListener('mouseenter', () => card.classList.add('hovered'));
    card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
    card.addEventListener('focus', () => card.classList.add('hovered'));
    card.addEventListener('blur', () => card.classList.remove('hovered'));
  });

  // Optional: subtle mousemove tilt / parallax (disabled if prefers-reduced-motion)
  if (!prefersReduced) {
    const onMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 6; // degrees
      const rotateX = (0.5 - py) * 6;
      card.style.transform = `perspective(900px) translateZ(0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
      card.classList.add('tilt');
    };
    const onLeave = (e) => {
      const card = e.currentTarget;
      card.style.transform = '';
      card.classList.remove('tilt');
    };

    cards.forEach(c => {
      c.addEventListener('mousemove', onMove);
      c.addEventListener('mouseleave', onLeave);
      c.addEventListener('touchstart', onLeave, {passive:true});
    });
  }

})();

window.addEventListener('scroll', function() {
    const parallax = document.querySelectorAll('.parallax');
    parallax.forEach(el => {
        const speed = 0.5; // 背景滚动速度，可调
        const offset = window.pageYOffset;
        el.style.backgroundPositionY = offset * speed + 'px';
    });
});
(function(){
  const flipCard = document.querySelector('.tvi-vmv-flip');

  if(flipCard){
    flipCard.addEventListener('click', ()=> flipCard.classList.toggle('flipped'));
  }
})();
