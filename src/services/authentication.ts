export class AuthenticationService {
  public static authenticate(username: string, password: string): boolean {
    return username === 'test' && password === '1234';
  }
}
