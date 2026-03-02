import styles from './RegisterForm.module.css';
import { useState } from 'react';
import Button from './Button';
import Input from './Input';

export interface RegisterFormProps {
  onRegisterSuccess?: (user: any, token: string) => void;
}

export default function RegisterForm({ onRegisterSuccess }: RegisterFormProps) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed');
        return;
      }

      setSuccess('Account created successfully!');
      setEmail('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');

      // Store token
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (onRegisterSuccess) {
        onRegisterSuccess(data.user, data.token);
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
      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}
      {success && (
        <div className={styles.success}>
          <p>{success}</p>
        </div>
      )}

      <div className={styles.formGroup}>
        <Input
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          placeholder="your@email.com"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <Input
          id="username"
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          placeholder="Choose a username"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          placeholder="Choose a password"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          placeholder="Repeat password"
          required
        />
      </div>

      <Button disabled={loading} type="submit">
        {loading ? 'Creating account...' : 'Register'}
      </Button>
    </form>
  );
}
