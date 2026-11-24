export interface ClubPhoto {
  id: string;
  code: string;
  title: string;
  tag: string;
  description: string;
  src: string;
}

export interface ClubItem {
  id: string;
  number: string;
  name: string;
  category: string;
  accentColor: string;
  gradient: string;
  coverImage: string;
  motto: string;
  description: string;
  images: ClubPhoto[];
}

export const CLUBS_DATA: ClubItem[] = [
  {
    "id": "aritram",
    "number": "01",
    "name": "ARITRAM",
    "category": "Anchoring",
    "accentColor": "#E8502A",
    "gradient": "from-[#E8502A] to-[#8B1E24]",
    "coverImage": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375274/sanskaran_2026/gallery/aritram/aritram_01.jpg",
    "motto": "The Stage is Yours \u2014 Where Voices Rise and Stories Shine",
    "description": "The official Anchoring Club of Techno India University. Where confidence takes center stage, voices rise, and unforgettable moments are guided with charisma.",
    "images": [
      {
        "id": "ari-01",
        "code": "# 01",
        "title": "The Voice of Sanskaran",
        "tag": "STAGE ANCHORING",
        "description": "Commanding the central amphitheatre stage with elegance and poise during opening ceremonies.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375274/sanskaran_2026/gallery/aritram/aritram_01.jpg"
      },
      {
        "id": "ari-02",
        "code": "# 02",
        "title": "Electrifying the Crowd",
        "tag": "LIVE HOSTING",
        "description": "Engaging thousands of attendees with charismatic interactions and spontaneous stage moments.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375371/sanskaran_2026/gallery/aritram/aritram_02.jpg"
      },
      {
        "id": "ari-03",
        "code": "# 03",
        "title": "Behind the Cue Cards",
        "tag": "BACKSTAGE READINESS",
        "description": "Mastering the event flow and stage cues in the wings before announcing the headliner.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375371/sanskaran_2026/gallery/aritram/aritram_03.jpg"
      },
      {
        "id": "ari-04",
        "code": "# 04",
        "title": "Triumphant Curtain",
        "tag": "CEREMONIAL CLOSING",
        "description": "Closing the grand cultural evening amidst audience cheers and festival spotlight cascades.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375371/sanskaran_2026/gallery/aritram/aritram_04.jpg"
      }
    ]
  },
  {
    "id": "chitrakatha-design",
    "number": "02",
    "name": "CHITRAKA DESIGNING & EDITING",
    "category": "DIGITAL DESIGN & VFX",
    "accentColor": "#38BDF8",
    "gradient": "from-[#38BDF8] to-[#0284C7]",
    "coverImage": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375387/sanskaran_2026/gallery/chitrakatha-design/chitrakatha-design_01.jpg",
    "motto": "We Turn Ideas into Visuals and Stories into Designs",
    "description": "The creative mind behind Team Sanskaran. Crafting bold festival visual identities, motion graphics, stage backdrops, and digital experiences.",
    "images": [
      {
        "id": "chi-01",
        "code": "# 01",
        "title": "Visual Identities Brought to Life",
        "tag": "GRAPHIC DESIGN",
        "description": "Striking typography, key visual assets, and festival identities designed from concept to print.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375387/sanskaran_2026/gallery/chitrakatha-design/chitrakatha-design_01.jpg"
      },
      {
        "id": "chi-02",
        "code": "# 02",
        "title": "Digital Canvas & Vectors",
        "tag": "BRANDING & ASSETS",
        "description": "Vector mastery creating festival badges, social collateral, and stage backdrop visuals.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375387/sanskaran_2026/gallery/chitrakatha-design/chitrakatha-design_02.jpg"
      },
      {
        "id": "chi-03",
        "code": "# 03",
        "title": "Color & Form Synthesis",
        "tag": "CREATIVE DIRECTION",
        "description": "Harmonious color palettes and modern editorial layouts defining festival branding.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375389/sanskaran_2026/gallery/chitrakatha-design/chitrakatha-design_03.jpg"
      },
      {
        "id": "chi-04",
        "code": "# 04",
        "title": "The Master Artwork",
        "tag": "POSTER SHOWCASE",
        "description": "Flagship festival posters and merchandise designs celebrated across campus.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375389/sanskaran_2026/gallery/chitrakatha-design/chitrakatha-design_04.jpg"
      }
    ]
  },
  {
    "id": "chitrakatha-photography",
    "number": "03",
    "name": "CHITRAKA PHOTOGRAPHY",
    "category": "PHOTOGRAPHY & MEDIA",
    "accentColor": "#F59E0B",
    "gradient": "from-[#F59E0B] to-[#B45309]",
    "coverImage": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375387/sanskaran_2026/gallery/chitrakatha-photography/chitrakatha-photography_01.jpg",
    "motto": "The Eyes Behind The Eyes of Team Sanskaran",
    "description": "We don\u2019t just capture moments, we frame memories. Documenting every smile, performance, and heartbeat across the festival in high-definition glory.",
    "images": [
      {
        "id": "chi-01",
        "code": "# 01",
        "title": "The Eyes Behind Sanskaran",
        "tag": "PHOTOJOURNALISM",
        "description": "Freezing fleeting smiles, raw emotion, and golden-hour memories behind the camera lens.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375387/sanskaran_2026/gallery/chitrakatha-photography/chitrakatha-photography_01.jpg"
      },
      {
        "id": "chi-02",
        "code": "# 02",
        "title": "Lens on the Limelight",
        "tag": "CONCERT PHOTOGRAPHY",
        "description": "Low-light precision framing capturing stage performers bathed in intense color gels.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375387/sanskaran_2026/gallery/chitrakatha-photography/chitrakatha-photography_02.jpg"
      },
      {
        "id": "chi-03",
        "code": "# 03",
        "title": "Framing the Euphoria",
        "tag": "CROWD PERSPECTIVE",
        "description": "Documenting the pulsating human energy that defines every festival evening.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375387/sanskaran_2026/gallery/chitrakatha-photography/chitrakatha-photography_03.jpg"
      },
      {
        "id": "chi-04",
        "code": "# 04",
        "title": "The Stillness in Motion",
        "tag": "DOCUMENTARY FRAMES",
        "description": "Timeless candid visual stories immortalized for the university's permanent archive.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375387/sanskaran_2026/gallery/chitrakatha-photography/chitrakatha-photography_04.jpg"
      }
    ]
  },
  {
    "id": "chitrakatha-art",
    "number": "04",
    "name": "CHITRAKA ART AND CRAFT",
    "category": "ART & CRAFT",
    "accentColor": "#B9ACF0",
    "gradient": "from-[#B9ACF0] to-[#6D28D9]",
    "coverImage": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375389/sanskaran_2026/gallery/chitrakatha-art/chitrakatha-art_01.jpg",
    "motto": "Where Imagination Takes Shape \u2014 Art is Emotion and Expression",
    "description": "Creating tangible magic across campus through live murals, terracotta pottery, intricate origami installations, and handmade festival decor.",
    "images": [
      {
        "id": "chi-01",
        "code": "# 01",
        "title": "Where Imagination Takes Shape",
        "tag": "FINE ART & INSTALLATION",
        "description": "Hand-crafted festival installations, sculptures, and tactile decor breathing life into campus.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375389/sanskaran_2026/gallery/chitrakatha-art/chitrakatha-art_01.jpg"
      },
      {
        "id": "chi-02",
        "code": "# 02",
        "title": "Pigment & Expression",
        "tag": "LIVE PAINTING",
        "description": "Vibrant acrylic and watercolor canvases capturing traditional and contemporary motifs.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375389/sanskaran_2026/gallery/chitrakatha-art/chitrakatha-art_02.jpg"
      },
      {
        "id": "chi-03",
        "code": "# 03",
        "title": "Intricate Craftsmanship",
        "tag": "HANDMADE ARTIFACTS",
        "description": "Delicate paper origami, terracotta pottery, and textured artisan creations.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375389/sanskaran_2026/gallery/chitrakatha-art/chitrakatha-art_03.jpg"
      },
      {
        "id": "chi-04",
        "code": "# 04",
        "title": "The Collective Canvas",
        "tag": "COMMUNITY MURAL",
        "description": "Large-scale interactive art board inviting festival participants to leave their artistic mark.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375390/sanskaran_2026/gallery/chitrakatha-art/chitrakatha-art_04.jpg"
      }
    ]
  },
  {
    "id": "chitrakatha",
    "number": "05",
    "name": "CHITRAKATHA",
    "category": "FILM CLUB",
    "accentColor": "#EC4899",
    "gradient": "from-[#EC4899] to-[#9D174D]",
    "coverImage": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375391/sanskaran_2026/gallery/chitrakatha/chitrakatha_01.jpg",
    "motto": "Every Frame Holds a Story, Every Story Deserves an Audience",
    "description": "The Official Film Club of TIU. Exploring cinematic direction, screenplay craft, camera movement, and festival aftermovie post-production.",
    "images": [
      {
        "id": "chi-01",
        "code": "# 01",
        "title": "Every Frame Holds a Story",
        "tag": "OFFICIAL FILM CLUB",
        "description": "Cinematic visual storytelling through short films, documentary shorts, and festival reels.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375391/sanskaran_2026/gallery/chitrakatha/chitrakatha_01.jpg"
      },
      {
        "id": "chi-02",
        "code": "# 02",
        "title": "Behind the Cinema Rig",
        "tag": "CINEMATOGRAPHY",
        "description": "Capturing motion picture aesthetics with cinematic framing and dynamic camera movement.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375391/sanskaran_2026/gallery/chitrakatha/chitrakatha_02.jpg"
      },
      {
        "id": "chi-03",
        "code": "# 03",
        "title": "Director's Vision",
        "tag": "ON-SET DIRECTING",
        "description": "Directing actors and camera crew to translate scripted emotions into moving images.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375391/sanskaran_2026/gallery/chitrakatha/chitrakatha_03.jpg"
      },
      {
        "id": "chi-04",
        "code": "# 04",
        "title": "The Silver Screen Screening",
        "tag": "FILM PREMIERE",
        "description": "Audience gathered in the dimmed screening hall watching original student film premieres.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375391/sanskaran_2026/gallery/chitrakatha/chitrakatha_04.jpg"
      }
    ]
  },
  {
    "id": "checkmate",
    "number": "06",
    "name": "CHECKMATE",
    "category": "OFFICIAL BAND",
    "accentColor": "#94A3B8",
    "gradient": "from-[#94A3B8] to-[#334155]",
    "coverImage": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375383/sanskaran_2026/gallery/checkmate/checkmate_01.jpg",
    "motto": "Born From a Shared Love for Music and Live Performance",
    "description": "The official band of Techno India University. Powering live concert stages with original rock compositions, collaborative musical sets, and electrifying guitar solos.",
    "images": [
      {
        "id": "che-01",
        "code": "# 01",
        "title": "The Sound of Checkmate",
        "tag": "OFFICIAL TIU BAND",
        "description": "High-octane rock ensemble rocking the open-air colosseum with stadium-filling riffs.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375383/sanskaran_2026/gallery/checkmate/checkmate_01.jpg"
      },
      {
        "id": "che-02",
        "code": "# 02",
        "title": "Lead Solo in Lights",
        "tag": "GUITAR HEROICS",
        "description": "Blistering lead guitar solo piercing the night under brilliant blue stage strobes.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375383/sanskaran_2026/gallery/checkmate/checkmate_02.jpg"
      },
      {
        "id": "che-03",
        "code": "# 03",
        "title": "Bassline & Drum Battery",
        "tag": "RHYTHM FOUNDATION",
        "description": "Driving bassline and drum fills laying down the heavy groove for original compositions.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375383/sanskaran_2026/gallery/checkmate/checkmate_03.jpg"
      },
      {
        "id": "che-04",
        "code": "# 04",
        "title": "Vocals at Peak Emotion",
        "tag": "FRONTMAN ENERGY",
        "description": "Emotional vocal delivery connecting directly with thousands of cheering festival fans.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375385/sanskaran_2026/gallery/checkmate/checkmate_04.jpg"
      },
      {
        "id": "che-05",
        "code": "# 05",
        "title": "Colosseum Encore",
        "tag": "BAND FINALE",
        "description": "The full band bowing together after an unforgettable live concert performance.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375385/sanskaran_2026/gallery/checkmate/checkmate_05.jpg"
      }
    ]
  },
  {
    "id": "dhrubotara",
    "number": "07",
    "name": "DHRUBOTARA",
    "category": "DRAMA CLUB",
    "accentColor": "#818CF8",
    "gradient": "from-[#818CF8] to-[#312E81]",
    "coverImage": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375373/sanskaran_2026/gallery/dhrubotara/dhrubotara_01.jpg",
    "motto": "A Guiding Star Breathing Soul into Storytelling",
    "description": "The official Drama Club of TIU. From the vibrant pulse of Bollywood recreations and joyful comedy dramas to poignant proscenium stage plays.",
    "images": [
      {
        "id": "dhr-01",
        "code": "# 01",
        "title": "Soul in Storytelling",
        "tag": "THEATRE PRODUCTION",
        "description": "Intense proscenium drama highlighting poignant social and emotional narratives.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375373/sanskaran_2026/gallery/dhrubotara/dhrubotara_01.jpg"
      },
      {
        "id": "dhr-02",
        "code": "# 02",
        "title": "Spotlight Soliloquy",
        "tag": "MONO ACT",
        "description": "A solo performer captivating the auditorium under warm chiaroscuro stage lighting.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375373/sanskaran_2026/gallery/dhrubotara/dhrubotara_02.jpg"
      },
      {
        "id": "dhr-03",
        "code": "# 03",
        "title": "Bollywood Recreations",
        "tag": "DRAMA ENSEMBLE",
        "description": "High-energy comedic timing and vibrant theatrical ensemble performance.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375373/sanskaran_2026/gallery/dhrubotara/dhrubotara_03.jpg"
      },
      {
        "id": "dhr-04",
        "code": "# 04",
        "title": "The Bow of Gratitude",
        "tag": "STANDING OVATION",
        "description": "The entire cast acknowledging thunderous applause from the auditorium crowd.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375373/sanskaran_2026/gallery/dhrubotara/dhrubotara_04.jpg"
      }
    ]
  },
  {
    "id": "nrityaksha",
    "number": "08",
    "name": "NRITYAKSHA",
    "category": "CLASSICAL DANCE",
    "accentColor": "#F43F5E",
    "gradient": "from-[#F43F5E] to-[#9F1239]",
    "coverImage": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375375/sanskaran_2026/gallery/nritaksha/nritaksha_01.jpg",
    "motto": "Mastering Diverse Classical & Semi-Classical Expressions",
    "description": "The official classical dance team of the university. Showcasing traditional Kathak, Bharatnatyam, and expressive folk choreographies with timeless elegance.",
    "images": [
      {
        "id": "nri-01",
        "code": "# 01",
        "title": "Classical Grace in Motion",
        "tag": "KATHAK & BHARATNATYAM",
        "description": "Masterful classical pirouette highlighting rhythmic footwork and ornate ghunghroos.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375375/sanskaran_2026/gallery/nritaksha/nritaksha_01.jpg"
      },
      {
        "id": "nri-02",
        "code": "# 02",
        "title": "Kinetic Heritage",
        "tag": "SEMI-CLASSICAL FUSION",
        "description": "Graceful hand mudras and synchronized formations narrating timeless mythological tales.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375375/sanskaran_2026/gallery/nritaksha/nritaksha_02.jpg"
      },
      {
        "id": "nri-03",
        "code": "# 03",
        "title": "Resonant Rhythms",
        "tag": "STAGE EXPRESSION",
        "description": "Vibrant classical costumes and evocative expressions captivating the proscenium hall.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375375/sanskaran_2026/gallery/nritaksha/nritaksha_03.jpg"
      },
      {
        "id": "nri-04",
        "code": "# 04",
        "title": "The Climax Mudra",
        "tag": "ENSEMBLE FINALE",
        "description": "Dramatic classical pose held in perfect stillness as final taals echo.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375375/sanskaran_2026/gallery/nritaksha/nritaksha_04.jpg"
      }
    ]
  },
  {
    "id": "paperback-society",
    "number": "09",
    "name": "THE PAPERBACK SOCIETY",
    "category": "LITERATURE & DEBATE",
    "accentColor": "#FBBF24",
    "gradient": "from-[#FBBF24] to-[#78350F]",
    "coverImage": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375371/sanskaran_2026/gallery/paperback-society/paperback-society_01.jpg",
    "motto": "Where Words Find Their Voice \u2014 Four Domains of Self-Expression",
    "description": "The official Literary Club of Techno India University. Fostering sharp debate dungeon clashes, spoken word slams, and creative writing publications.",
    "images": [
      {
        "id": "pap-01",
        "code": "# 01",
        "title": "Where Words Find Voice",
        "tag": "LITERARY CIRCLE",
        "description": "Engaged deliberation during the flagship parliamentary debate series.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375371/sanskaran_2026/gallery/paperback-society/paperback-society_01.jpg"
      },
      {
        "id": "pap-02",
        "code": "# 02",
        "title": "The Debate Dungeon",
        "tag": "INTELLECTUAL CLASH",
        "description": "Orators presenting thought-provoking arguments with sharp poise and rhetorical eloquence.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375371/sanskaran_2026/gallery/paperback-society/paperback-society_02.jpg"
      },
      {
        "id": "pap-03",
        "code": "# 03",
        "title": "Verses & Solitude",
        "tag": "POETRY SLAM",
        "description": "Spoken word artists captivating listeners in the intimate courtyard poetry circle.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375373/sanskaran_2026/gallery/paperback-society/paperback-society_03.jpg"
      },
      {
        "id": "pap-04",
        "code": "# 04",
        "title": "The Pen's Legacy",
        "tag": "CREATIVE WRITING",
        "description": "Student authors and journalists collaborating on the festival annual literary edition.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375373/sanskaran_2026/gallery/paperback-society/paperback-society_04.jpg"
      }
    ]
  },
  {
    "id": "phoenix",
    "number": "10",
    "name": "PHOENIX",
    "category": "FASHION",
    "accentColor": "#FF5722",
    "gradient": "from-[#FF5722] to-[#B91C1C]",
    "coverImage": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375385/sanskaran_2026/gallery/phoenix/phoenix_01.jpg",
    "motto": "Stepping Into The Spotlight \u2014 Complete Production Ecosystem",
    "description": "The university's official design and fashion team. Curating avant-garde runway walks, custom styling, choreography, and cutting-edge apparel aesthetics.",
    "images": [
      {
        "id": "pho-01",
        "code": "# 01",
        "title": "Haute Couture Spotlight",
        "tag": "FASHION & DESIGN",
        "description": "Avant-garde runway styling designed and hand-crafted by student couturiers.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375385/sanskaran_2026/gallery/phoenix/phoenix_01.jpg"
      },
      {
        "id": "pho-02",
        "code": "# 02",
        "title": "The Runway Walk",
        "tag": "RAMP WALKING",
        "description": "Models exhibiting confident strides in bespoke silhouettes and dramatic silhouettes.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375385/sanskaran_2026/gallery/phoenix/phoenix_02.jpg"
      },
      {
        "id": "pho-03",
        "code": "# 03",
        "title": "Textile & Concept Art",
        "tag": "THEMATIC COSTUMES",
        "description": "Intricate fabric craftsmanship and sustainable design concepts on full display.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375385/sanskaran_2026/gallery/phoenix/phoenix_03.jpg"
      },
      {
        "id": "pho-04",
        "code": "# 04",
        "title": "Curator's Showcase",
        "tag": "DESIGN ECOSYSTEM",
        "description": "The creative styling and modeling team standing proudly at the end of the runway.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375385/sanskaran_2026/gallery/phoenix/phoenix_04.jpg"
      }
    ]
  },
  {
    "id": "swarakriti",
    "number": "11",
    "name": "SWARAKRITI",
    "category": "MUSIC TEAM",
    "accentColor": "#EAB308",
    "gradient": "from-[#EAB308] to-[#CA8A04]",
    "coverImage": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375376/sanskaran_2026/gallery/swarakriti/swarakriti_01.jpg",
    "motto": "Your Ultimate Escape \u2014 College Jamming & Acoustic Harmony",
    "description": "The official music team of Techno India University. Providing judgment-free campus acoustic jam sessions, western vocal ensembles, and concert performances.",
    "images": [
      {
        "id": "swa-01",
        "code": "# 01",
        "title": "Acoustic Soul Sessions",
        "tag": "CAMPUS JAMMING",
        "description": "Judgment-free musical jamming and unplugged melodies bringing students together.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375376/sanskaran_2026/gallery/swarakriti/swarakriti_01.jpg"
      },
      {
        "id": "swa-02",
        "code": "# 02",
        "title": "Harmonic Resonance",
        "tag": "VOCAL ENSEMBLE",
        "description": "Lead vocalists harmonizing soaring melodies over intricate acoustic guitar progressions.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375376/sanskaran_2026/gallery/swarakriti/swarakriti_02.jpg"
      },
      {
        "id": "swa-03",
        "code": "# 03",
        "title": "The Rhythm Section",
        "tag": "PERCUSSION PULSE",
        "description": "Tight drum grooves and rhythmic caj\u00f3n beats driving the energy of the live session.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375378/sanskaran_2026/gallery/swarakriti/swarakriti_03.jpg"
      },
      {
        "id": "swa-04",
        "code": "# 04",
        "title": "Midnight Reverie",
        "tag": "CROWD SINGALONG",
        "description": "An arena of voices singing in unison to iconic campus anthems under festival skies.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375378/sanskaran_2026/gallery/swarakriti/swarakriti_04.jpg"
      }
    ]
  },
  {
    "id": "step-alpha",
    "number": "12",
    "name": "STEP ALPHA",
    "category": "WESTERN DANCE CREW",
    "accentColor": "#10B981",
    "gradient": "from-[#10B981] to-[#047857]",
    "coverImage": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375378/sanskaran_2026/gallery/step-alpha/step-alpha_01.png",
    "motto": "With 20+ Victories Under Our Name, We Step in to Conquer",
    "description": "The Western Dance Crew of TIU! Bringing together Hip-Hop, Contemporary, Breaking, and urban battle choreography with relentless energy.",
    "images": [
      {
        "id": "ste-01",
        "code": "# 01",
        "title": "Urban Cypher Dominance",
        "tag": "WESTERN DANCE CREW",
        "description": "Hard-hitting hip-hop choreography with laser-sharp synchronization and explosive isolations.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375378/sanskaran_2026/gallery/step-alpha/step-alpha_01.png"
      },
      {
        "id": "ste-02",
        "code": "# 02",
        "title": "Gravity-Defying Power Move",
        "tag": "BREAKING & B-BOYING",
        "description": "A dynamic floor freeze executed in the battle cypher to the roar of spectators.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375378/sanskaran_2026/gallery/step-alpha/step-alpha_02.png"
      },
      {
        "id": "ste-03",
        "code": "# 03",
        "title": "Sync in the Shadows",
        "tag": "STAGE FORMATION",
        "description": "A tight crew lineup moving in robotic lockstep through smoke and strobes.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375378/sanskaran_2026/gallery/step-alpha/step-alpha_03.png"
      },
      {
        "id": "ste-04",
        "code": "# 04",
        "title": "Victorious Crew Stride",
        "tag": "CHAMPIONSHIP TROUPE",
        "description": "Celebrating another hard-earned victory across 20+ competitive dance championships.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375379/sanskaran_2026/gallery/step-alpha/step-alpha_04.png"
      }
    ]
  },
  {
    "id": "desi-groover",
    "number": "13",
    "name": "DESI GROOVERS",
    "category": "ALL-GIRLS DANCE TEAM",
    "accentColor": "#F97316",
    "gradient": "from-[#F97316] to-[#C2410C]",
    "coverImage": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375381/sanskaran_2026/gallery/desi-groover/desi-groover_01.jpg",
    "motto": "Energetic Performances, Expressive Choreography, Dynamic Teamwork",
    "description": "An all-girls dance team renowned for high-tempo Bollywood beats, expressive folk movements, and crowd-electrifying stage presence.",
    "images": [
      {
        "id": "des-01",
        "code": "# 01",
        "title": "Girl Power on the Floor",
        "tag": "ALL-GIRLS CREW",
        "description": "Empowered, graceful, and fiercely synchronized all-girls dance team performance.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375381/sanskaran_2026/gallery/desi-groover/desi-groover_01.jpg"
      },
      {
        "id": "des-02",
        "code": "# 02",
        "title": "Vibrant Folk & Bollywood",
        "tag": "FUSION ROUTINE",
        "description": "Colorful traditional elements blended seamlessly with modern cinematic dance styles.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375382/sanskaran_2026/gallery/desi-groover/desi-groover_02.jpg"
      },
      {
        "id": "des-03",
        "code": "# 03",
        "title": "Radiant Expressions",
        "tag": "STAGE CHARM",
        "description": "Infectious smiles and synchronized moves commanding the full breadth of the stage.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375383/sanskaran_2026/gallery/desi-groover/desi-groover_03.jpg"
      },
      {
        "id": "des-04",
        "code": "# 04",
        "title": "Unstoppable Momentum",
        "tag": "CROWD CHEER",
        "description": "Standing ovation as the troupe completes their high-energy showcase.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375383/sanskaran_2026/gallery/desi-groover/desi-groover_04.jpg"
      }
    ]
  },
  {
    "id": "beat-buster",
    "number": "14",
    "name": "BEAT BUSTERS",
    "category": "BOLLYWOOD DANCE CREW",
    "accentColor": "#06B6D4",
    "gradient": "from-[#06B6D4] to-[#0E7490]",
    "coverImage": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375380/sanskaran_2026/gallery/beat-buster/beat-buster_01.jpg",
    "motto": "The Official Bollywood Dance Crew \u2014 Driven by Passion and Precision",
    "description": "Representing TIU in inter-college Bollywood dance competitions with theatrical storytelling, explosive energy, and signature synchronized steps.",
    "images": [
      {
        "id": "bea-01",
        "code": "# 01",
        "title": "Bollywood High Voltage",
        "tag": "BOLLYWOOD DANCE CREW",
        "description": "Electrifying commercial dance routine igniting the main festival stage.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375380/sanskaran_2026/gallery/beat-buster/beat-buster_01.jpg"
      },
      {
        "id": "bea-02",
        "code": "# 02",
        "title": "Desi Swag Formation",
        "tag": "SYNCHRONIZED STRIDE",
        "description": "Flawlessly synchronized group steps celebrating high-tempo cinematic beats.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375381/sanskaran_2026/gallery/beat-buster/beat-buster_02.jpg"
      },
      {
        "id": "bea-03",
        "code": "# 03",
        "title": "Thumka & Thunder",
        "tag": "EXPRESSIVE ENERGY",
        "description": "Dynamic facial expressions and contagious stage joy sweeping through the audience.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375380/sanskaran_2026/gallery/beat-buster/beat-buster_03.jpg"
      },
      {
        "id": "bea-04",
        "code": "# 04",
        "title": "The Finale Stance",
        "tag": "GRAND ARENA EXIT",
        "description": "The crew's signature power pose as gold pyrotechnic sparks shower the stage.",
        "src": "https://res.cloudinary.com/lsyjstbv/image/upload/v1795375380/sanskaran_2026/gallery/beat-buster/beat-buster_04.jpg"
      }
    ]
  }
];
