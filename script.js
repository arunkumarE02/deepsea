(function(){
  var $=function(s){return document.querySelector(s)},$$=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};

  $('#burger').onclick=function(){$('#links').classList.toggle('open')};
  $$('#links a').forEach(function(a){a.onclick=function(){$('#links').classList.remove('open')}});

  // Service filter tabs
  $$('.tab').forEach(function(t){
    t.onclick=function(){
      $$('.tab').forEach(function(x){x.classList.remove('on')});t.classList.add('on');
      var f=t.dataset.f;
      $$('#cards .card').forEach(function(c){
        var show=f==='all'||c.dataset.c.split(' ').indexOf(f)>-1;
        c.classList.toggle('hide',!show);
      });
    };
  });

  // Form validation
  $('#form').addEventListener('submit',function(e){
    e.preventDefault();
    var rules={name:'Please enter your name',email:'Please enter a valid email',svc:'Please choose a service',msg:'Please add a few details'};
    var valid=true;
    Object.keys(rules).forEach(function(k){
      var v=$('#'+k).value.trim(),bad=!v||(k==='email'&&!/^\S+@\S+\.\S+$/.test(v));
      document.querySelector('[data-for="'+k+'"]').textContent=bad?rules[k]:'';
      if(bad)valid=false;
    });
    if(valid){$('#form').style.display='none';$('#ok').style.display='block'}
  });

  // Reveal on scroll
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  $$('.reveal').forEach(function(el,i){el.style.transitionDelay=(i%4)*70+'ms';io.observe(el)});

  // Count-up stats
  var so=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting)return;so.unobserve(e.target);
    var b=e.target,n=+b.dataset.n,t0=performance.now();
    (function f(t){var p=Math.min((t-t0)/1400,1);b.textContent=Math.round(n*(1-Math.pow(1-p,3))).toLocaleString()+(n>=100&&p===1?'+':'');if(p<1)requestAnimationFrame(f)})(t0);
  })},{threshold:.5});
  $$('[data-n]').forEach(function(b){so.observe(b)});
})();
