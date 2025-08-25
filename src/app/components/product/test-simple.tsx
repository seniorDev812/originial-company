"use client"
import React, { useState } from 'react';

const TestSimple = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Simple Test Component</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Counter Test</h3>
        <p>Count: {count}</p>
        <button 
          onClick={() => setCount(count + 1)}
          style={{ 
            padding: '10px 20px', 
            background: 'blue', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Increment
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Input Test</h3>
        <input 
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
          style={{ 
            padding: '10px', 
            border: '1px solid #ccc', 
            borderRadius: '5px',
            width: '200px'
          }}
        />
        <p>You typed: {text}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Filter Test</h3>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          <input 
            type="checkbox" 
            onChange={(e) => console.log('Checkbox changed:', e.target.checked)}
          />
          Test Filter
        </label>
      </div>

      <div>
        <h3>Console Test</h3>
        <button 
          onClick={() => {
            console.log('Button clicked!');
            alert('Button clicked! Check console for log.');
          }}
          style={{ 
            padding: '10px 20px', 
            background: 'green', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Test Console
        </button>
      </div>
    </div>
  );
};

export default TestSimple;
