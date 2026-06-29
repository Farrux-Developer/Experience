import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  X, 
  ChevronRight, 
  Check, 
  SlidersHorizontal,
  Info,
  Scale,
  Zap,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { BICYCLES, Bicycle } from './data';

interface CartItem {
  product: Bicycle;
  quantity: number;
}

export default function App() {
  // Состояния фильтрации, поиска и сортировки
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('default');

  // Состояния корзины
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState<boolean>(false);

  // Состояние детального просмотра товара (drawer справа)
  const [activeProduct, setActiveProduct] = useState<Bicycle | null>(null);

  // Список доступных категорий
  const categories = useMemo(() => {
    return ['Все', 'Gravel', 'Road', 'E-Bike', 'Urban'];
  }, []);

  // Фильтрация и сортировка велосипедов
  const filteredBicycles = useMemo(() => {
    let result = [...BICYCLES];

    // Фильтр по категории
    if (selectedCategory !== 'Все') {
      result = result.filter(bike => bike.category === selectedCategory);
    }

    // Фильтр по поисковому запросу
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(bike => 
        bike.name.toLowerCase().includes(query) || 
        bike.description.toLowerCase().includes(query) ||
        bike.specs.frame.toLowerCase().includes(query) ||
        bike.specs.groupset.toLowerCase().includes(query)
      );
    }

    // Сортировка
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'weight-asc') {
      result.sort((a, b) => a.weight - b.weight);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  // Добавление в корзину
  const addToCart = (product: Bicycle, e: React.MouseEvent) => {
    // Останавливаем всплытие клика, чтобы не открывать детальный просмотр
    e.stopPropagation();
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  // Изменение количества в корзине
  const updateQuantity = (productId: string, delta: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  // Удаление из корзины
  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  // Общая стоимость корзины
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);

  // Общее число товаров в корзине
  const cartItemCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  // Форматирование цены
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Сброс фильтров
  const resetFilters = () => {
    setSelectedCategory('Все');
    setSearchQuery('');
    setSortBy('default');
  };

  // Симуляция успешного заказа
  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutSuccess(true);
    setCart([]);
  };

  return (
    <div className="app-container" id="velo-atelier-root">
      
      {/* --- ШАПКА САЙТА (HEADER BAR) --- */}
      <header className="header-bar" id="app-header">
        <div className="logo-text">
          Velo<span className="logo-tag">Atelier</span>
        </div>
        
        {/* Индикатор корзины */}
        <button 
          className="cart-indicator" 
          onClick={() => setIsCartOpen(true)}
          id="cart-trigger-btn"
          aria-label="Открыть корзину"
        >
          <ShoppingBag size={18} />
          <span className="hidden sm:inline">Корзина</span>
          {cartItemCount > 0 && (
            <span className="cart-count-badge" id="cart-counter">
              {cartItemCount}
            </span>
          )}
        </button>
      </header>

      {/* --- ГЕРОЙ-РАЗДЕЛ С ПРОСТОРНЫМИ ОТСТУПАМИ ("AIR") --- */}
      <section className="hero-section" id="brand-hero">
        <h1 className="display-title">
          Премиальные велосипеды <br />
          <span className="text-[#c2a167]">ручной сборки</span>
        </h1>
        <p className="hero-tagline">
          Коллекция высокотехнологичных гравийных, шоссейных и электрических болидов, созданная для эстетов и профессионалов велоспорта.
        </p>
      </section>

      {/* --- БЛОК ФИЛЬТРАЦИИ И ПОИСКА --- */}
      <div className="filter-container" id="catalog-controls">
        <div className="filter-row">
          
          {/* Категории (Flexbox с переполнением на мобильных) */}
          <ul className="categories-list" id="category-tabs-list">
            {categories.map((category) => (
              <li key={category}>
                <button
                  className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                  id={`cat-tab-${category.toLowerCase()}`}
                >
                  {category === 'Все' ? 'Все модели' : category}
                </button>
              </li>
            ))}
          </ul>

          {/* Поиск и сортировка */}
          <div className="flex items-center gap-4 flex-wrap w-full md:w-auto" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            
            {/* Инпут поиска */}
            <div className="search-input-wrapper">
              <Search size={14} className="search-icon-inside" />
              <input
                type="text"
                placeholder="Поиск по названию..."
                className="search-field"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="search-input"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: '0.6rem', background: 'none', border: 'none', cursor: 'pointer', color: '#8f8f89', display: 'flex', alignItems: 'center' }}
                  title="Очистить поиск"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Выпадающий список сортировки */}
            <select
              className="sorting-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              id="sorting-select"
              aria-label="Сортировка товаров"
            >
              <option value="default">Сортировка по умолчанию</option>
              <option value="price-asc">Сначала дешевле</option>
              <option value="price-desc">Сначала дороже</option>
              <option value="weight-asc">По весу (сначала легкие)</option>
            </select>
          </div>

        </div>
      </div>

      {/* --- СЕКЦИЯ КАТАЛОГА (СЕМАНТИЧЕСКИЙ SECTION) --- */}
      <section className="catalog-section" id="main-catalog">
        
        {filteredBicycles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }} id="no-results">
            <SlidersHorizontal size={36} style={{ color: '#8f8f89' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: '600' }}>Нет подходящих моделей</h3>
            <p style={{ color: '#8f8f89', fontSize: '0.9rem', maxWidth: '24rem', margin: '0 auto' }}>
              К сожалению, по вашему запросу ничего не найдено. Попробуйте сбросить фильтры поиска.
            </p>
            <button className="btn-primary" onClick={resetFilters} style={{ marginTop: '1rem' }}>
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <ul className="catalog-grid" id="products-list-ul">
            {filteredBicycles.map((bike) => (
              <li className="catalog-item" key={bike.id} id={`item-li-${bike.id}`}>
                
                {/* КАРТОЧКА ТОВАРА (<article>) */}
                <article 
                  className="product-card" 
                  onClick={() => setActiveProduct(bike)}
                  id={`card-${bike.id}`}
                >
                  
                  {/* Абсолютно позиционированный Badge */}
                  <span className={`product-badge ${bike.badgeType === 'gold' ? 'gold' : ''}`}>
                    {bike.badge}
                  </span>

                  {/* Секция изображения */}
                  <div className="product-image-wrapper">
                    <img 
                      src={bike.image} 
                      alt={bike.name} 
                      className="product-image"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>

                  {/* Тело карточки (Внутренний Flexbox) */}
                  <div className="product-card-body">
                    
                    <div className="product-info-top">
                      <div className="product-meta">
                        <span>{bike.category}</span>
                        <span>{bike.weight} кг</span>
                      </div>
                      
                      {/* Название велосипеда */}
                      <h3 className="card-title text-gray-900" style={{ color: 'var(--color-text-dark)' }}>
                        {bike.name}
                      </h3>
                      
                      {/* Короткое описание */}
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-gray)', lineHeight: '1.4', margin: '0.25rem 0 0.5rem 0' }}>
                        {bike.description}
                      </p>

                      {/* Технические теги */}
                      <div className="product-specs">
                        <span className="spec-chip">{bike.specs.frame.split(' ')[0]} Carbon</span>
                        <span className="spec-chip">{bike.specs.groupset.split(' ')[0]}</span>
                        <span className="spec-chip">28″ Wheels</span>
                      </div>
                    </div>

                    {/* Раздел с ценой и кнопкой */}
                    <div className="product-action-row">
                      <div className="price-container">
                        <span className="price-label">Цена в ателье</span>
                        <span className="price-value card-price">
                          {formatPrice(bike.price)}
                        </span>
                      </div>

                      {/* Кнопка "Купить" с плавным ховером */}
                      <button 
                        className="buy-button"
                        onClick={(e) => addToCart(bike, e)}
                        id={`buy-btn-${bike.id}`}
                        aria-label={`Купить ${bike.name}`}
                      >
                        <ShoppingBag size={15} />
                        <span>Купить</span>
                      </button>
                    </div>

                  </div>

                </article>

              </li>
            ))}
          </ul>
        )}

      </section>

      {/* --- ИНТЕРАКТИВНЫЙ DRAWER ДЕТАЛЕЙ ТОВАРА (СПРАВА) --- */}
      {activeProduct && (
        <div className="modal-backdrop" onClick={() => setActiveProduct(null)} id="drawer-backdrop">
          <div className="drawer-panel" onClick={(e) => e.stopPropagation()} id="product-detail-drawer">
            
            {/* Кнопка закрытия */}
            <button 
              className="close-drawer-btn" 
              onClick={() => setActiveProduct(null)}
              id="close-drawer-x"
              aria-label="Закрыть детали"
            >
              <X size={18} />
            </button>

            {/* Изображение во весь верх */}
            <div className="drawer-image-section">
              <img 
                src={activeProduct.image} 
                alt={activeProduct.name} 
                className="drawer-image"
                referrerPolicy="no-referrer"
              />
              <span className={`product-badge ${activeProduct.badgeType === 'gold' ? 'gold' : ''}`} style={{ top: '1.5rem', left: '1.5rem' }}>
                {activeProduct.badge}
              </span>
            </div>

            {/* Контентная зона */}
            <div className="drawer-content">
              <div>
                <span className="font-mono-tech" style={{ color: 'var(--color-accent-gold)', textTransform: 'uppercase', fontWeight: 600 }}>
                  {activeProduct.category} • {activeProduct.weight} кг
                </span>
                <h2 className="section-title" style={{ marginTop: '0.5rem', marginBottom: '1rem', color: 'var(--color-text-dark)' }}>
                  {activeProduct.name}
                </h2>
                <p style={{ color: 'var(--color-text-gray)', fontSize: '0.9rem', lineHeight: '1.6', fontWeight: 300 }}>
                  {activeProduct.longDescription}
                </p>
              </div>

              {/* Характеристики (Таблица) */}
              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  Спецификация
                </h4>
                <table className="drawer-specs-table">
                  <tbody>
                    <tr>
                      <td className="spec-label">Рама</td>
                      <td className="spec-val">{activeProduct.specs.frame}</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Вилка</td>
                      <td className="spec-val">{activeProduct.specs.fork}</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Трансмиссия</td>
                      <td className="spec-val">{activeProduct.specs.groupset}</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Колеса</td>
                      <td className="spec-val">{activeProduct.specs.wheels}</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Покрышки</td>
                      <td className="spec-val">{activeProduct.specs.tires}</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Тормоза</td>
                      <td className="spec-val">{activeProduct.specs.brakes}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Геометрический Интерактивный Радар-Бар */}
              <div className="geometry-radar-box">
                <h4 className="radar-title">Индекс ходовых качеств</h4>
                <div className="radar-bars-list">
                  <div className="radar-bar-row">
                    <div className="radar-bar-meta">
                      <span>Скорость / Аэродинамика</span>
                      <span>{activeProduct.radarSpecs.speed}%</span>
                    </div>
                    <div className="radar-bar-track">
                      <div className="radar-bar-fill" style={{ width: `${activeProduct.radarSpecs.speed}%` }}></div>
                    </div>
                  </div>

                  <div className="radar-bar-row">
                    <div className="radar-bar-meta">
                      <span>Легкость конструкции</span>
                      <span>{activeProduct.radarSpecs.weightScore}%</span>
                    </div>
                    <div className="radar-bar-track">
                      <div className="radar-bar-fill" style={{ width: `${activeProduct.radarSpecs.weightScore}%` }}></div>
                    </div>
                  </div>

                  <div className="radar-bar-row">
                    <div className="radar-bar-meta">
                      <span>Комфорт / Амортизация</span>
                      <span>{activeProduct.radarSpecs.comfort}%</span>
                    </div>
                    <div className="radar-bar-track">
                      <div className="radar-bar-fill" style={{ width: `${activeProduct.radarSpecs.comfort}%` }}></div>
                    </div>
                  </div>

                  <div className="radar-bar-row">
                    <div className="radar-bar-meta">
                      <span>Проходимость (Грунт)</span>
                      <span>{activeProduct.radarSpecs.offroad}%</span>
                    </div>
                    <div className="radar-bar-track">
                      <div className="radar-bar-fill" style={{ width: `${activeProduct.radarSpecs.offroad}%` }}></div>
                    </div>
                  </div>

                  <div className="radar-bar-row">
                    <div className="radar-bar-meta">
                      <span>Технологичность (Электро/Belt)</span>
                      <span>{activeProduct.radarSpecs.tech}%</span>
                    </div>
                    <div className="radar-bar-track">
                      <div className="radar-bar-fill" style={{ width: `${activeProduct.radarSpecs.tech}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Нижняя кнопка покупки в Drawer */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', fontFamily: 'var(--font-mono)' }}>Цена к заказу:</span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 700 }}>{formatPrice(activeProduct.price)}</span>
                </div>
                <button 
                  className="buy-button" 
                  onClick={(e) => {
                    addToCart(activeProduct, e);
                    setActiveProduct(null);
                    setIsCartOpen(true);
                  }}
                  id="drawer-buy-btn"
                  style={{ padding: '1rem' }}
                >
                  <ShoppingBag size={18} />
                  <span>Добавить в корзину & оформить</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* --- DRAWER КОРЗИНЫ (СПРАВА) --- */}
      {isCartOpen && (
        <div className="modal-backdrop" onClick={() => setIsCartOpen(false)} id="cart-backdrop">
          <div className="drawer-panel" onClick={(e) => e.stopPropagation()} id="shopping-cart-drawer">
            
            {/* Кнопка закрытия корзины */}
            <button 
              className="close-drawer-btn" 
              onClick={() => setIsCartOpen(false)}
              id="close-cart-x"
              aria-label="Закрыть корзину"
            >
              <X size={18} />
            </button>

            <div className="drawer-content" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '2.5rem 2rem 2rem' }}>
              
              <h2 className="section-title" style={{ marginBottom: '1.5rem', color: 'var(--color-text-dark)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span>Ваш заказ</span>
                <span style={{ fontSize: '1rem', color: 'var(--color-accent-gold)', fontFamily: 'var(--font-mono)' }}>({cartItemCount})</span>
              </h2>

              {cart.length === 0 ? (
                <div className="empty-cart-view" id="empty-cart-indicator">
                  <ShoppingBag size={48} strokeWidth={1} style={{ color: '#eaeae5', marginBottom: '0.5rem' }} />
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, color: 'var(--color-text-dark)' }}>Корзина пуста</p>
                  <p style={{ fontSize: '0.8rem', textAlign: 'center', maxWidth: '16rem', margin: '0' }}>
                    Выберите эксклюзивную модель велосипеда из нашего каталога для продолжения.
                  </p>
                  <button className="btn-primary" onClick={() => setIsCartOpen(false)} style={{ marginTop: '1rem' }}>
                    Вернуться к каталогу
                  </button>
                </div>
              ) : (
                <>
                  {/* Список товаров в корзине */}
                  <div style={{ flexGrow: 1, overflowY: 'auto', paddingRight: '0.25rem' }}>
                    <ul className="cart-items-list" id="cart-list-items">
                      {cart.map((item) => (
                        <li key={item.product.id} className="cart-item-row" id={`cart-row-${item.product.id}`}>
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="cart-item-img"
                            referrerPolicy="no-referrer"
                          />
                          <div className="cart-item-info">
                            <h4 className="cart-item-name">{item.product.name}</h4>
                            <span className="cart-item-price">{formatPrice(item.product.price)}</span>
                            
                            {/* Регулятор количества */}
                            <div className="cart-item-qty-row" style={{ marginTop: '0.25rem' }}>
                              <button 
                                className="qty-btn" 
                                onClick={() => updateQuantity(item.product.id, -1)}
                                id={`qty-minus-${item.product.id}`}
                              >
                                -
                              </button>
                              <span className="qty-text">{item.quantity}</span>
                              <button 
                                className="qty-btn" 
                                onClick={() => updateQuantity(item.product.id, 1)}
                                id={`qty-plus-${item.product.id}`}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Кнопка удаления */}
                          <button 
                            className="qty-delete-btn" 
                            onClick={() => removeFromCart(item.product.id)}
                            id={`qty-del-${item.product.id}`}
                            title="Удалить из корзины"
                          >
                            <X size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Итоговый подвал корзины */}
                  <div className="cart-footer">
                    <div className="cart-total-row">
                      <span className="cart-total-label">Итого к оплате:</span>
                      <span className="cart-total-val">{formatPrice(cartTotal)}</span>
                    </div>
                    
                    <button 
                      className="buy-button" 
                      onClick={handleCheckout}
                      id="submit-checkout-btn"
                      style={{ padding: '1rem', borderRadius: '4px' }}
                    >
                      <span>Оформить премиальный заказ</span>
                      <ChevronRight size={16} />
                    </button>
                    
                    <p style={{ fontSize: '0.7rem', color: 'var(--color-text-light)', textAlign: 'center', margin: '0' }}>
                      Доставка осуществляется специализированной транспортной службой VeloAtelier в индивидуальном деревянном боксе.
                    </p>
                  </div>
                </>
              )}

            </div>

          </div>
        </div>
      )}

      {/* --- МОДАЛЬНОЕ ОКНО УСПЕШНОГО ОФОРМЛЕНИЯ ЗАКАЗА --- */}
      {isCheckoutSuccess && (
        <div className="dialogue-backdrop" onClick={() => setIsCheckoutSuccess(false)} id="checkout-backdrop">
          <div className="success-box" onClick={(e) => e.stopPropagation()} id="checkout-success-box">
            <div className="success-icon-wrapper">
              <Check size={28} strokeWidth={3} />
            </div>
            
            <h3 className="section-title" style={{ fontSize: '1.4rem', color: 'var(--color-text-dark)', margin: 0 }}>
              Ваш заказ принят
            </h3>
            
            <p style={{ color: 'var(--color-text-gray)', fontSize: '0.88rem', lineHeight: '1.5', margin: 0 }}>
              Благодарим за выбор ателье <strong>VeloAtelier</strong>. Наш персональный менеджер свяжется с вами в течение 10 минут для подтверждения конфигурации и деталей бережной транспортировки.
            </p>
            
            <div style={{ width: '100%', borderTop: '1px solid var(--color-border-subtle)', margin: '0.5rem 0', paddingTop: '1rem' }}>
              <span className="font-mono-tech" style={{ color: 'var(--color-text-light)', textTransform: 'uppercase' }}>
                Статус заказа: в обработке
              </span>
            </div>

            <button 
              className="btn-primary" 
              onClick={() => setIsCheckoutSuccess(false)}
              id="success-close-btn"
              style={{ width: '100%' }}
            >
              Вернуться в ателье
            </button>
          </div>
        </div>
      )}

      {/* --- БЕЗУПРЕЧНЫЙ ФУТЕР --- */}
      <footer className="footer-atelier" id="app-footer">
        <div>
          <div className="logo-text" style={{ fontSize: '1.1rem' }}>
            Velo<span className="logo-tag">Atelier</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', margin: '0.5rem 0 0 0' }}>
            Ателье эксклюзивных велосипедов. © {new Date().getFullYear()} Все права защищены.
          </p>
        </div>
        
        <div className="footer-credits">
          Разработано вручную с безупречным чувством визуального ритма
        </div>
      </footer>

    </div>
  );
}
