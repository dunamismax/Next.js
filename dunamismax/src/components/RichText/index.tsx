import React from 'react';

const RichText = ({ content }) => {
  if (!content) {
    return null;
  }

  return (
    <div>
      {content.map((node, i) => {
        if (node.type === 'h1') {
          return (
            <h1 key={i} className='text-4xl font-bold'>
              {node.children[0].text}
            </h1>
          );
        }
        if (node.type === 'h2') {
          return (
            <h2 key={i} className='text-3xl font-bold'>
              {node.children[0].text}
            </h2>
          );
        }
        if (node.type === 'h3') {
          return (
            <h3 key={i} className='text-2xl font-bold'>
              {node.children[0].text}
            </h3>
          );
        }
        if (node.type === 'h4') {
          return (
            <h4 key={i} className='text-xl font-bold'>
              {node.children[0].text}
            </h4>
          );
        }
        if (node.type === 'h5') {
          return (
            <h5 key={i} className='text-lg font-bold'>
              {node.children[0].text}
            </h5>
          );
        }
        if (node.type === 'h6') {
          return (
            <h6 key={i} className='text-base font-bold'>
              {node.children[0].text}
            </h6>
          );
        }
        if (node.type === 'p') {
          return (
            <p key={i} className='my-4'>
              {node.children[0].text}
            </p>
          );
        }
        if (node.type === 'ul') {
          return (
            <ul key={i} className='list-disc list-inside'>
              {node.children.map((listItem, j) => (
                <li key={j}>{listItem.children[0].text}</li>
              ))}
            </ul>
          );
        }
        if (node.type === 'ol') {
          return (
            <ol key={i} className='list-decimal list-inside'>
              {node.children.map((listItem, j) => (
                <li key={j}>{listItem.children[0].text}</li>
              ))}
            </ol>
          );
        }
        return <p key={i}>{node.children[0].text}</p>;
      })}
    </div>
  );
};

export default RichText;
