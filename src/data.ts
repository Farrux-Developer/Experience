export interface Bicycle {
  id: string;
  name: string;
  category: 'Gravel' | 'Road' | 'E-Bike' | 'Urban';
  price: number;
  weight: number;
  badge: string;
  badgeType: 'default' | 'gold';
  image: string;
  description: string;
  longDescription: string;
  specs: {
    frame: string;
    fork: string;
    groupset: string;
    wheels: string;
    tires: string;
    brakes: string;
  };
  radarSpecs: {
    speed: number;       // 0-100
    weightScore: number;  // 0-100
    comfort: number;      // 0-100
    offroad: number;      // 0-100
    tech: number;         // 0-100
  };
}

export const BICYCLES: Bicycle[] = [
  {
    id: "velo-aeon-x",
    name: "VELO E-Gravel 'Aeon X'",
    category: "E-Bike",
    price: 689000,
    weight: 12.4,
    badge: "Инновация",
    badgeType: "gold",
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1000&q=80",
    description: "Технологичный электро-гравийный болид на карбоновой раме с интегрированным приводом Fazua.",
    longDescription: "Спроектированный для бескомпромиссного преодоления любых дорог. Aeon X объединяет ультралегкое углеволокно аэрокосмического класса с мощным, но абсолютно бесшумным мотором Fazua Ride 60, идеально интегрированным в нижнюю трубу. Вы получаете естественные ощущения от педалирования с поддержкой до 60 Нм крутящего момента.",
    specs: {
      frame: "Aero Carbon Toray T1000 Monocoque",
      fork: "Aeon Custom Carbon, 12x100mm Thru-Axle",
      groupset: "SRAM Force AXS XPLR 1x12 wireless",
      wheels: "Reserve 40/44 Carbon Clincher",
      tires: "Maxxis Rambler 700x42c Tubeless",
      brakes: "SRAM Force Hydro Disc, 160mm Paceline rotors"
    },
    radarSpecs: {
      speed: 85,
      weightScore: 80,
      comfort: 90,
      offroad: 85,
      tech: 98
    }
  },
  {
    id: "velo-caelum-slr",
    name: "VELO Aero 'Caelum SLR'",
    category: "Road",
    price: 854000,
    weight: 6.8,
    badge: "Выбор профи",
    badgeType: "default",
    image: "https://images.unsplash.com/photo-1571068316341-2f334c57f509?auto=format&fit=crop&w=1000&q=80",
    description: "Чистокровная аэродинамика и бескомпромиссная жесткость для максимальных скоростей.",
    longDescription: "Caelum SLR создан для гонок мирового тура. Каждая форма трубы протестирована в аэродинамической трубе для снижения лобового сопротивления на 12%. Вес рамы составляет всего 710 грамм, сохраняя при этом феноменальную торсионную жесткость в кареточном узле. Безупречное беспроводное переключение Shimano Dura-Ace дополняет эту идеальную формулу.",
    specs: {
      frame: "Ultralight Nano-Carbon T1100, Flat Mount",
      fork: "Caelum Aero Carbon Full Integrale",
      groupset: "Shimano Dura-Ace Di2 R9200 2x12 speed",
      wheels: "Princeton CarbonWorks Peak 4550",
      tires: "Vittoria Corsa Pro 700x28c Tubeless Ready",
      brakes: "Shimano Dura-Ace Hydraulic Disc"
    },
    radarSpecs: {
      speed: 100,
      weightScore: 98,
      comfort: 65,
      offroad: 10,
      tech: 95
    }
  },
  {
    id: "velo-terra-oclv",
    name: "VELO Gravel 'Terra OCLV'",
    category: "Gravel",
    price: 495000,
    weight: 8.1,
    badge: "Хит продаж",
    badgeType: "gold",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1000&q=80",
    description: "Ваш идеальный спутник на гравии и лесных тропах с вибропоглощением IsoSpeed.",
    longDescription: "Легендарный гравийный байк, готовый к затяжным экспедициям и быстрым грунтовкам. Фирменное плетение углеволокна OCLV поглощает мелкие вибрации, снижая усталость плеч и спины на длинных дистанциях. Множественные скрытые крепления позволяют легко разместить байкпакинг для автономных путешествий.",
    specs: {
      frame: "OCLV Carbon 800 Series, IsoSpeed Decoupler",
      fork: "Terra Carbon Disc, Flat Mount, Fender Mounts",
      groupset: "Shimano GRX RX825 Di2 2x12 speed",
      wheels: "Bontrager Aeolus Pro 3V Carbon",
      tires: "Schwalbe G-One Bite Evo 700x40c",
      brakes: "Shimano GRX Hydraulic Disc"
    },
    radarSpecs: {
      speed: 78,
      weightScore: 88,
      comfort: 95,
      offroad: 90,
      tech: 85
    }
  },
  {
    id: "velo-vibe-commuter",
    name: "VELO Urban 'Vibe Belt'",
    category: "Urban",
    price: 235000,
    weight: 10.2,
    badge: "Минимализм",
    badgeType: "default",
    image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1000&q=80",
    description: "Стильный городской велосипед с тихим карбоновым ремнем Gates вместо цепи.",
    longDescription: "Забудьте о смазке цепи и испачканных брюках. Vibe Belt оснащен инновационным ременным приводом Gates Carbon Drive, который служит в 4 раза дольше обычной цепи и абсолютно бесшумен. Планетарная втулка Shimano Alfine на 11 скоростей обеспечивает плавное переключение даже стоя на месте на светофоре.",
    specs: {
      frame: "Triple-Butted Hydromformed Alloy 6011",
      fork: "Vibe Carbon Rigid, Integrated Light Mount",
      groupset: "Gates Carbon Drive CDX with Shimano Alfine 11S",
      wheels: "DT Swiss Urban Classic custom",
      tires: "Continental Contact Urban 700x35c",
      brakes: "Shimano Alfine Hydraulic Disc"
    },
    radarSpecs: {
      speed: 70,
      weightScore: 75,
      comfort: 88,
      offroad: 30,
      tech: 80
    }
  },
  {
    id: "velo-vortex-sl",
    name: "VELO Superlight 'Vortex SL'",
    category: "Road",
    price: 920000,
    weight: 6.2,
    badge: "Лимитировано",
    badgeType: "gold",
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1000&q=80",
    description: "Ультралегкое инженерное чудо для горных перевалов и крутых градиентов.",
    longDescription: "Собранный вручную лимитированным тиражом. Наш самый легкий серийный велосипед. Рама весом всего 640 грамм окрашена тончайшим слоем лака, экономящим до 40 грамм веса. Компоненты топ-уровня Darimo и Carbonice делают этот байк настоящим арт-объектом в мире велоспорта.",
    specs: {
      frame: "Vortex Ultra-Modulus Carbon SL, 640g",
      fork: "Vortex SL Nano-Carbon fork, 270g",
      groupset: "SRAM Red AXS 2x12 with Power Meter",
      wheels: "Lightweight Meilenstein Obermayer Carbon",
      tires: "Schwalbe Pro One TLE 700x26c",
      brakes: "SRAM Red AXS Hydraulic Disc"
    },
    radarSpecs: {
      speed: 98,
      weightScore: 100,
      comfort: 60,
      offroad: 5,
      tech: 92
    }
  },
  {
    id: "velo-terra-explore",
    name: "VELO Adventure 'Explore+'",
    category: "Gravel",
    price: 380000,
    weight: 8.9,
    badge: "Новинка",
    badgeType: "default",
    image: "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=1000&q=80",
    description: "Экспедиционный внедорожник с широким просветом для покрышек до 50мм.",
    longDescription: "Explore+ создан для тех, кто не видит границ на карте. Рама из карбона высокой прочности спроектирована выдерживать серьезные нагрузки, а геометрия настроена на максимальную стабильность на сыпучих спусках. Широкий грязевой зазор позволяет ставить полноценную внедорожную резину.",
    specs: {
      frame: "Adventure Carbon Grade-R, Flat Mount",
      fork: "Explore Carbon Multimount Fork, 12x100mm",
      groupset: "SRAM Apex Eagle Mullet 1x12 (10-52T)",
      wheels: "DT Swiss GR 1600 Spline Disc",
      tires: "Maxxis Rambler Exo TLR 700x45c",
      brakes: "SRAM Apex Hydraulic Disc"
    },
    radarSpecs: {
      speed: 72,
      weightScore: 82,
      comfort: 98,
      offroad: 95,
      tech: 78
    }
  }
];
