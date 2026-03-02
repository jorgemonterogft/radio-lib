import { useState } from 'react';
import AlertBanner from './AlertBanner';
import Button from './Button';
import Input from './Input';

export interface LoginFormProps {
  onLoginSuccess?: (user: any, token: string) => void;
  hideTitle?: boolean;
}

export default function LoginForm({ onLoginSuccess, hideTitle = false }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      setSuccess('Login successful!');
      setEmail('');
      setPassword('');

      // Store token
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (onLoginSuccess) {
        onLoginSuccess(data.user, data.token);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <AlertBanner>{error}</AlertBanner>}
      {success && <AlertBanner>{success}</AlertBanner>}
      <Input
        type="email"
        label="EMAIL"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Enter your email"
      />
      <Input
        type="password"
        label="PASSWORD"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Enter your password"
      />
      <Button type="submit" isDisabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
}
