import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Oil {
  id: number;
  name: string;
  description: string;
  woodTypes: string[];
  purpose: string[];
  color: string;
  price: string;
  image: string;
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
    image: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Защитное масло для сосны',
    description: 'Защита от влаги и ультрафиолета для хвойных пород',
    woodTypes: ['Сосна', 'Ель', 'Лиственница'],
    purpose: ['Фасады', 'Террасы'],
    color: 'Бесцветный',
    price: '980 ₽',
    image: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Масло-воск для ореха',
    description: 'Придаёт шелковистый блеск и водоотталкивающие свойства',
    woodTypes: ['Орех', 'Вишня'],
    purpose: ['Мебель', 'Декор'],
    color: 'Янтарный',
    price: '1 450 ₽',
    image: '/placeholder.svg'
  },
  {
    id: 4,
    name: 'Тонирующее масло "Венге"',
    description: 'Придаёт благородный тёмный оттенок светлым породам',
    woodTypes: ['Берёза', 'Бук', 'Клён'],
    purpose: ['Мебель', 'Полы'],
    color: 'Тёмно-коричневый',
    price: '1 350 ₽',
    image: '/placeholder.svg'
  },
  {
    id: 5,
    name: 'Масло для столешниц',
    description: 'Повышенная стойкость к влаге и механическим воздействиям',
    woodTypes: ['Дуб', 'Ясень', 'Бук'],
    purpose: ['Столешницы', 'Барные стойки'],
    color: 'Матовый',
    price: '1 550 ₽',
    image: '/placeholder.svg'
  },
  {
    id: 6,
    name: 'Льняное масло',
    description: 'Экологичное масло для детской мебели и игрушек',
    woodTypes: ['Все породы'],
    purpose: ['Детская мебель', 'Игрушки'],
    color: 'Натуральный',
    price: '890 ₽',
    image: '/placeholder.svg'
  }
];

const woodTypes = ['Все', 'Дуб', 'Сосна', 'Орех', 'Берёза', 'Ясень', 'Бук'];
const purposes = ['Все', 'Мебель', 'Полы', 'Фасады', 'Террасы', 'Столешницы', 'Декор'];

export default function Index() {
  const [selectedWood, setSelectedWood] = useState('Все');
  const [selectedPurpose, setSelectedPurpose] = useState('Все');

  const filteredOils = oils.filter(oil => {
    const woodMatch = selectedWood === 'Все' || oil.woodTypes.includes(selectedWood) || oil.woodTypes.includes('Все породы');
    const purposeMatch = selectedPurpose === 'Все' || oil.purpose.includes(selectedPurpose);
    return woodMatch && purposeMatch;
  });

  return (
    <div className="min-h-screen">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Droplets" className="text-primary" size={32} />
            <h1 className="text-2xl font-bold">WoodOil</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#catalog" className="hover:text-primary transition-colors">Продукция</a>
            <a href="#application" className="hover:text-primary transition-colors">Применение</a>
            <a href="#gallery" className="hover:text-primary transition-colors">Галерея</a>
            <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
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

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-2xl font-bold text-primary">{oil.price}</span>
                    <Button size="sm" className="gap-2">
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
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-4xl font-bold mb-4">Свяжитесь с нами</h3>
            <p className="text-muted-foreground text-lg mb-8">
              Поможем подобрать масло и ответим на все вопросы
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <Icon name="Phone" size={32} className="mx-auto mb-3 text-primary" />
                <p className="font-medium mb-1">Телефон</p>
                <p className="text-sm text-muted-foreground">+7 (495) 123-45-67</p>
              </Card>

              <Card className="p-6 text-center">
                <Icon name="Mail" size={32} className="mx-auto mb-3 text-primary" />
                <p className="font-medium mb-1">Email</p>
                <p className="text-sm text-muted-foreground">info@woodoil.ru</p>
              </Card>

              <Card className="p-6 text-center">
                <Icon name="MapPin" size={32} className="mx-auto mb-3 text-primary" />
                <p className="font-medium mb-1">Адрес</p>
                <p className="text-sm text-muted-foreground">Москва, ул. Лесная, 15</p>
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