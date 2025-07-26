export interface Message {
  id: string;
  text: string;
  username: string;
  timestamp: string;
}
export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';
