const authRoutes = require('./auth');
const transactionRoutes = require('./transaction.js');
const userRoutes = require('./user.js');
const passwordRoutes = require('./resetpassword.js');
const recenteTransaction = require('./recentTransaction.js')

module.exports = (app) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/transaction', transactionRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/reset-password', passwordRoutes);
  app.use('/api/transactions', recenteTransaction);

  
};
