'use client';

import { useEffect, useState } from 'react';

type Flashcard = {
  id: number;
  question: string;
  answer: string;
};

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/flashcards')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch flashcards');
        return res.json();
      })
      .then(data => {
        setFlashcards(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);


  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const handleNext = () => {
    setShowAnswer(false);
    setIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setShowAnswer(false);
    setIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    const newCard: Flashcard = {
      id: flashcards.length + 1,
      question: newQuestion,
      answer: newAnswer,
    };
    setFlashcards([...flashcards, newCard]);
    setNewQuestion('');
    setNewAnswer('');
  };

  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🧠 Flashcard Viewer</h1>

      <div
        style={{
          border: '2px solid #333',
          padding: '2rem',
          margin: '2rem auto',
          width: '300px',
          borderRadius: '10px',
          background: '#f9f8f9',
          cursor: 'pointer',
        }}
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {flashcards.length > 0 ? (
          <p>{showAnswer ? flashcards[index].answer : flashcards[index].question}</p>
        ) : (
          <p>No flashcards yet!</p>
        )}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <button onClick={handlePrev}>⏮️ Previous</button>
        <button onClick={handleNext} style={{ marginLeft: '1rem' }}>⏭️ Next</button>
      </div>

      <h2>Add New Flashcard</h2>
      <form onSubmit={handleAddCard} style={{ marginTop: '1rem' }}>
        <div>
          <input
            type="text"
            placeholder="Question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            required
            style={{ marginBottom: '1rem', padding: '0.5rem', width: '60%' }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Answer"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            required
            style={{ marginBottom: '1rem', padding: '0.5rem', width: '60%' }}
          />
        </div>
        <button type="submit">➕ Add Flashcard</button>
      </form>
    </main>
  );
}
