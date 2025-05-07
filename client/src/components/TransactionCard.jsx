import React from 'react';

const TransactionCard = ({ txn }) => {
  const { type, amount, message, timestamp, counterpartyName } = txn;

  return (
    <div>
      <div>
        <div>
          <strong>{type === 'credit' ? 'Received from' : 'Sent to'} {counterpartyName}</strong>
          <p>{message || 'No message'}</p>
        </div>
        <div>
          {type === 'credit' ? '+' : '-'}₹{amount}
        </div>
      </div>
      <p>{new Date(timestamp).toLocaleString()}</p>
      <hr />
    </div>
  );
};

export default TransactionCard;
