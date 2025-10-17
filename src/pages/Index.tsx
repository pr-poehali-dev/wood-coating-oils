import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Oil {
  id: number;
  name: string;
  description: string;
  woodTypes: string[];
  purpose: string[];
  color: string;
  price: string;
  priceNum: number;
  image: string;
  volume: string;
  composition: string;
  application: string;
  dryTime: string;
  coverage: string;
}

interface CartItem {
  oil: Oil;
  quantity: number;
}

const oils: Oil[] = [
  {
    id: 1,
    name: 'Классическое масло для дуба',
    description: 'Глубоко проникающее масло, подчёркивающее текстуру дуба',
    woodTypes: ['Дуб', 'Ясень'],
    purpose: ['Мебель', 'Полы'],
    color: 'Натуральный',
    price: '1 250 ₽',
    priceNum: 1250,
    image: '/placeholder.svg',
    volume: '500 мл',
    composition: 'Льняное масло 70%, воск карнаубский 20%, сиккативы 10%',
    application: 'Наносить тонким слоем вдоль волокон кистью или тканью. После впитывания (15-20 мин) удалить излишки.',
    dryTime: '24 часа',
    coverage: '10-12 м² на литр'
  },
  {
    id: 2,
    name: 'Защитное масло для сосны',
    description: 'Защита от влаги и ультрафиолета для хвойных пород',
    woodTypes: ['Сосна', 'Ель', 'Лиственница'],
    purpose: ['Фасады', 'Террасы'],
    color: 'Бесцветный',
    price: '980 ₽',
    priceNum: 980,
    image: '/placeholder.svg',
    volume: '1 литр',
    composition: 'Льняное масло 60%, тунговое масло 30%, UV-фильтры 10%',
    application: 'Наносить 2-3 слоя с интервалом 24 часа. Рекомендуется обновлять покрытие раз в год.',
    dryTime: '24-48 часов',
    coverage: '8-10 м² на литр'
  },
  {
    id: 3,
    name: 'Масло-воск для ореха',
    description: 'Придаёт шелковистый блеск и водоотталкивающие свойства',
    woodTypes: ['Орех', 'Вишня'],
    purpose: ['Мебель', 'Декор'],
    color: 'Янтарный',
    price: '1 450 ₽',
    priceNum: 1450,
    image: '/placeholder.svg',
    volume: '500 мл',
    composition: 'Масло грецкого ореха 50%, пчелиный воск 30%, карнаубский воск 20%',
    application: 'Нанести равномерно, дать впитаться 30 минут, отполировать мягкой тканью до блеска.',
    dryTime: '12-24 часа',
    coverage: '12-15 м² на литр'
  },
  {
    id: 4,
    name: 'Тонирующее масло "Венге"',
    description: 'Придаёт благородный тёмный оттенок светлым породам',
    woodTypes: ['Берёза', 'Бук', 'Клён'],
    purpose: ['Мебель', 'Полы'],
    color: 'Тёмно-коричневый',
    price: '1 350 ₽',
    priceNum: 1350,
    image: '/placeholder.svg',
    volume: '750 мл',
    composition: 'Льняное масло 75%, натуральные пигменты 15%, воск 10%',
    application: 'Тщательно перемешать. Наносить вдоль волокон равномерным слоем. Интенсивность оттенка зависит от количества слоёв.',
    dryTime: '24 часа между слоями',
    coverage: '10 м² на литр'
  },
  {
    id: 5,
    name: 'Масло для столешниц',
    description: 'Повышенная стойкость к влаге и механическим воздействиям',
    woodTypes: ['Дуб', 'Ясень', 'Бук'],
    purpose: ['Столешницы', 'Барные стойки'],
    color: 'Матовый',
    price: '1 550 ₽',
    priceNum: 1550,
    image: '/placeholder.svg',
    volume: '500 мл',
    composition: 'Тунговое масло 80%, твердый воск 15%, модификаторы 5%',
    application: 'Наносить 3-4 тонких слоя с промежуточной шлифовкой. Полное отверждение через 7 дней.',
    dryTime: '24 часа (полное — 7 дней)',
    coverage: '8-10 м² на литр'
  },
  {
    id: 6,
    name: 'Льняное масло',
    description: 'Экологичное масло для детской мебели и игрушек',
    woodTypes: ['Все породы'],
    purpose: ['Детская мебель', 'Игрушки'],
    color: 'Натуральный',
    price: '890 ₽',
    priceNum: 890,
    image: '/placeholder.svg',
    volume: '500 мл',
    composition: '100% льняное масло холодного отжима',
    application: 'Наносить тонким слоем. Безопасно для детей после полного высыхания.',
    dryTime: '48 часов',
    coverage: '12-15 м² на литр'
  }
];

