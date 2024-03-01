'use client';
import React, { useState, useEffect } from 'react';

const data = [
  { id: 1, title: 'Card 1', content: 'This is the content of card 1' },
  { id: 2, title: 'Card 2', content: 'This is the content of card 2' },
  { id: 3, title: 'Card 3', content: 'This is the content of card 3' },
];

const Card = ({ title, content }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

const App = () => {
  const [cards, setCards] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredCards = data.filter((card) =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCards(filteredCards);
  }, [searchTerm]);

  const handleSearch = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="grid">
        {cards.map((card) => (
          <Card key={card.id} title={card.title} content={card.content} />
        ))}
      </div>
    </div>
  );
};

export default App;
