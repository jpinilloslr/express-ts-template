import { WebsocketRequestHandler } from 'express-ws';
import { WebSocketSubscription } from '../services/websocket-subscription';

export const todoWs: WebsocketRequestHandler = (ws) => {
  const subscription = new WebSocketSubscription(ws);

  ws.on('message', (data: any) => subscription.onMessage(data));
  ws.on('close', () => subscription.close());
};
