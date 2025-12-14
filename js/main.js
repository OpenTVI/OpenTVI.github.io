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

  // 1. 复制邮箱到剪贴板功能
  function copyEmail() {
    const emailText = document.getElementById('prof-email').innerText;
    const tooltip = document.getElementById('copy-tooltip');
    
    navigator.clipboard.writeText(emailText).then(() => {
      // 显示提示
      tooltip.style.opacity = '1';
      // 2秒后隐藏提示
      setTimeout(() => {
        tooltip.style.opacity = '0';
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }

  // 2. 表单提交交互 (模拟)
  function handleFormSubmit(event) {
    event.preventDefault(); // 阻止默认的页面刷新
    
    const form = event.target;
    const btn = form.querySelector('.submit-btn');
    const btnText = form.querySelector('.btn-text');
    const spinner = form.querySelector('.loading-spinner');

    // 切换到 Loading 状态
    btn.disabled = true;
    btnText.innerText = 'Sending...';
    spinner.style.display = 'block';

    // 获取表单数据 (如果需要对接后端，在这里提取数据)
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log('Form Data Collected:', data);

    // --- 模拟网络请求 (3秒延迟) ---
    // 在实际开发中，这里需要替换为 fetch() 请求发送给后端 API (如 Formspree, EmailJS)
    setTimeout(() => {
      // 成功状态
      btnText.innerText = 'Message Sent!';
      spinner.style.display = 'none';
      btn.style.backgroundColor = '#28a745'; // 绿色表示成功

      // 重置表单
      form.reset();

      // 3秒后恢复按钮原状
      setTimeout(() => {
        btn.disabled = false;
        btnText.innerText = 'Send Message';
        btn.style.backgroundColor = ''; // 恢复默认颜色
      }, 3000);
      
    }, 2000); 
  }

  document.addEventListener('DOMContentLoaded', function() {
    // 获取所有研究领域卡片
    const researchCards = document.querySelectorAll('.research-card');

    // 为每个卡片添加点击事件监听器
    researchCards.forEach(card => {
        card.addEventListener('click', function() {
            // 1. 移除所有卡片的 active 类
            researchCards.forEach(c => {
                c.classList.remove('active');
            });

            // 2. 为当前被点击的卡片添加 active 类
            this.classList.add('active');

            // 3. (可选) 打印信息到控制台，以便后续扩展
            const areaName = this.querySelector('.area-name').textContent;
            const areaData = this.getAttribute('data-area');
            console.log(`研究领域被点击: ${areaName} (Data: ${areaData})`);

            // *您可以在这里添加更多交互逻辑，例如弹出一个详细介绍的模态框*
        });
    });
});