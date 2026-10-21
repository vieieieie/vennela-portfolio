/**
 * =============================================================================
 * VENNELA - VIDEO EDITOR PORTFOLIO: CENTRALIZED CONTENT CONFIGURATION
 * =============================================================================
 */

const PORTFOLIO_CONFIG = {
  // ---------------------------------------------------------------------------
  // 1. PERSONAL IDENTITY & HERO CONFIGURATION
  // ---------------------------------------------------------------------------
  personal: {
    name: "Vennela",
    title: "Video Editor",
    subtitle: "Visual Storyteller & Post-Production Creative",
    
    // Main biography
    bio: "I specialize in photography, video editing, and colour grading, with a strong eye for detail and visual storytelling. I enjoy creating cinematic visuals that capture emotions, enhance the mood, and turn ordinary moments into visually compelling stories.",
    
    // Portrait image path
    profileImage: "assets/vennela-photo.jpg",
    
    // Contact details
    email: "vvennelaaa@gmail.com",
    instagramUrl: "https://instagram.com/vvennelaaa",
    instagramHandle: "@vvennelaaa",
    
    // About Me Details
    about: {
      tagline: "Every cut is a deliberate emotional beat.",
      philosophy: "I specialize in photography, video editing, and colour grading, with a strong eye for detail and visual storytelling. I enjoy creating cinematic visuals that capture emotions, enhance the mood, and turn ordinary moments into visually compelling stories.",
      experienceYears: "3+",
      desktopTools: [
        { name: "Adobe Premiere Pro", level: "Primary Desktop NLE", icon: "video" },
        { name: "After Effects", level: "Motion & VFX", icon: "sparkles" }
      ],
      mobileTools: [
        { name: "VN Video Editor", level: "Mobile Precision Cut", icon: "film" },
        { name: "CapCut", level: "Short-Form Mobile", icon: "smartphone" }
      ],
      highlights: [
        { count: "3+", label: "Years Editing" },
        { count: "3", label: "Narrative Short Films" },
        { count: "50+", label: "Reels & Shorts Cut" },
        { count: "100%", label: "Story-Driven" }
      ]
    }
  },

  // ---------------------------------------------------------------------------
  // 2. THE PORTFOLIO CATEGORIES
  // ---------------------------------------------------------------------------
  categories: {
    "short-form": {
      id: "short-form",
      title: "Short-Form Content",
      shortDescription: "Reels, Shorts, and vertical social content.",
      fullDescription: "Vertical edits optimized for Instagram Reels, YouTube Shorts, and high visual engagement.",
      badge: "9:16 Vertical Feeds",
      aspectRatio: "9:16",
      accentColor: "from-sky-500/30 to-indigo-500/20",
      stats: "Reels & Shorts &bull; High Retention"
    },
    "long-form": {
      id: "long-form",
      title: "Long-Form Content",
      shortDescription: "Narrative short films and cinematic widescreen stories.",
      fullDescription: "Narrative short films and widescreen stories shaped with dramatic arc, pacing, and visual emotion.",
      badge: "16:9 Widescreen & Cinema",
      aspectRatio: "16:9",
      accentColor: "from-indigo-600/30 to-cyan-500/20",
      stats: "Narrative Cinema &bull; 16:9 Widescreen"
    }
  },

  // ---------------------------------------------------------------------------
  // 3. CONTACT ME SECTION CONFIGURATION
  // ---------------------------------------------------------------------------
  contact: {
    heading: "Have a project in mind?",
    subheading: "Let’s create something worth watching.",
    invitation: "Whether you have raw footage that needs a cinematic narrative touch, a pipeline of vertical shorts needing viral pacing, or a long-form film in post-production — reach out and let's bring it to life.",
    emailLabel: "Email Me",
    instagramLabel: "Instagram",
    availability: "Available for freelance projects & creative collaborations"
  },

  // ---------------------------------------------------------------------------
  // 4. PORTFOLIO PROJECTS CATALOG
  // ---------------------------------------------------------------------------
  projects: [
    // -------------------------------------------------------------------------
    // CATEGORY: SHORT-FORM CONTENT (9:16 Vertical)
    // -------------------------------------------------------------------------
    {
      id: "sf-ig-01",
      category: "short-form",
      title: "Video 1",
      platform: "Instagram Reel",
      aspectRatio: "9:16",
      videoUrl: "https://www.instagram.com/reel/DecZIMKuu8m/",
      embedUrl: "https://www.instagram.com/reel/DecZIMKuu8m/embed",
      thumbnail: "assets/thumb-reel-1.svg",
      featured: true
    },
    {
      id: "sf-ig-02",
      category: "short-form",
      title: "Video 2",
      platform: "Instagram Reel",
      aspectRatio: "9:16",
      videoUrl: "https://www.instagram.com/reel/DeSJ7_7BHOK/",
      embedUrl: "https://www.instagram.com/reel/DeSJ7_7BHOK/embed",
      thumbnail: "assets/thumb-reel-2.svg",
      featured: true
    },
    {
      id: "sf-ig-03",
      category: "short-form",
      title: "Video 3",
      platform: "Instagram Reel",
      aspectRatio: "9:16",
      videoUrl: "https://www.instagram.com/reel/DeH7sLGB2SF/",
      embedUrl: "https://www.instagram.com/reel/DeH7sLGB2SF/embed",
      thumbnail: "assets/thumb-reel-3.svg",
      featured: false
    },
    {
      id: "sf-ig-04",
      category: "short-form",
      title: "Video 4",
      platform: "Instagram Reel",
      aspectRatio: "9:16",
      videoUrl: "https://www.instagram.com/reel/DdWBg5xvxwy/",
      embedUrl: "https://www.instagram.com/reel/DdWBg5xvxwy/embed",
      thumbnail: "assets/thumb-reel-4.svg",
      featured: false
    },
    {
      id: "sf-ig-05",
      category: "short-form",
      title: "Video 5",
      platform: "Instagram Reel",
      aspectRatio: "9:16",
      videoUrl: "https://www.instagram.com/reel/DcAQ1vsTcL1/",
      embedUrl: "https://www.instagram.com/reel/DcAQ1vsTcL1/embed",
      thumbnail: "assets/thumb-reel-5.svg",
      featured: false
    },
    {
      id: "sf-yt-01",
      category: "short-form",
      title: "Video 6",
      platform: "YouTube Short",
      aspectRatio: "9:16",
      videoUrl: "https://youtube.com/shorts/rCN1OjbXxnY",
      embedUrl: "https://www.youtube-nocookie.com/embed/rCN1OjbXxnY",
      thumbnail: "https://img.youtube.com/vi/rCN1OjbXxnY/hqdefault.jpg",
      featured: true
    },
    {
      id: "sf-yt-02",
      category: "short-form",
      title: "Video 7",
      platform: "YouTube Short",
      aspectRatio: "9:16",
      videoUrl: "https://youtube.com/shorts/KpUn7NM3P9g",
      embedUrl: "https://www.youtube-nocookie.com/embed/KpUn7NM3P9g",
      thumbnail: "https://img.youtube.com/vi/KpUn7NM3P9g/hqdefault.jpg",
      featured: true
    },
    {
      id: "sf-yt-03",
      category: "short-form",
      title: "Video 8",
      platform: "YouTube Short",
      aspectRatio: "9:16",
      videoUrl: "https://youtube.com/shorts/oVght9doVA0",
      embedUrl: "https://www.youtube-nocookie.com/embed/oVght9doVA0",
      thumbnail: "https://img.youtube.com/vi/oVght9doVA0/hqdefault.jpg",
      featured: false
    },
    {
      id: "sf-yt-04",
      category: "short-form",
      title: "Video 9",
      platform: "YouTube Short",
      aspectRatio: "9:16",
      videoUrl: "https://youtube.com/shorts/zf0eN_YpTTo",
      embedUrl: "https://www.youtube-nocookie.com/embed/zf0eN_YpTTo",
      thumbnail: "https://img.youtube.com/vi/zf0eN_YpTTo/hqdefault.jpg",
      featured: false
    },
    {
      id: "sf-yt-05",
      category: "short-form",
      title: "Video 10",
      platform: "YouTube Short",
      aspectRatio: "9:16",
      videoUrl: "https://youtube.com/shorts/Z-0Ft9PHvtY",
      embedUrl: "https://www.youtube-nocookie.com/embed/Z-0Ft9PHvtY",
      thumbnail: "https://img.youtube.com/vi/Z-0Ft9PHvtY/hqdefault.jpg",
      featured: false
    },
    {
      id: "sf-yt-06",
      category: "short-form",
      title: "Video 11",
      platform: "YouTube Short",
      aspectRatio: "9:16",
      videoUrl: "https://youtube.com/shorts/nYaw7Nh2UV4",
      embedUrl: "https://www.youtube-nocookie.com/embed/nYaw7Nh2UV4",
      thumbnail: "https://img.youtube.com/vi/nYaw7Nh2UV4/hqdefault.jpg",
      featured: false
    },
    {
      id: "sf-yt-07",
      category: "short-form",
      title: "Video 12",
      platform: "YouTube Short",
      aspectRatio: "9:16",
      videoUrl: "https://youtube.com/shorts/rt5C-5nCCzk",
      embedUrl: "https://www.youtube-nocookie.com/embed/rt5C-5nCCzk",
      thumbnail: "https://img.youtube.com/vi/rt5C-5nCCzk/hqdefault.jpg",
      featured: false
    },
    {
      id: "sf-yt-08",
      category: "short-form",
      title: "Video 13",
      platform: "YouTube Short",
      aspectRatio: "9:16",
      videoUrl: "https://youtube.com/shorts/efIC3F2zawA",
      embedUrl: "https://www.youtube-nocookie.com/embed/efIC3F2zawA",
      thumbnail: "https://img.youtube.com/vi/efIC3F2zawA/hqdefault.jpg",
      featured: false
    },
    {
      id: "sf-yt-09",
      category: "short-form",
      title: "Video 14",
      platform: "YouTube Short",
      aspectRatio: "9:16",
      videoUrl: "https://youtube.com/shorts/fyIuanRhK2k",
      embedUrl: "https://www.youtube-nocookie.com/embed/fyIuanRhK2k",
      thumbnail: "https://img.youtube.com/vi/fyIuanRhK2k/hqdefault.jpg",
      featured: false
    },

    // -------------------------------------------------------------------------
    // CATEGORY: LONG-FORM CONTENT (16:9 Widescreen & Cinema)
    // -------------------------------------------------------------------------
    {
      id: "lf-01",
      category: "long-form",
      title: "Video 1",
      platform: "Short Film",
      aspectRatio: "16:9",
      videoUrl: "https://www.youtube.com/watch?v=IE3FwS2YwqQ",
      embedUrl: "https://www.youtube-nocookie.com/embed/IE3FwS2YwqQ",
      thumbnail: "https://img.youtube.com/vi/IE3FwS2YwqQ/maxresdefault.jpg",
      featured: true
    },
    {
      id: "lf-02",
      category: "long-form",
      title: "Video 2",
      platform: "Short Film",
      aspectRatio: "16:9",
      videoUrl: "https://www.youtube.com/watch?v=-_1b1SUFaJU",
      embedUrl: "https://www.youtube-nocookie.com/embed/-_1b1SUFaJU",
      thumbnail: "https://img.youtube.com/vi/-_1b1SUFaJU/maxresdefault.jpg",
      featured: true
    },
    {
      id: "lf-03",
      category: "long-form",
      title: "Video 3",
      platform: "Short Film",
      aspectRatio: "16:9",
      videoUrl: "https://www.youtube.com/watch?v=COJZv70ATcE",
      embedUrl: "https://www.youtube-nocookie.com/embed/COJZv70ATcE",
      thumbnail: "https://img.youtube.com/vi/COJZv70ATcE/hqdefault.jpg",
      featured: true
    }
  ]
};

// Export to window for simple browser execution without build tool dependencies
if (typeof window !== "undefined") {
  window.PORTFOLIO_CONFIG = PORTFOLIO_CONFIG;
}