const woodTypes = ['Все', 'Дуб', 'Сосна', 'Орех', 'Берёза', 'Ясень', 'Бук'];
const purposes = ['Все', 'Мебель', 'Полы', 'Фасады', 'Террасы', 'Столешницы', 'Декор'];

export default function Index() {
  const [selectedWood, setSelectedWood] = useState('Все');
  const [selectedPurpose, setSelectedPurpose] = useState('Все');
  const [selectedOil, setSelectedOil] = useState<Oil | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const filteredOils = oils.filter(oil => {
    const woodMatch = selectedWood === 'Все' || oil.woodTypes.includes(selectedWood) || oil.woodTypes.includes('Все породы');
    const purposeMatch = selectedPurpose === 'Все' || oil.purpose.includes(selectedPurpose);
    return woodMatch && purposeMatch;
  });

  const addToCart = (oil: Oil) => {
    setCart(prev => {
      const existing = prev.find(item => item.oil.id === oil.id);
      if (existing) {
        return prev.map(item => 
          item.oil.id === oil.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { oil, quantity: 1 }];
    });
  };

  const updateQuantity = (oilId: number, change: number) => {
    setCart(prev => prev.map(item => 
      item.oil.id === oilId 
        ? { ...item, quantity: Math.max(1, item.quantity + change) } 
        : item
    ));
  };

  const removeFromCart = (oilId: number) => {
    setCart(prev => prev.filter(item => item.oil.id !== oilId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.oil.priceNum * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Droplets" className="text-primary" size={32} />
            <h1 className="text-2xl font-bold">WoodOil</h1>
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            <a href="#catalog" className="hover:text-primary transition-colors">Продукция</a>
            <a href="#application" className="hover:text-primary transition-colors">Применение</a>
            <a href="#gallery" className="hover:text-primary transition-colors">Галерея</a>
            <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 relative">
                  <Icon name="ShoppingCart" size={18} />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Icon name="ShoppingCart" size={48} className="mx-auto mb-4" />
                      <p>Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      {cart.map(item => (
                        <Card key={item.oil.id} className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{item.oil.name}</h4>
                              <p className="text-xs text-muted-foreground">{item.oil.volume}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.oil.id)}
                            >
                              <Icon name="X" size={16} />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.oil.id, -1)}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.oil.id, 1)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                            </div>
                            <span className="font-bold">{item.oil.priceNum * item.quantity} ₽</span>
                          </div>
                        </Card>
                      ))}
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between text-lg font-bold mb-4">
                          <span>Итого:</span>
                          <span>{cartTotal} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          <Icon name="CreditCard" size={20} className="mr-2" />
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </header>

      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              Натуральные масла<br />для дерева
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Подчеркните красоту древесины и защитите её от времени. 
              Экологичные составы ручного производства для профессионалов и любителей.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button size="lg" className="gap-2">
                <Icon name="ShoppingCart" size={20} />
                Выбрать масло
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Icon name="BookOpen" size={20} />
                Руководство
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Каталог масел</h3>
            <p className="text-muted-foreground text-lg">
              Найдите идеальное масло для вашего проекта
            </p>
          </div>

          <div className="mb-8 space-y-6">
            <div>
              <label className="text-sm font-medium mb-3 block">Тип дерева:</label>
              <div className="flex flex-wrap gap-2">
                {woodTypes.map(wood => (
                  <Button
                    key={wood}
                    variant={selectedWood === wood ? 'default' : 'outline'}
                    onClick={() => setSelectedWood(wood)}
                    className="rounded-full"
                  >
                    {wood}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-3 block">Назначение:</label>
              <div className="flex flex-wrap gap-2">
                {purposes.map(purpose => (
                  <Button
                    key={purpose}
                    variant={selectedPurpose === purpose ? 'default' : 'outline'}
                    onClick={() => setSelectedPurpose(purpose)}
                    className="rounded-full"
                  >
                    {purpose}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOils.map((oil, index) => (
              <Card key={oil.id} className="overflow-hidden hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <Icon name="Droplet" size={48} className="text-primary/30" />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold mb-2">{oil.name}</h4>
                  <p className="text-muted-foreground text-sm mb-4">{oil.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <span className="text-xs text-muted-foreground">Породы:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {oil.woodTypes.map(type => (
                          <Badge key={type} variant="secondary" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-xs text-muted-foreground">Применение:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {oil.purpose.map(p => (
                          <Badge key={p} variant="outline" className="text-xs">
                            {p}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{oil.price}</span>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setSelectedOil(oil)}
                        className="gap-2"
                      >
                        <Icon name="Info" size={16} />
                        Подробнее
                      </Button>
                    </div>
                    <Button 
                      size="sm" 
                      className="gap-2 w-full" 
                      onClick={() => {
                        addToCart(oil);
                        setIsCartOpen(true);
                      }}
                    >
                      <Icon name="Plus" size={16} />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredOils.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-lg">
                Масла по выбранным параметрам не найдены. Попробуйте изменить фильтры.
              </p>
            </div>
          )}
        </div>
      </section>

      <section id="application" className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Применение</h3>
            <p className="text-muted-foreground text-lg">
              Правильное нанесение — залог долговечности покрытия
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="Brush" size={32} className="text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Подготовка</h4>
              <p className="text-muted-foreground">
                Очистите и отшлифуйте поверхность. Удалите пыль влажной тканью.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="Droplets" size={32} className="text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Нанесение</h4>
              <p className="text-muted-foreground">
                Нанесите масло тонким слоем вдоль волокон. Дайте впитаться 15 минут.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="Sparkles" size={32} className="text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Финиш</h4>
              <p className="text-muted-foreground">
                Удалите излишки мягкой тканью. Повторите через 24 часа.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Галерея работ</h3>
            <p className="text-muted-foreground text-lg">
              Примеры покрытия различных пород дерева нашими маслами
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'https://cdn.poehali.dev/projects/349aa3fa-562b-4580-8add-942cd603a8eb/files/05c900d1-6df7-4a54-9d45-c5522d405e47.jpg',
              'https://cdn.poehali.dev/projects/349aa3fa-562b-4580-8add-942cd603a8eb/files/1b61e36a-2d03-4332-908f-0d5d8e7732ab.jpg',
              'https://cdn.poehali.dev/projects/349aa3fa-562b-4580-8add-942cd603a8eb/files/ec5fd711-2f01-415e-9e65-229078697ca4.jpg',
              'https://cdn.poehali.dev/projects/349aa3fa-562b-4580-8add-942cd603a8eb/files/05c900d1-6df7-4a54-9d45-c5522d405e47.jpg',
              'https://cdn.poehali.dev/projects/349aa3fa-562b-4580-8add-942cd603a8eb/files/1b61e36a-2d03-4332-908f-0d5d8e7732ab.jpg',
              'https://cdn.poehali.dev/projects/349aa3fa-562b-4580-8add-942cd603a8eb/files/ec5fd711-2f01-415e-9e65-229078697ca4.jpg',
            ].map((img, index) => (
              <div key={index} className="aspect-square bg-muted rounded-lg overflow-hidden group cursor-pointer">
                <img 
                  src={img} 
                  alt={`Пример обработки дерева маслом ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold mb-4">Свяжитесь с нами</h3>
              <p className="text-muted-foreground text-lg">
                Поможем подобрать масло и ответим на все вопросы
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="grid gap-6">
                  <Card className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="Phone" size={24} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium mb-1">Телефон</p>
                        <p className="text-sm text-muted-foreground">+7 (495) 123-45-67</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="Mail" size={24} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium mb-1">Email</p>
                        <p className="text-sm text-muted-foreground">info@woodoil.ru</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="MapPin" size={24} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium mb-1">Адрес</p>
                        <p className="text-sm text-muted-foreground">Москва, ул. Лесная, 15</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              <Card className="p-6">
                <h4 className="text-xl font-semibold mb-6">Форма обратной связи</h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      placeholder="Ваше имя"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      required
                      placeholder="Ваш вопрос или комментарий"
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full gap-2">
                    <Icon name="Send" size={18} />
                    Отправить
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-8 bg-card/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 WoodOil. Натуральные масла для дерева.</p>
        </div>
      </footer>
    </div>
  );
}