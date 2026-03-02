'use client';

import { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import NewAccountForm from '@/components/NewAccountForm';
import Button from '@/components/Button';
import CardDouble from '@/components/CardDouble';
import Row from '@/components/Row';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <>
      <Row>
        <Button
          theme={activeTab === 'login' ? 'PRIMARY' : 'SECONDARY'}
          onClick={() => setActiveTab('login')}
        >
          Login
        </Button>
        <Button
          theme={activeTab === 'register' ? 'PRIMARY' : 'SECONDARY'}
          onClick={() => setActiveTab('register')}
        >
          Register
        </Button>
      </Row>
      {activeTab === 'login' && (
        <CardDouble title="LOGIN">
          <LoginForm
            hideTitle
            onLoginSuccess={() => {
              window.location.href = '/blog';
            }}
          />
        </CardDouble>
      )}
      {activeTab === 'register' && (
        <NewAccountForm
          onRegisterSuccess={() => {
            window.location.href = '/blog';
          }}
        />
      )}
    </>
  );
}
