import { AuthenticationService } from './authentication';
import { Store } from './store';

export class WebSocketSubscription {
  private _timer: NodeJS.Timeout;
  private _unsubscribe: (() => void) | null = null;

  public constructor(private _ws: any) {
    this._timer = setTimeout(() => {
      this._ws.send(
        JSON.stringify({ message: 'Timed out waiting for command' }),
      );
      this._ws.close();
    }, 5000);
  }

  public onMessage(data: any) {
    try {
      const command = JSON.parse(data.toString('utf8'));

      if (!command.username || !command.password || !command.subscribe) {
        this._ws.send(JSON.stringify({ message: 'Invalid command' }));
        this._ws.close();
      }

      const session = AuthenticationService.authenticate(
        command.username,
        command.password,
      );

      if (!session) {
        this._ws.send(JSON.stringify({ message: 'Access denied' }));
        this._ws.close();
      }

      clearTimeout(this._timer);
      this._unsubscribe = Store.todo.subscribe((items) => {
        this._ws.send(JSON.stringify(items));
      });
    } catch (e) {
      this._ws.send(JSON.stringify({ message: 'Invalid command' }));
      this._ws.close();
    }
  }

  public close() {
    this._unsubscribe?.();
  }
}
