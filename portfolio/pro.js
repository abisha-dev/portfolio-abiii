document.addEventListener('DOMContentLoaded', function(){
	// Mobile nav toggle
	const nav = document.getElementById('mainNav');
	const toggle = document.getElementById('navToggle');
	if(toggle && nav) {
		toggle.addEventListener('click', ()=> {
			nav.classList.toggle('open');
			const isOpen = nav.classList.contains('open');
			toggle.setAttribute('aria-expanded', String(isOpen));
		});
	}

	// Smooth scroll for same-page anchors
	document.querySelectorAll('a[href^="#"]').forEach(a=>{
		a.addEventListener('click', function(e){
			const href = this.getAttribute('href');
			if(href.length>1){
				e.preventDefault();
				const el = document.querySelector(href);
				if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
				if(nav && nav.classList.contains('open')) nav.classList.remove('open');
			}
		})
	});

	// Typing effect (preserves original feel)
	const roles = ['IoT Developer','Frontend Developer','React Developer','Arduino & ESP32'];
	let roleIndex = 0, charIndex = 0, deleting = false;
	const typingEl = document.getElementById('typing');
	function typeEffect(){
		const currentRole = roles[roleIndex];
		if(!deleting){
			typingEl && (typingEl.innerText = currentRole.substring(0,charIndex++));
			if(charIndex > currentRole.length){ deleting = true; setTimeout(typeEffect,1000); return; }
		} else {
			typingEl && (typingEl.innerText = currentRole.substring(0,charIndex--));
			if(charIndex===0){ deleting=false; roleIndex=(roleIndex+1)%roles.length; }
		}
		setTimeout(typeEffect, deleting?50:120);
	}
	typingEl && typeEffect();

	// Certification carousel controls
	const certTrack = document.querySelector('.cert-track');
	const prevBtn = document.querySelector('.cert-prev');
	const nextBtn = document.querySelector('.cert-next');
	if(certTrack && (prevBtn || nextBtn)){
		const cardGap = 28;
		function scrollByCard(dir){
			const card = certTrack.querySelector('.cert-card');
			if(!card) return;
			const step = card.offsetWidth + cardGap;
			certTrack.scrollBy({left: dir * step, behavior:'smooth'});
		}
		prevBtn && prevBtn.addEventListener('click', ()=> scrollByCard(-1));
		nextBtn && nextBtn.addEventListener('click', ()=> scrollByCard(1));
	}

	// Project tabs filter
	const projectTabs = document.querySelectorAll('.tab-btn');
	const projectCards = document.querySelectorAll('.project-card');
	projectTabs.forEach(button => {
		button.addEventListener('click', () => {
			const tab = button.dataset.tab;
			projectTabs.forEach(btn => btn.classList.toggle('active', btn === button));
			projectCards.forEach(card => {
				card.classList.toggle('hidden', card.dataset.tab !== tab);
			});
		});
	});

	// Slow movement when photo ring is clicked/touched
	const photoRing = document.querySelector('.photo-ring');
	if(photoRing){
		photoRing.addEventListener('click', () => {
			photoRing.classList.add('active');
		});
		photoRing.addEventListener('transitionend', (event) => {
			if(event.propertyName === 'transform'){
				photoRing.classList.remove('active');
			}
		});
	}
});
