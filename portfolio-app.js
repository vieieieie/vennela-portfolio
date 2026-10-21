/**
 * =============================================================================
 * VENNELA — VIDEO EDITOR PORTFOLIO: CORE APPLICATION ENGINE
 * =============================================================================
 * Handles rendering from PORTFOLIO_CONFIG, parallax scrolling, category view
 * transitions, video lightbox modal playback, and smooth navigation.
 */

(function () {
  'use strict';

  // Global state
  const state = {
    activeCategory: null, // null means overview of all 3 categories is visible
    activeModalVideo: null,
    isReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  };

  document.addEventListener('DOMContentLoaded', () => {
    initApp();
  });

  function initApp() {
    if (!window.PORTFOLIO_CONFIG) {
      console.error('PORTFOLIO_CONFIG not found. Ensure js/portfolio-data.js is loaded.');
      return;
    }

    renderHero();
    renderAboutMe();
    renderCategoryOverview();
    renderContactSection();
    renderFooter();
    initNavbar();
    initParallax();
    initVideoModal();
    initEmailModal();
    initRouting();

    // Re-initialize Lucide icons if available
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  /* -------------------------------------------------------------------------- */
  /* 1. HERO SECTION (Wireframe Layout)                                         */
  /* -------------------------------------------------------------------------- */
  function renderHero() {
    const config = window.PORTFOLIO_CONFIG.personal;
    
    // Left column: Portrait image
    const portraitContainer = document.getElementById('hero-portrait-container');
    if (portraitContainer) {
      portraitContainer.innerHTML = `
        <div class="portrait-frame w-full max-w-md mx-auto aspect-[4/5] bg-slate-900">
          <img src="${config.profileImage}"
     alt="Portrait of ${config.name}, ${config.title}"
     loading="eager">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>
          <div class="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
            <span class="inline-block px-3 py-1 text-[11px] font-mono tracking-widest uppercase bg-sky-950/80 text-sky-300 border border-sky-400/30 rounded-full backdrop-blur-sm">
              ${config.title}
            </span>
          </div>
        </div>
      `;
    }

    // Left column: Contact buttons DIRECTLY UNDER MY PICTURE
    const heroButtons = document.getElementById('hero-contact-buttons');
    if (heroButtons) {
      heroButtons.innerHTML = `
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mx-auto mt-5">
          <!-- Button 1: Email Me -->
          <a href="mailto:${config.email}?subject=Video%20Editing%20Inquiry%20-%20Vennela" 
             id="hero-email-btn"
             class="btn-primary-blue w-full sm:w-1/2 py-3 px-5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 group text-white shadow-lg cursor-pointer"
             aria-label="Send email to ${config.name}">
            <i data-lucide="mail" class="w-4 h-4 transition-transform group-hover:scale-110"></i>
            <span>Email Me</span>
          </a>

          <!-- Button 2: Instagram -->
          <a href="${config.instagramUrl}" 
             id="hero-instagram-btn"
             target="_blank" 
             rel="noopener noreferrer" 
             class="btn-secondary-dark w-full sm:w-1/2 py-3 px-5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 group text-slate-200 border border-sky-500/20 hover:text-white hover:border-sky-400/50"
             aria-label="Visit ${config.name}'s Instagram profile">
            <i data-lucide="instagram" class="w-4 h-4 transition-transform group-hover:scale-110 text-sky-400"></i>
            <span>Instagram</span>
          </a>
        </div>
        <div class="text-center mt-2.5">
          <button id="hero-email-copy-link" 
                  type="button" 
                  class="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-sky-300 transition-colors cursor-pointer"
                  title="Click to copy email">
            <i data-lucide="mail" class="w-3.5 h-3.5 text-sky-400"></i>
            <span>${config.email}</span>
          </button>
        </div>
      `;
    }

    // Right column: Name, Title & Biography
    const heroIdentity = document.getElementById('hero-identity');
    if (heroIdentity) {
      heroIdentity.innerHTML = `
        <div class="space-y-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/50 border border-sky-500/25 text-xs font-mono uppercase tracking-wider text-sky-300">
            <span class="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
            <span>${config.subtitle}</span>
          </div>

          <div class="space-y-1">
            <h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
              <span class="display-heading">${config.name}</span>
            </h1>
            <p class="text-xl sm:text-2xl font-light tracking-wide text-sky-300 font-body">
              ${config.title}
            </p>
          </div>

          <div class="pt-2 pb-4 text-slate-300 text-base sm:text-lg leading-relaxed border-l-2 border-sky-500/40 pl-5 my-4 bg-gradient-to-r from-sky-950/20 to-transparent rounded-r-xl">
            <p>${config.bio}</p>
          </div>

          <!-- Creative Craft Pillars -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div class="p-3 rounded-xl bg-slate-900/60 border border-sky-500/15">
              <span class="text-xs font-mono text-sky-400 uppercase block mb-1">01 &bull; Rhythm</span>
              <span class="text-sm font-semibold text-slate-200">Pacing & Story Arc</span>
            </div>
            <div class="p-3 rounded-xl bg-slate-900/60 border border-sky-500/15">
              <span class="text-xs font-mono text-sky-400 uppercase block mb-1">02 &bull; Atmosphere</span>
              <span class="text-sm font-semibold text-slate-200">Color & Visual Tone</span>
            </div>
            <div class="p-3 rounded-xl bg-slate-900/60 border border-sky-500/15">
              <span class="text-xs font-mono text-sky-400 uppercase block mb-1">03 &bull; Engagement</span>
              <span class="text-sm font-semibold text-slate-200">High Retention Cuts</span>
            </div>
          </div>

          <!-- Hero Actions -->
          <div class="pt-4 flex flex-wrap items-center gap-4">
            <a href="#work" class="btn-primary-blue px-6 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2 group">
              <span>Explore My Work</span>
              <i data-lucide="arrow-down" class="w-4 h-4 transition-transform group-hover:translate-y-1"></i>
            </a>
            <a href="#about" class="px-5 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Read About Me &rarr;
            </a>
          </div>
        </div>
      `;
    }
  }

  /* -------------------------------------------------------------------------- */
  /* 2. ABOUT ME SECTION                                                        */
  /* -------------------------------------------------------------------------- */
  function renderAboutMe() {
    const config = window.PORTFOLIO_CONFIG.personal;
    const aboutEl = document.getElementById('about-content');
    if (!aboutEl) return;

    aboutEl.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <!-- Story & Philosophy -->
        <div class="lg:col-span-7 space-y-5">
          <div class="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-sky-400">
            <span>ABOUT VENNELA</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Crafting Rhythm from <span class="script-highlight text-sky-300">Raw Timeline</span>
          </h2>
          <p class="text-slate-300 text-base sm:text-lg leading-relaxed">
            ${config.about.philosophy}
          </p>
          <div class="pt-2 space-y-4">
            <!-- Desktop Toolkit -->
            <div>
              <p class="text-xs font-mono text-sky-400 mb-2 uppercase tracking-wider">Post-Production Toolkit (Desktop)</p>
              <div class="grid grid-cols-2 gap-3">
                ${(config.about.desktopTools || []).map(sw => `
                  <div class="glass-card p-3 text-center rounded-xl border border-sky-500/15">
                    <div class="text-sky-400 mb-1 flex justify-center">
                      <i data-lucide="${sw.icon}" class="w-5 h-5"></i>
                    </div>
                    <div class="font-bold text-xs text-white">${sw.name}</div>
                    <div class="text-[10px] text-slate-400 font-mono mt-0.5">${sw.level}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Mobile Toolkit -->
            <div>
              <p class="text-xs font-mono text-sky-400 mb-2 uppercase tracking-wider">Mobile Editing</p>
              <div class="grid grid-cols-2 gap-3">
                ${(config.about.mobileTools || []).map(sw => `
                  <div class="glass-card p-3 text-center rounded-xl border border-sky-500/15">
                    <div class="text-sky-400 mb-1 flex justify-center">
                      <i data-lucide="${sw.icon}" class="w-5 h-5"></i>
                    </div>
                    <div class="font-bold text-xs text-white">${sw.name}</div>
                    <div class="text-[10px] text-slate-400 font-mono mt-0.5">${sw.level}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Experience Stat Cards -->
        <div class="lg:col-span-5 grid grid-cols-2 gap-4">
          ${config.about.highlights.map(stat => `
            <div class="glass-card p-5 rounded-2xl border border-sky-500/15 flex flex-col justify-center items-center text-center">
              <span class="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-1">
                ${stat.count}
              </span>
              <span class="text-xs font-medium text-slate-300 uppercase tracking-wider">
                ${stat.label}
              </span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  /* -------------------------------------------------------------------------- */
  /* 3. MY WORK — THREE PORTFOLIO CATEGORIES                                    */
  /* -------------------------------------------------------------------------- */
  function renderCategoryOverview() {
    const categoriesContainer = document.getElementById('portfolio-categories-grid');
    if (!categoriesContainer) return;

    const categories = Object.values(window.PORTFOLIO_CONFIG.categories);
    const projects = window.PORTFOLIO_CONFIG.projects;

    categoriesContainer.innerHTML = categories.map((cat, idx) => {
      const catProjects = projects.filter(p => p.category === cat.id);
      const projectCount = catProjects.length;
      
      // Real video frame preview for category card (No artificial pictures added)
      let previewThumb = cat.id === 'short-form' 
        ? 'https://img.youtube.com/vi/rCN1OjbXxnY/hqdefault.jpg' 
        : 'https://img.youtube.com/vi/IE3FwS2YwqQ/hqdefault.jpg';

      return `
        <article class="glass-card category-overview-card group relative flex flex-col justify-between overflow-hidden cursor-pointer"
                 data-category-id="${cat.id}"
                 tabindex="0"
                 role="button"
                 aria-label="Open ${cat.title} category view">
          
          <!-- Category Card Preview Thumbnail Banner -->
          <div class="relative w-full aspect-[16/10] overflow-hidden bg-slate-950">
            <img src="${previewThumb}" 
                 alt="${cat.title} Preview" 
                 class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                 loading="lazy">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            
            <!-- Category Badge -->
            <div class="absolute top-4 left-4">
              <span class="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase bg-sky-950/80 text-sky-300 border border-sky-400/30 backdrop-blur-md">
                ${cat.badge}
              </span>
            </div>

            <!-- Project Count Indicator -->
            <div class="absolute top-4 right-4">
              <span class="px-2.5 py-1 rounded-full text-xs font-mono bg-slate-900/90 text-slate-300 border border-slate-700/60 backdrop-blur-md">
                ${projectCount} ${projectCount === 1 ? 'Project' : 'Projects'}
              </span>
            </div>

            <!-- Category Number Accent -->
            <div class="absolute bottom-2 right-4 text-4xl font-black text-sky-500/15 pointer-events-none font-mono">
              0${idx + 1}
            </div>
          </div>

          <!-- Card Content -->
          <div class="p-6 flex flex-col flex-grow justify-between">
            <div class="space-y-2">
              <h3 class="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors">
                ${cat.title}
              </h3>
              <p class="text-sm text-slate-300 leading-relaxed">
                ${cat.shortDescription}
              </p>
              <div class="text-[11px] font-mono text-sky-400/80 pt-1">
                ${cat.stats}
              </div>
            </div>

            <!-- Explore Work Action Button -->
            <div class="pt-6">
              <button class="btn-explore w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between group-hover:border-sky-400">
                <span>Explore Work</span>
                <i data-lucide="arrow-right" class="w-4 h-4 transition-transform group-hover:translate-x-1"></i>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach click and enter listeners to category cards
    document.querySelectorAll('.category-overview-card').forEach(card => {
      const catId = card.getAttribute('data-category-id');
      const handleOpen = () => openCategoryView(catId);

      card.addEventListener('click', handleOpen);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOpen();
        }
      });
    });
  }

  /* -------------------------------------------------------------------------- */
  /* 4. DEDICATED CATEGORY DETAIL VIEW                                          */
  /* -------------------------------------------------------------------------- */
  function openCategoryView(categoryId) {
    const cat = window.PORTFOLIO_CONFIG.categories[categoryId];
    if (!cat) return;

    state.activeCategory = categoryId;
    if (window.location.hash !== `#category-${categoryId}`) {
      window.location.hash = `category-${categoryId}`;
    }

    const overviewSection = document.getElementById('categories-overview-wrapper');
    const detailSection = document.getElementById('category-detail-wrapper');
    if (!overviewSection || !detailSection) return;

    // Smooth transition between Overview and Dedicated Category View
    overviewSection.classList.add('hidden');
    detailSection.classList.remove('hidden');
    detailSection.classList.add('view-enter');

    // Render Category View Content
    renderCategoryDetailContent(cat);

    // Scroll smoothly to top of work section so user sees the view immediately
    const workHeader = document.getElementById('work');
    if (workHeader) {
      workHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function closeCategoryView() {
    state.activeCategory = null;
    if (window.location.hash.startsWith('#category-')) {
      window.location.hash = 'work';
    }

    const overviewSection = document.getElementById('categories-overview-wrapper');
    const detailSection = document.getElementById('category-detail-wrapper');
    if (!overviewSection || !detailSection) return;

    detailSection.classList.add('hidden');
    overviewSection.classList.remove('hidden');
    overviewSection.classList.add('view-enter');

    // Refresh lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function renderCategoryDetailContent(cat) {
    const detailSection = document.getElementById('category-detail-wrapper');
    const allCategories = Object.values(window.PORTFOLIO_CONFIG.categories);
    const projects = window.PORTFOLIO_CONFIG.projects.filter(p => p.category === cat.id);

    detailSection.innerHTML = `
      <!-- Navigation Bar inside Category Detail View -->
      <div class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-sky-500/15">
        <!-- Back Button -->
        <button id="category-back-btn" 
                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white bg-slate-900/90 border border-sky-500/20 hover:border-sky-400 transition-colors self-start">
          <i data-lucide="arrow-left" class="w-4 h-4"></i>
          <span>Back to All Categories</span>
        </button>

        <!-- Category Switching Tabs -->
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-xs font-mono text-slate-400 mr-1 hidden sm:inline">Switch Category:</span>
          ${allCategories.map(c => `
            <button class="category-tab-btn px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${c.id === cat.id ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'}"
                    data-cat-target="${c.id}">
              ${c.title}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Category Heading & Introduction -->
      <div class="mb-10 space-y-3">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-400/30 text-xs font-mono text-sky-300 uppercase tracking-widest">
          <span>${cat.badge}</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          ${cat.title}
        </h2>
        <p class="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          ${cat.fullDescription}
        </p>
        <div class="pt-2 text-xs font-mono text-sky-400 flex items-center gap-2">
          <span>Showing ${projects.length} curated projects</span>
          <span>&bull;</span>
          <span>Click any project to play video</span>
        </div>
      </div>

      <!-- Responsive Projects Grid -->
      <div class="grid grid-cols-1 ${cat.aspectRatio === '9:16' ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-6">
        ${projects.map(project => renderProjectCard(project, cat.aspectRatio)).join('')}
      </div>

      ${projects.length === 0 ? `
        <div class="p-12 text-center rounded-2xl glass-card border border-sky-500/20">
          <p class="text-slate-400 text-base">No projects currently listed in this category.</p>
          <p class="text-xs font-mono text-sky-400 mt-2">Add new projects easily in js/portfolio-data.js</p>
        </div>
      ` : ''}
    `;

    // Hook up Back Button
    const backBtn = document.getElementById('category-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', closeCategoryView);
    }

    // Hook up Category Tabs
    document.querySelectorAll('.category-tab-btn').forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-cat-target');
        openCategoryView(targetId);
      });
    });

    // Hook up Project Card Click / Play Listeners
    document.querySelectorAll('.project-item-card').forEach(card => {
      const projectId = card.getAttribute('data-project-id');
      const project = window.PORTFOLIO_CONFIG.projects.find(p => p.id === projectId);
      
      if (project) {
        card.addEventListener('click', () => {
          openVideoModal(project);
        });
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openVideoModal(project);
          }
        });
      }
    });
  }

  function renderProjectCard(project, aspectRatio) {
    const isVertical = aspectRatio === '9:16';
    let playerHtml = '';

    if (project.embedUrl) {
      playerHtml = `
        <div class="${isVertical ? 'video-wrap-9-16' : 'video-wrap-16-9'} bg-black rounded-xl overflow-hidden shadow-md">
          <iframe src="${project.embedUrl}" 
                  title="${project.title}" 
                  loading="lazy" 
                  class="w-full h-full border-0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowfullscreen></iframe>
        </div>
      `;
    } else if (project.videoUrl && (project.videoUrl.endsWith('.mp4') || project.videoUrl.includes('.mp4'))) {
      playerHtml = `
        <div class="${isVertical ? 'video-wrap-9-16' : 'video-wrap-16-9'} bg-black rounded-xl overflow-hidden shadow-md">
          <video controls preload="metadata" playsinline class="w-full h-full object-contain bg-black" src="${project.videoUrl}"></video>
        </div>
      `;
    }

    return `
      <article class="glass-card rounded-2xl overflow-hidden p-3 flex flex-col justify-between">
        ${playerHtml}
        <div class="pt-3 pb-1 flex items-center justify-between">
          <h4 class="font-bold text-base text-white">
            ${project.title}
          </h4>
          <span class="text-[11px] font-mono text-sky-400">
            ${project.platform}
          </span>
        </div>
      </article>
    `;
  }

  /* -------------------------------------------------------------------------- */
  /* 5. VIDEO LIGHTBOX MODAL                                                    */
  /* -------------------------------------------------------------------------- */
  function initVideoModal() {
    const modal = document.getElementById('video-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const backdrop = document.getElementById('modal-backdrop');

    if (closeBtn) {
      closeBtn.addEventListener('click', closeVideoModal);
    }
    if (backdrop) {
      backdrop.addEventListener('click', closeVideoModal);
    }

    // Keyboard support: Escape closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && !modal.classList.contains('modal-closed')) {
        closeVideoModal();
      }
    });
  }

  function openVideoModal(project) {
    const modal = document.getElementById('video-modal');
    const container = document.getElementById('modal-player-container');
    const titleEl = document.getElementById('modal-video-title');
    const platformEl = document.getElementById('modal-video-platform');
    const externalLink = document.getElementById('modal-external-link');

    if (!modal || !container) return;

    state.activeModalVideo = project;

    if (titleEl) titleEl.textContent = project.title;
    if (platformEl) platformEl.textContent = project.platform || 'Video Showcase';
    if (externalLink) {
      if (project.videoUrl && project.videoUrl.startsWith('http')) {
        externalLink.href = project.videoUrl;
        externalLink.classList.remove('hidden');
        const span = externalLink.querySelector('span');
        if (span) span.textContent = 'Watch on ' + (project.platform || 'Platform');
      } else if (project.videoUrl) {
        externalLink.href = project.videoUrl;
        externalLink.classList.remove('hidden');
        const span = externalLink.querySelector('span');
        if (span) span.textContent = 'Open Video Master';
      } else {
        externalLink.classList.add('hidden');
      }
    }

    const isVertical = project.aspectRatio === '9:16';

    // Set container sizing based on aspect ratio
    if (isVertical) {
      container.className = 'w-full max-w-[380px] aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl relative border border-sky-500/30 mx-auto';
    } else {
      container.className = 'w-full max-w-4xl aspect-[16/9] bg-black rounded-2xl overflow-hidden shadow-2xl relative border border-sky-500/30 mx-auto';
    }

    container.innerHTML = '';

    // Render embed iframe or video player
    if (project.embedUrl) {
      const iframe = document.createElement('iframe');
      let src = project.embedUrl;

      // Autoplay for YouTube embeds
      if (src.includes('youtube') && !src.includes('autoplay=')) {
        src += (src.includes('?') ? '&' : '?') + 'autoplay=1';
      }

      iframe.src = src;
      iframe.className = 'w-full h-full border-0';
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.setAttribute('loading', 'lazy');
      container.appendChild(iframe);
    } else if (project.videoUrl && (project.videoUrl.endsWith('.mp4') || project.videoUrl.includes('.mp4'))) {
      const video = document.createElement('video');
      video.src = project.videoUrl;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.className = 'w-full h-full object-contain bg-black';
      container.appendChild(video);
    } else {
      container.innerHTML = `
        <div class="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-300">
          <p class="mb-4">Direct embedded preview not available for this source.</p>
          <a href="${project.videoUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary-blue px-5 py-2.5 rounded-xl text-xs font-semibold">
            Watch on ${project.platform || 'External Platform'} &rarr;
          </a>
        </div>
      `;
    }

    modal.classList.remove('modal-closed');
    modal.classList.add('modal-open');
    document.body.style.overflow = 'hidden'; // prevent scrolling background

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    const container = document.getElementById('modal-player-container');

    if (!modal) return;

    modal.classList.remove('modal-open');
    modal.classList.add('modal-closed');
    document.body.style.overflow = '';

    // Stop playback by unloading video and clearing container
    if (container) {
      const video = container.querySelector('video');
      if (video) {
        video.pause();
        video.src = '';
        video.load();
      }
      container.innerHTML = '';
    }
    state.activeModalVideo = null;
  }

  /* -------------------------------------------------------------------------- */
  /* 5B. EMAIL CHOOSER MODAL                                                    */
  /* -------------------------------------------------------------------------- */
  function initEmailModal() {
    const emailModal = document.getElementById('email-modal');
    const closeBtn = document.getElementById('email-modal-close');
    const backdrop = document.getElementById('email-modal-backdrop');
    const copyBtn = document.getElementById('email-modal-copy-pill');
    const heroCopyLink = document.getElementById('hero-email-copy-link');

    // Attach click listeners to hero and contact email buttons
    const heroEmailBtn = document.getElementById('hero-email-btn');
    const contactEmailBtn = document.getElementById('contact-email-btn');

    const handleEmailClick = (e) => {
      e.preventDefault();
      openEmailModal();
    };

    if (heroEmailBtn) {
      heroEmailBtn.addEventListener('click', handleEmailClick);
    }
    if (contactEmailBtn) {
      contactEmailBtn.addEventListener('click', handleEmailClick);
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeEmailModal);
    }
    if (backdrop) {
      backdrop.addEventListener('click', closeEmailModal);
    }

    // Keyboard support: Escape closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && emailModal && !emailModal.classList.contains('modal-closed')) {
        closeEmailModal();
      }
    });

    // Copy address handler
    const copyAddress = () => {
      const email = (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.personal && window.PORTFOLIO_CONFIG.personal.email) || 'vvennelaaa@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          const pillText = document.getElementById('email-modal-copy-pill-text');
          if (pillText) {
            pillText.textContent = 'Copied!';
            setTimeout(() => { pillText.textContent = 'Copy'; }, 2000);
          }
        }).catch(() => {
          window.location.href = `mailto:${email}`;
        });
      } else {
        window.location.href = `mailto:${email}`;
      }
    };

    if (copyBtn) {
      copyBtn.addEventListener('click', copyAddress);
    }
    if (heroCopyLink) {
      heroCopyLink.addEventListener('click', (e) => {
        e.preventDefault();
        openEmailModal();
      });
    }
  }

  function openEmailModal() {
    const modal = document.getElementById('email-modal');
    if (!modal) return;
    modal.classList.remove('modal-closed');
    modal.classList.add('modal-open');
    document.body.style.overflow = 'hidden';

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function closeEmailModal() {
    const modal = document.getElementById('email-modal');
    if (!modal) return;
    modal.classList.remove('modal-open');
    modal.classList.add('modal-closed');
    const videoModal = document.getElementById('video-modal');
    if (!videoModal || videoModal.classList.contains('modal-closed')) {
      document.body.style.overflow = '';
    }
  }

  /* -------------------------------------------------------------------------- */
  /* 6. CONTACT ME SECTION & FOOTER                                             */
  /* -------------------------------------------------------------------------- */
  function renderContactSection() {
    const contactConfig = window.PORTFOLIO_CONFIG.contact;
    const personalConfig = window.PORTFOLIO_CONFIG.personal;
    const contactEl = document.getElementById('contact-content');
    if (!contactEl) return;

    contactEl.innerHTML = `
      <div class="max-w-3xl mx-auto text-center space-y-6">
        <div class="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-sky-400">
          <span>GET IN TOUCH</span>
        </div>

        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white display-heading">
          ${contactConfig.heading}
        </h2>

        <p class="text-xl sm:text-2xl text-sky-300 font-script">
          ${contactConfig.subheading}
        </p>

        <p class="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed pt-2">
          ${contactConfig.invitation}
        </p>

        <!-- Two Prominent Contact Buttons -->
        <div class="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <!-- Button 1: Email Me -->
          <a href="mailto:${personalConfig.email}?subject=Video%20Editing%20Inquiry%20-%20Vennela" 
             id="contact-email-btn"
             class="btn-primary-blue w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-3 group text-white shadow-xl shadow-sky-950/40 cursor-pointer"
             aria-label="Send email to ${personalConfig.name}">
            <i data-lucide="mail" class="w-5 h-5 transition-transform group-hover:scale-110"></i>
            <span>${contactConfig.emailLabel}</span>
          </a>

          <!-- Button 2: Instagram -->
          <a href="${personalConfig.instagramUrl}" 
             id="contact-instagram-btn"
             target="_blank" 
             rel="noopener noreferrer" 
             class="btn-secondary-dark w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-3 group text-slate-100 border border-sky-500/25 hover:border-sky-400"
             aria-label="Visit ${personalConfig.name}'s Instagram profile">
            <i data-lucide="instagram" class="w-5 h-5 text-sky-400 transition-transform group-hover:scale-110"></i>
            <span>${contactConfig.instagramLabel}</span>
          </a>
        </div>

        <div class="pt-2 text-center">
          <p class="text-xs font-mono text-slate-400">
            Direct Email: <a href="mailto:${personalConfig.email}" class="text-sky-300 font-semibold hover:underline">${personalConfig.email}</a>
          </p>
        </div>

        <div class="pt-4 text-xs font-mono text-slate-400">
          <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
          <span>${contactConfig.availability}</span>
        </div>
      </div>
    `;
  }

  function renderFooter() {
    const config = window.PORTFOLIO_CONFIG.personal;
    const footerName = document.getElementById('footer-brand-name');
    const footerYear = document.getElementById('footer-year');

    if (footerName) {
      footerName.textContent = `${config.name} — ${config.title}`;
    }
    if (footerYear) {
      footerYear.textContent = new Date().getFullYear();
    }
  }

  /* -------------------------------------------------------------------------- */
  /* 7. CINEMATIC PARALLAX SCROLLING ENGINE                                     */
  /* -------------------------------------------------------------------------- */
  function initParallax() {
    if (state.isReducedMotion) {
      return; // Respect prefers-reduced-motion
    }

    const backLayer = document.querySelector('.parallax-layer-back');
    const midLayer = document.querySelector('.parallax-layer-mid');
    
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.pageYOffset || document.documentElement.scrollTop;
          
          if (backLayer) {
            // Background moves at 0.25x speed
            backLayer.style.transform = `translate3d(0, ${scrollY * 0.25}px, 0)`;
          }
          if (midLayer) {
            // Middle decorative elements move at 0.12x speed
            midLayer.style.transform = `translate3d(0, ${scrollY * 0.12}px, 0)`;
          }

          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* -------------------------------------------------------------------------- */
  /* 8. NAVBAR & ROUTING                                                        */
  /* -------------------------------------------------------------------------- */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Scroll styling for navbar
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar.classList.add('glass-header', 'shadow-lg', 'shadow-sky-950/20');
        navbar.classList.remove('bg-transparent');
      } else {
        navbar.classList.remove('glass-header', 'shadow-lg', 'shadow-sky-950/20');
        navbar.classList.add('bg-transparent');
      }
    }, { passive: true });

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });

      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
        });
      });
    }

    // Scrollspy for active state
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = ['about', 'work', 'contact'];

    window.addEventListener('scroll', () => {
      let currentSection = '';
      const scrollPos = window.pageYOffset + 240;

      sections.forEach(id => {
        const sec = document.getElementById(id);
        if (sec) {
          const top = sec.offsetTop;
          const height = sec.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            currentSection = id;
          }
        }
      });

      navLinks.forEach(link => {
        const target = link.getAttribute('href');
        if (target === `#${currentSection}`) {
          link.classList.add('text-sky-400', 'font-semibold');
          link.classList.remove('text-slate-300');
        } else {
          link.classList.remove('text-sky-400', 'font-semibold');
          link.classList.add('text-slate-300');
        }
      });
    }, { passive: true });
  }

  function initRouting() {
    // Check initial hash
    handleHash();

    window.addEventListener('hashchange', () => {
      handleHash();
    });
  }

  function handleHash() {
    const hash = window.location.hash;
    if (hash.startsWith('#category-')) {
      const catId = hash.replace('#category-', '');
      if (window.PORTFOLIO_CONFIG.categories[catId] && state.activeCategory !== catId) {
        openCategoryView(catId);
      }
    } else if (state.activeCategory && (hash === '#work' || hash === '' || hash === '#hero' || hash === '#about' || hash === '#contact')) {
      closeCategoryView();
    }
  }

})();
