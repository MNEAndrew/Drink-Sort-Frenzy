// ============================================================
// drinks.js — All drink cards used in the game
// Each drink has a name, category, and an emoji for fun visuals.
// Categories: "Cocktail" | "Mocktail" | "Coffee/Tea" | "Soda/Juice" | "Beer/Wine"
// ============================================================

export const CATEGORIES = [
  { id: 'Cocktail',    label: 'Cocktail',    emoji: '🍸', color: '#ff6b9d' },
  { id: 'Mocktail',   label: 'Mocktail',    emoji: '🧃', color: '#a78bfa' },
  { id: 'Coffee/Tea', label: 'Coffee/Tea',  emoji: '☕', color: '#92400e' },
  { id: 'Soda/Juice', label: 'Soda/Juice',  emoji: '🥤', color: '#34d399' },
  { id: 'Beer/Wine',  label: 'Beer/Wine',   emoji: '🍷', color: '#f97316' },
]

export const DRINKS = [
  // ── Cocktails ──────────────────────────────────────────────
  { name: 'Margarita',        category: 'Cocktail',    emoji: '🍹', hint: 'Tequila, lime & salt' },
  { name: 'Mojito',           category: 'Cocktail',    emoji: '🍹', hint: 'Rum, mint & lime' },
  { name: 'Cosmopolitan',     category: 'Cocktail',    emoji: '🍸', hint: 'Vodka & cranberry' },
  { name: 'Piña Colada',      category: 'Cocktail',    emoji: '🍹', hint: 'Rum, coconut & pineapple' },
  { name: 'Old Fashioned',    category: 'Cocktail',    emoji: '🥃', hint: 'Whiskey & bitters' },
  { name: 'Daiquiri',         category: 'Cocktail',    emoji: '🍸', hint: 'Rum, lime & sugar' },
  { name: 'Negroni',          category: 'Cocktail',    emoji: '🍸', hint: 'Gin, vermouth & Campari' },
  { name: 'Manhattan',        category: 'Cocktail',    emoji: '🥃', hint: 'Whiskey & sweet vermouth' },
  { name: 'Aperol Spritz',    category: 'Cocktail',    emoji: '🥂', hint: 'Aperol & prosecco' },
  { name: 'Long Island Iced Tea', category: 'Cocktail', emoji: '🍹', hint: 'Multiple spirits & cola' },
  { name: 'Tequila Sunrise',  category: 'Cocktail',    emoji: '🌅', hint: 'Tequila & orange juice' },
  { name: 'Whiskey Sour',     category: 'Cocktail',    emoji: '🥃', hint: 'Whiskey & lemon juice' },

  // ── Mocktails ──────────────────────────────────────────────
  { name: 'Virgin Mojito',    category: 'Mocktail',    emoji: '🌿', hint: 'Mint, lime & soda water' },
  { name: 'Shirley Temple',   category: 'Mocktail',    emoji: '🍒', hint: 'Ginger ale & grenadine' },
  { name: 'Arnold Palmer',    category: 'Mocktail',    emoji: '🍋', hint: 'Iced tea & lemonade' },
  { name: 'Nojito',           category: 'Mocktail',    emoji: '🌿', hint: 'Mint & sparkling water' },
  { name: 'Sparkling Lemonade', category: 'Mocktail',  emoji: '🍋', hint: 'Lemon & fizzy water' },
  { name: 'Cucumber Cooler',  category: 'Mocktail',    emoji: '🥒', hint: 'Cucumber, mint & tonic' },
  { name: 'Mango Fizz',       category: 'Mocktail',    emoji: '🥭', hint: 'Mango puree & soda' },
  { name: 'Virgin Pina Colada', category: 'Mocktail',  emoji: '🥥', hint: 'Coconut & pineapple, no rum' },
  { name: 'Berry Lemonade',   category: 'Mocktail',    emoji: '🫐', hint: 'Mixed berries & lemon' },
  { name: 'Watermelon Slush', category: 'Mocktail',    emoji: '🍉', hint: 'Blended watermelon & lime' },

  // ── Coffee / Tea ───────────────────────────────────────────
  { name: 'Espresso',         category: 'Coffee/Tea',  emoji: '☕', hint: 'Strong concentrated coffee' },
  { name: 'Cappuccino',       category: 'Coffee/Tea',  emoji: '☕', hint: 'Espresso & frothed milk' },
  { name: 'Latte',            category: 'Coffee/Tea',  emoji: '🥛', hint: 'Espresso & steamed milk' },
  { name: 'Chai Latte',       category: 'Coffee/Tea',  emoji: '🫖', hint: 'Spiced tea & milk' },
  { name: 'Matcha Latte',     category: 'Coffee/Tea',  emoji: '🍵', hint: 'Green tea powder & milk' },
  { name: 'Cold Brew',        category: 'Coffee/Tea',  emoji: '🧊', hint: 'Slow-steeped cold coffee' },
  { name: 'Bubble Tea',       category: 'Coffee/Tea',  emoji: '🧋', hint: 'Tea with tapioca pearls' },
  { name: 'Earl Grey',        category: 'Coffee/Tea',  emoji: '🫖', hint: 'Bergamot-flavoured black tea' },
  { name: 'Americano',        category: 'Coffee/Tea',  emoji: '☕', hint: 'Espresso diluted with water' },
  { name: 'Green Tea',        category: 'Coffee/Tea',  emoji: '🍵', hint: 'Steamed or brewed green leaves' },
  { name: 'Iced Coffee',      category: 'Coffee/Tea',  emoji: '🧊', hint: 'Chilled coffee over ice' },
  { name: 'Flat White',       category: 'Coffee/Tea',  emoji: '☕', hint: 'Ristretto & velvety milk' },

  // ── Soda / Juice ───────────────────────────────────────────
  { name: 'Orange Juice',     category: 'Soda/Juice',  emoji: '🍊', hint: 'Squeezed citrus fruit' },
  { name: 'Apple Juice',      category: 'Soda/Juice',  emoji: '🍎', hint: 'Pressed apple fruit' },
  { name: 'Cola',             category: 'Soda/Juice',  emoji: '🥤', hint: 'Carbonated cola syrup drink' },
  { name: 'Lemonade',         category: 'Soda/Juice',  emoji: '🍋', hint: 'Classic lemon soft drink' },
  { name: 'Ginger Ale',       category: 'Soda/Juice',  emoji: '🫙', hint: 'Fizzy ginger-flavoured soda' },
  { name: 'Root Beer',        category: 'Soda/Juice',  emoji: '🍺', hint: 'Non-alcoholic herbal soda' },
  { name: 'Grape Juice',      category: 'Soda/Juice',  emoji: '🍇', hint: 'Pressed purple grapes' },
  { name: 'Pineapple Juice',  category: 'Soda/Juice',  emoji: '🍍', hint: 'Tropical pressed pineapple' },
  { name: 'Cranberry Juice',  category: 'Soda/Juice',  emoji: '🫐', hint: 'Tart red berry juice' },
  { name: 'Sparkling Water',  category: 'Soda/Juice',  emoji: '💧', hint: 'Carbonated H₂O' },
  { name: 'Sports Drink',     category: 'Soda/Juice',  emoji: '⚡', hint: 'Electrolyte-packed drink' },
  { name: 'Energy Drink',     category: 'Soda/Juice',  emoji: '⚡', hint: 'Caffeine & sugar boost' },

  // ── Beer / Wine ────────────────────────────────────────────
  { name: 'Pale Ale',         category: 'Beer/Wine',   emoji: '🍺', hint: 'Light hoppy craft beer' },
  { name: 'IPA',              category: 'Beer/Wine',   emoji: '🍺', hint: 'India Pale Ale, very hoppy' },
  { name: 'Stout',            category: 'Beer/Wine',   emoji: '🍺', hint: 'Dark roasted malt beer' },
  { name: 'Lager',            category: 'Beer/Wine',   emoji: '🍺', hint: 'Crisp bottom-fermented beer' },
  { name: 'Chardonnay',       category: 'Beer/Wine',   emoji: '🍷', hint: 'Popular white wine grape' },
  { name: 'Merlot',           category: 'Beer/Wine',   emoji: '🍷', hint: 'Smooth red wine variety' },
  { name: 'Rosé',             category: 'Beer/Wine',   emoji: '🌸', hint: 'Pink blush wine' },
  { name: 'Prosecco',         category: 'Beer/Wine',   emoji: '🥂', hint: 'Italian sparkling wine' },
  { name: 'Cider',            category: 'Beer/Wine',   emoji: '🍏', hint: 'Fermented apple drink' },
  { name: 'Champagne',        category: 'Beer/Wine',   emoji: '🥂', hint: 'French sparkling wine' },
  { name: 'Wheat Beer',       category: 'Beer/Wine',   emoji: '🍺', hint: 'Brewed with malted wheat' },
  { name: 'Pinot Noir',       category: 'Beer/Wine',   emoji: '🍷', hint: 'Elegant light red wine' },
]
