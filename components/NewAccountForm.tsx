import { useState } from 'react';
import CardDouble from '@components/CardDouble';
import RadioButtonGroup from '@components/RadioButtonGroup';
import Input from '@components/Input';
import Checkbox from '@components/Checkbox';
import Button from '@components/Button';
import styles from '@components/NewAccountForm.module.css';

interface NewAccountFormProps {
  onRegisterSuccess?: (user: any, token: string) => void;
}

export default function NewAccountForm({ onRegisterSuccess }: NewAccountFormProps) {
  const [usage, setUsage] = useState('modal_individual');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeLawful, setAgreeLawful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    if (!agreeTerms || !agreeLawful) {
      setError('Please agree to the terms and acceptable use.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password, usage }),
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
      setConfirm('');
      setAgreeTerms(false);
      setAgreeLawful(false);

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
    <CardDouble title="NEW ACCOUNT">
      <form className={styles.root} onSubmit={handleSubmit}>
        <p className={styles.description}>Create a new MakeBelieve account, where anything is possible at your command line in the browser.</p>

        {error && <div className={`${styles.inlineMessage} ${styles.error}`}>{error}</div>}
        {success && <div className={`${styles.inlineMessage} ${styles.success}`}>{success}</div>}

        <div className={styles.section}>
          <RadioButtonGroup
            defaultValue={usage}
            options={[
              { value: 'modal_individual', label: "I'm using this for personal use." },
              { value: 'modal_developer', label: "I'm building or creating something for work." },
              { value: 'modal_company', label: "We're using this as a team or organization." },
            ]}
            onChange={(value) => setUsage(value)}
          />
        </div>

        <div className={styles.section}>
          <Input autoComplete="off" label="EMAIL" placeholder="you@example.com" type="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} required />
          <Input autoComplete="off" label="USERNAME" placeholder="Choose a username (e.g., SurfGirl29)" value={username} onChange={(e) => setUsername(e.currentTarget.value)} required />
          <Input autoComplete="off" label="PASSWORD" placeholder="Create a password (8+ characters)" type="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} required />
          <Input autoComplete="off" label="CONFIRM" placeholder="Type it again" type="password" value={confirm} onChange={(e) => setConfirm(e.currentTarget.value)} required />
        </div>

        <div className={styles.section}>
          <Checkbox name="terms">
            I agree to the Terms of Service, Data Privacy Policy, and Acceptable Use Guidelines.
          </Checkbox>
          <Checkbox name="goodwill">
            I agree not to use this service for unlawful purposes.
          </Checkbox>
        </div>

        <div className={styles.actions}>
          <Button type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Creating account...' : 'Create an account'}
          </Button>
        </div>
      </form>
    </CardDouble>
  );
}
