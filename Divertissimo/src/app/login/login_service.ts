import { Injectable } from '@angular/core';

export interface User {
  username: string;
  password: string;
  level: number;
}

const USERS_DB: User[] = [
  { username: 'Admin_Ne_Trichant_Pas', password: 'mot_de_passe_tres_secure', level: 99 },
  { username: 'joueur_standard', password: 'mot_de_passe', level: 45 },
  { username: 'Débutant', password: 'starter', level: 1 },
  { username: 'joueur_avancé', password: 'advenced', level: 75 },
];

// Fake encode (base 64 simulation), do not use in a real environment !!!
function mockEncode(payload: any): string {
  return btoa(JSON.stringify(payload));
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // Login will create a fake token if the user exists and stock it in the browser's local storage
  login(username: string, password: string): boolean {
    const user = USERS_DB.find((u) => u.username === username && u.password === password);

    if (user) {
      // creating token
      const payload = {
        sub: user.username,
        level: user.level,
        // iat is a standard assertion for JWT. to convert the date issued by ts to the JWT standard, we must divide it by 1000.
        // (iat means issued at)
        iat: Date.now() / 1000,
      };

      const token = `Header.${mockEncode(payload)}.FakeSignature`;

      localStorage.setItem('auth_token', token);
      return true;
    }
    return false;
  }

  // method used to see if the user is logged in
  isAuthenticated(): boolean {
    // Token is here ? user is connected !
    // !! -> is this thing exists and is this thing considered true or false ?
    return !!localStorage.getItem('auth_token');
  }

  // Get user data from the token :
  getUserDataFromToken(): any | null {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return null;
    }

    try {
      // extract the payload (part that contains infos)
      const payloadEncoded = token.split('.')[1];

      // Decoding and parsing (atob -> decoding base64)
      const payloadDecoded = atob(payloadEncoded);
      return JSON.parse(payloadDecoded);
    } catch (e) {
      console.error('Tokken mal formé');
      return null;
    }
  }

  // Disconnect the user
  logout(): void {
    localStorage.removeItem('auth_token');
  }
}
