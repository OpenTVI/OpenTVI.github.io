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

// 扩展卡片效果
document.querySelectorAll('.rp-card').forEach(card=>{
  card.addEventListener('click',()=>{
    const target=document.querySelector('#selected-publications');
    if(target) target.scrollIntoView({behavior:"smooth"});
  });
});
document.querySelectorAll('.pub-item').forEach(item=>{
    
    let popup = item.querySelector('.pub-popup');
    let timer;

    item.addEventListener('mouseenter', ()=>{
        clearTimeout(timer);
        popup.style.opacity=1;
    });

    item.addEventListener('mouseleave', ()=>{
        timer=setTimeout(()=>popup.style.opacity=0,200);
    });

    popup.addEventListener('mouseenter', ()=>{
        clearTimeout(timer);
    });

    popup.addEventListener('mouseleave', ()=>{
        timer=setTimeout(()=>popup.style.opacity=0,200);
    });

});
// new
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有的研究卡片
    const cards = document.querySelectorAll('.rp-card');

    cards.forEach(card => {
        // 1. 整卡点击效果
        card.addEventListener('click', function(e) {
            if (e.target.closest('.rp-tag') || e.target.closest('a')) {
                return;
            }
                        const mainLink = card.querySelector('.rp-title a') || card.querySelector('.rp-read-more-btn');
            
            if (mainLink) {
                mainLink.click();
            }
        });

        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPct = (x / rect.width) - 0.5;
            const yPct = (y / rect.height) - 0.5;
            card.style.transform = `
                perspective(1000px) 
                rotateY(${xPct * 5}deg) 
                rotateX(${yPct * -5}deg) 
                translateY(-5px)
            `;
        });

        // 鼠标移出时复原
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'translateY(0) rotateY(0) rotateX(0)';
        });
    });
});
// research界面中Research Projects

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.rp-card');

    cards.forEach(card => {
        card.addEventListener('click', function(e) {

            const cardUrl = this.getAttribute('data-url');
            if (e.target.closest('.rp-read-more-btn')) {

                return; 
            }
            if (cardUrl) {
                window.open(cardUrl, '_blank');
            }
        });
    });
});
// contact

  function copyEmail() {
    const emailText = document.getElementById('prof-email').innerText;
    const tooltip = document.getElementById('copy-tooltip');
    
    navigator.clipboard.writeText(emailText).then(() => {

      tooltip.style.opacity = '1';

      setTimeout(() => {
        tooltip.style.opacity = '0';
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }



  document.addEventListener('DOMContentLoaded', function() {
    const researchCards = document.querySelectorAll('.research-card');

    researchCards.forEach(card => {
        card.addEventListener('click', function() {
            researchCards.forEach(c => {
                c.classList.remove('active');
            });

            this.classList.add('active');

            const areaName = this.querySelector('.area-name').textContent;
            const areaData = this.getAttribute('data-area');
            console.log(`研究领域被点击: ${areaName} (Data: ${areaData})`);

        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('teamWechatCard');
    const toast = document.getElementById('copyToast');

    const wechatId = "gh_37904658ebb4"; 

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;  
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; 
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });

    card.addEventListener('click', () => {
        navigator.clipboard.writeText(wechatId).then(() => {
            showToast();
        }).catch(err => {
            console.error('复制失败:', err);
        });
    });

    function showToast() {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }
});
function copyEmail(btn) {
    const email = btn.getAttribute('data-email');
    const toast = document.getElementById("toast-msg");
    const spanText = btn.querySelector('span');

    navigator.clipboard.writeText(email).then(() => {
        // 1. 显示底部 Toast 提示
        toast.className = "show";
        setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);

        // 2. 按钮文字反馈
        const originalText = spanText.innerText;
        spanText.innerText = "已复制!";
        btn.style.background = "#dcfce7"; // 浅绿色
        btn.style.color = "#166534";

        setTimeout(() => {
            spanText.innerText = originalText;
            btn.style.background = "white";
            btn.style.color = "#1e293b"; // 恢复原色
        }, 2000);
    }).catch(err => {
        console.error('Copy failed', err);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('videoWrapper');
    const video = document.getElementById('researchVideo');
    const poster = document.getElementById('videoPoster');

    // 点击封面/播放按钮时的逻辑
    poster.addEventListener('click', () => {
        // 1. 隐藏封面
        poster.classList.add('hidden');
        
        // 2. 显示原生控件 (进度条、音量等)
        video.setAttribute('controls', 'true');
        
        // 3. 开始播放
        video.play();
    });

});
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const nav = document.getElementById('mainNav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

