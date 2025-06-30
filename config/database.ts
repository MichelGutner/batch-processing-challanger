// mongo.provider.ts ou database.ts
import mongoose from 'mongoose';

export async function connectMongo() {
  mongoose.set('debug', true); // Ativa logs de queries

  await mongoose.connect('mongodb://localhost:27017/nome-do-banco', {
    user: '',
    pass: '',
    dbName: 'nome-do-banco',
    authSource: 'admin',
  });

  console.log('[MongoDB] conectado');
}
